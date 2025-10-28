import csv
from db import connect
from models import Movies

def INT(value):
    try:
        if value.strip():
            return int(value)
        else:
            return None
    except:
        return None
    
def FLOAT(value):
    try:
        if value.strip():
            return float(value)
        else:
            return None
    except:
        return None

def import_movies(csv_file="tmdb_5000_movies.csv"):
    count = 0
    with connect() as db:
        with open(csv_file, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                genres = row["genres"]
                keywords = row["keywords"]
                production_companies = row["production_companies"]
                production_countries = row["production_countries"]
                spoken_languages = row["spoken_languages"]

                movie = Movies(
                    id=INT(row["id"]),
                    budget=FLOAT(row["budget"]),
                    genres=genres,
                    homepage=row["homepage"] or None,
                    keywords=keywords,
                    original_language=row["original_language"],
                    original_title=row["original_title"],
                    overview=row["overview"] or None,
                    popularity=FLOAT(row["popularity"]),
                    production_companies=production_companies,
                    production_countries=production_countries,
                    release_date=row["release_date"] or None,
                    revenue=FLOAT(row["revenue"]),
                    runtime=FLOAT(row["runtime"]),
                    spoken_languages=spoken_languages,
                    status=row["status"] or None,
                    tagline=row["tagline"] or None,
                    title=row["title"],
                    vote_average=FLOAT(row["vote_average"]),
                    vote_count=INT(row["vote_count"])
                )

                db.add(movie)
                count += 1

        print(f"Imported {count} movies")

if __name__ == "__main__":
    import_movies()