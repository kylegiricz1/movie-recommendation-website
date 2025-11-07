# test_min.py
import io
import json
import builtins
import sys
import pathlib
import backend  
from backend import app as flask_app  

# Make the project root importable
sys.path.append(str(pathlib.Path(__file__).resolve().parents[0]))   
sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))   


CSV = """id,title,genres,release_date,vote_average,runtime,popularity,overview
603,The Matrix,Action|Sci-Fi,1999-03-31,8.7,136,120.0,"A hacker learns about the true nature of reality."
"""

class OpenMock:
    def __init__(self, target, data):
        self.target, self.data, self.real = target, data, builtins.open
    def __call__(self, path, *a, **k):
        if isinstance(path, str) and path.endswith(self.target):
            return io.StringIO(self.data)
        return self.real(path, *a, **k)

def test_wizard_min():
    # Put Flask in testing mode
    flask_app.config.update(TESTING=True)

    # Mock CSV + disable Gemini (use fallback summary)
    builtins.open = OpenMock("tmdb_5000_movies.csv", CSV)  
    backend.client = None

    # Call the API
    client = flask_app.test_client()
    resp = client.post("/api/wizard", data=json.dumps({
        "answers": {"genres":["Sci-Fi"], "primaryGenre":"Sci-Fi", "runtime":"Long (> 120min)", "rating":"7"}
    }), content_type="application/json")

    # Minimal assertions
    assert resp.status_code == 200
    body = resp.get_json()
    assert body and not body["noMatches"] and body["movie"]
    assert "summary" in body and "Match Score:" in body["summary"] and "themoviedb.org/movie/" in body["summary"]
