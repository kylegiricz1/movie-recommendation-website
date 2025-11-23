import pytest
from backend.app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

def test_wizard_basic_response_structure(client):
    response = client.post('/api/wizard',
                           json={'answers': {'genres': ['Action']}})
    assert response.status_code == 200
    data = response.get_json()
    assert "movie" in data
    assert "count" in data
    assert "noMatches" in data
    assert "message" in data

def test_wizard_genre_filter(client):
    response = client.post('/api/wizard',
                           json={'answers': {
                               'genres': ['Action'],
                               'rating': '0'
                           }})
    assert response.status_code == 200

def test_wizard_runtime_filter(client):
    response = client.post('/api/wizard',
                           json={'answers': {
                               'runtime': 'under90',
                               'rating': '0'
                           }})
    assert response.status_code == 200

def test_wizard_no_matches(client):
    response = client.post('/api/wizard',
                           json={'answers': {
                               'genres': ['FakeGenreZZZ'],
                               'rating': '11'
                           }})
    assert response.status_code == 200
    data = response.get_json()
    assert data["noMatches"] is True
