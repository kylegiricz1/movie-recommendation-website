from flask import Flask, jsonify
from flask_cors import CORS
import csv
from flask import request
import math
import os
from google import genai
import json

# Install Flask using pip install Flask (MAC "pip install Flask") 
# # Run this file using python backend.py (MAC "python3 backend.py") 
# # Access the server at http://localhost:5000/ <-example
# Fix path for CSV in both pytest and production
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "tmdb_5000_movies.csv")
app = Flask(__name__)
CORS(app)

# Cache for movie data
MOVIE_CACHE = None

# Gemini API Key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=GOOGLE_API_KEY) if GOOGLE_API_KEY else None
#client = genai.Client(api_key="YAIzaSyALQEfqLQ3bdKeRlSzBlDmmtZpJxCYKxME")

def load_movie_data():
    global MOVIE_CACHE
    if MOVIE_CACHE is None:
        try:
            data = []
            with open(CSV_PATH, encoding="utf-8") as file:
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
        with open(CSV_PATH, encoding="utf-8") as file:
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

@app.route('/data_filtered', methods=['POST'])
def get_data_filtered():
    data = []

    # Get the filters
    filters = request.get_json()
    print("Received filters: " + str(filters))

    filtered_genres = filters["genres"]
    filtered_ratings = filters["ratings"]
    filtered_year = filters["year"]

    try:
        #Read CSV using UTF-8 so Windows doesn't break
        with open(CSV_PATH, encoding="utf-8") as file:
            reader = csv.DictReader(file)

            # Go through each row
            for row in reader:
                # Parse CSV data
                movie_genres = row.get("genres")
                movie_date = row.get("release_date")
                movie_rating = row.get("vote_average")

                movie_genres_parsed = []
                met_criteria = True

                # Parse and go through each of the movie's genres
                if (movie_genres != None):
                    movie_genres_parsed_json = json.loads(movie_genres)

                    for entity in movie_genres_parsed_json:
                        movie_genres_parsed.append(entity.get("name").lower())

                    # If any filtered genre is missing, go to the next iteration
                    for filtered_genre in filtered_genres:
                        if (filtered_genre not in movie_genres_parsed):
                            met_criteria = False
                            break

                # If previous criteria is okay, parse and go through each of the movie's ratings
                if (met_criteria and movie_rating != None):

                    # If all of the filtered ratings are missing, go to the next iteration
                    for filtered_rating in filtered_ratings:
                        if (movie_rating.startswith(filtered_rating + ".")):
                            met_criteria = True
                            break
                        elif (not movie_rating.startswith(filtered_rating + ".")):
                            met_criteria = False

                # If previous criteria is okay, check if year matched or not
                if (met_criteria and movie_date != None):
                    # If the year does not match, then update met criteria boolean flag
                    if (filtered_year not in movie_date):
                        met_criteria = False

                # This will only be called if all of the previous requirements have been met
                if (met_criteria):
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
        with open(CSV_PATH, encoding="utf-8") as file:
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
            
    #Gemini Addition
    try:
        # Fallback reason based on the answers provided
        expl_parts = []
        if isinstance(answers.get('genres'), list) and answers['genres']:
            expl_parts.append(
                "your interest in " + ", ".join(sorted(set(g.title() for g in answers['genres'])))
            )
        if isinstance(answers.get('decades'), list) and answers['decades']:
            expl_parts.append("your preference for " + ", ".join(answers['decades']).upper())
        if answers.get('runtime'):
            expl_parts.append(f"chosen length: {answers['runtime']}")
        if answers.get('rating'):
            expl_parts.append(f"minimum rating ≥ {answers['rating']}")
        if answers.get('primaryGenre'):
            expl_parts.append(f"priority on {answers['primaryGenre']}")
        if answers.get('recentness'):
            expl_parts.append(f"{answers['recentness'].lower()} recentness")
        if answers.get('popularity'):
            expl_parts.append(f"leaning toward {answers['popularity'].lower()}")

        fallback_summary = (
            "Recommended because it aligns with " + ", ".join(expl_parts) + "."
            if expl_parts else
            "Recommended based on your answers."
        )

        # Build TMDB URL from CSV id (Kaggle tmdb_5000_movies.csv has 'id')
        tmdb_id = ""
        if best_match:
            bm_id = best_match.get('id') or best_match.get('movie_id') or ""
            tmdb_id = str(bm_id).strip()
        tmdb_url = f"https://www.themoviedb.org/movie/{tmdb_id}" if tmdb_id else ""

        # Compute a deterministic "match score" (1–10) based on how well it fits preferences
        # This is NOT quality; it’s alignment with the provided answers.
        def clamp(v, lo=1, hi=10):
            return max(lo, min(hi, int(round(v))))

        score = 5.0  # start neutral
        try:
            # Genre priority match
            primary_genre = (answers.get('primaryGenre') or "").strip().lower()
            if primary_genre and best_match and primary_genre in (best_match.get('genres') or "").lower():
                score += 2.0

            # Runtime match (string exact — we’re not changing your runtime logic)
            if answers.get('runtime'):
                score += 1.0  # user indicated a preference and we filtered already

            # Decade preference present => small boost (we already filtered if set)
            if isinstance(answers.get('decades'), list) and answers['decades']:
                score += 0.5

            # Recentness weighting
            recentness = (answers.get('recentness') or "").strip()
            if recentness == "Very Important":
                score += 1.0
            elif recentness == "Somewhat Important":
                score += 0.5

            # Popularity alignment (we already considered it in scoring; small bonus here)
            pop_pref = (answers.get('popularity') or "").strip()
            if pop_pref:
                score += 0.5

            # Rating threshold satisfied
            if answers.get('rating'):
                score += 0.5
        except Exception:
            pass

        match_score = clamp(score, 1, 10)

        # Ask Gemini ONLY for the 1–2 sentence explanation.
        explanation = fallback_summary
        if best_match and client:
            prompt = (
                "In 1–2 sentences, explain to a user why this movie fits their preferences. "
                "Be specific but brief. Avoid raw IDs/JSON.\n\n"
                f"User preference summary: {fallback_summary}\n\n"
                "Movie metadata:\n"
                f"Title: {best_match.get('title')}\n"
                f"Year: {best_match.get('release_date','')[:4]}\n"
                f"Genres: {best_match.get('genres')}\n"
                f"Rating: {best_match.get('vote_average')}\n"
                f"Runtime: {best_match.get('runtime')} minutes\n"
                f"Overview: {best_match.get('overview')}\n"
            )
            try:
                resp = client.models.generate_content(
                    model="gemini-1.5-flash",
                    contents=prompt
                )
                # Different SDKs expose text differently; try common attributes:
                text = getattr(resp, "output_text", None) or getattr(resp, "text", None)
                if not text and getattr(resp, "candidates", None):
                    # very defensive parsing
                    cand = resp.candidates[0]
                    parts = getattr(getattr(cand, "content", None), "parts", None)
                    if parts and len(parts) and hasattr(parts[0], "text"):
                        text = parts[0].text
                if text:
                    explanation = text.strip()
            except Exception:
                pass

        # FINAL summary = explanation + guaranteed score + guaranteed TMDB link
        tail_bits = []
        tail_bits.append(f"\nMatch Score: {match_score}/10\n")
        if tmdb_url:
            tail_bits.append(f"\nTMDB: {tmdb_url}")
        tail_line = " • ".join(tail_bits)

        summary = f"{explanation}\n{tail_line}"

    except Exception:
        summary = "Recommended based on your answers."

    return jsonify({
        "movie": best_match,
        "count": len(matches),
        "noMatches": False,
        "message": f"Found {len(matches)} movies matching your criteria!",
        "summary": summary           
    })
#END API ADDITION

if __name__ == '__main__':
    app.run(debug=True, port=5200)
