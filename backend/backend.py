from flask import Flask, jsonify
from flask_cors import CORS
import csv
from flask import request
import math

# Install Flask using pip install Flask (MAC "pip install Flask") 
# # Run this file using python backend.py (MAC "python3 backend.py") 
# # Access the server at http://localhost:5000/ <-example
app = Flask(__name__)
CORS(app)

# Cache for movie data
MOVIE_CACHE = None

def load_movie_data():
    global MOVIE_CACHE
    if MOVIE_CACHE is None:
        try:
            data = []
            with open("tmdb_5000_movies.csv", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                for row in reader:
                    # Pre-process the data
                    row['genres_list'] = [genre.lower() for genre in row.get('genres', '').split('|') if genre]
                    data.append(row)
            MOVIE_CACHE = data
            print("Movie data loaded into cache")
        except Exception as e:
            print(f"Error loading movie cache: {str(e)}")
            MOVIE_CACHE = []
    return MOVIE_CACHE

@app.route('/')
def hello_name():
    return "<html><body><h1>Hello world!</h1></body></html>"

@app.route('/data')
def get_data():
    data = []

    try:
        #Read CSV using UTF-8 so Windows doesn't break
        with open("tmdb_5000_movies.csv", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            # Add each row to list
            for row in reader:
                data.append(row)

    except Exception as e:
        # Send error message back to user
        print(f"Something went wrong! \nError: {str(e)}")
        return {"error": str(e)}

   # Return as JSON dictionary
    return jsonify(data)


#API ADDITION: Wizard endpoint
@app.route('/api/wizard', methods=['POST'])
def wizard():
    body = request.get_json() or {}
    answers = body.get('answers', {})

    #Handle multiple genres as a list
    genres_req = answers.get('genres', [])
    if not isinstance(genres_req, list):
        genres_req = [genres_req] if genres_req else []
    genres_req = [g.strip().lower() for g in genres_req if g]

    #Handle multiple decades as a list
    decades_req = answers.get('decades', [])
    if not isinstance(decades_req, list):
        decades_req = [decades_req] if decades_req else []
    decades_req = [d.strip().lower() for d in decades_req if d]

    runtime_req = (answers.get('runtime') or '').strip().lower()
    rating_req = answers.get('rating')

    #Parse runtime range
    runtime_range = None
    if runtime_req:
        if runtime_req == 'under90':
            runtime_range = (0, 90)
        elif runtime_req == '90to120':
            runtime_range = (90, 120)
        elif runtime_req == 'over120':
            runtime_range = (120, float('inf'))

    matches = []

    try:
        with open("tmdb_5000_movies.csv", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                #Basic filters: genres, decades, rating
                ok = True

                # Genre: check if any of the requested genres match
                if genres_req:
                    movie_genres = row.get('genres', '').lower()
                    if not any(genre in movie_genres for genre in genres_req):
                        ok = False

                #Decade: e.g. ['1990s', '2000s'] -> years 1990-1999 OR 2000-2009
                if ok and decades_req:
                    try:
                        year = row.get('release_date', '')
                        decade_match = False
                        if year and len(year) >= 4:
                            y = int(year[:4])
                            for decade in decades_req:
                                if decade.endswith('s') and len(decade) == 5 and decade[:4].isdigit():
                                    start = int(decade[:4])
                                    if start <= y <= start + 9:
                                        decade_match = True
                                        break
                                else:
                                    #fallback: check substring
                                    if decade in year:
                                        decade_match = True
                                        break
                        if not decade_match:
                            ok = False
                    except Exception:
                        ok = False

                # Rating: minimum vote_average
                if ok and rating_req:
                    try:
                        min_rating = float(rating_req)
                        vote = float(row.get('vote_average') or 0)
                        if vote < min_rating:
                            ok = False
                    except Exception:
                        pass

                # Runtime filtering
                if ok and runtime_range:
                    try:
                        runtime = float(row.get('runtime') or 0)
                        min_runtime, max_runtime = runtime_range
                        if not (min_runtime <= runtime <= max_runtime):
                            ok = False
                    except Exception:
                        ok = False

                if ok:
                    matches.append(row)

    except Exception as e:
        print(f"Wizard endpoint error: {e}")
        return jsonify({"error": str(e)}), 500

    #If no matches found, return response with noMatches flag
    if not matches:
        return jsonify({
            "movie": None,
            "count": 0,
            "noMatches": True,
            "message": "No movies found matching your criteria. Try adjusting your preferences."
        })

    #Calculate personalized score for each movie
    matches_sorted = []
    
    #Get additional preference factors
    primary_genre = answers.get('primaryGenre', '').strip().lower()
    recentness_pref = answers.get('recentness', '').strip()
    popularity_pref = answers.get('popularity', '').strip()
    
    for movie in matches:
        try:
            #Base score components
            vote_avg = float(movie.get('vote_average') or 0)
            popularity = float(movie.get('popularity') or 0)
            year = int(movie.get('release_date', '')[:4]) if movie.get('release_date') else 0
            current_year = 2025  # You can update this or use dynamic year
            
            #Normalize popularity (0-10)
            norm_popularity = min(10, popularity / 100)
            
            #Base score (max 10 points)
            base_score = vote_avg * 0.7 + norm_popularity * 0.3
            
            #Genre match bonus (max 5 points)
            genre_bonus = 5 if primary_genre in movie.get('genres', '').lower() else 0
            
            #Recentness bonus (max 3 points)
            years_old = current_year - year
            recentness_bonus = 0
            if recentness_pref == 'Very Important':
                recentness_bonus = max(0, 3 - (years_old / 10))
            elif recentness_pref == 'Somewhat Important':
                recentness_bonus = max(0, 2 - (years_old / 15))
            
            #Popularity alignment bonus (max 2 points)
            popularity_bonus = 0
            if popularity_pref == 'Well-known Blockbusters' and norm_popularity > 7:
                popularity_bonus = 2
            elif popularity_pref == 'Moderately Popular' and 3 <= norm_popularity <= 7:
                popularity_bonus = 2
            elif popularity_pref == 'Hidden Gems' and norm_popularity < 3:
                popularity_bonus = 2
            
            #Calculate final score (max 20 points)
            movie['_score'] = base_score + genre_bonus + recentness_bonus + popularity_bonus
            
        except Exception:
            movie['_score'] = 0

    matches_sorted = sorted(matches, key=lambda r: r.get('_score', 0), reverse=True)
    best_match = matches_sorted[0] if matches_sorted else None
    
    #Remove temporary score field if best match exists
    if best_match and '_score' in best_match:
        del best_match['_score']
            
    return jsonify({
        "movie": best_match,
        "count": len(matches),
        "noMatches": False,
        "message": f"Found {len(matches)} movies matching your criteria!"
    })

#END API ADDITION


if __name__ == '__main__':
    app.run(debug=True, port=5200)
