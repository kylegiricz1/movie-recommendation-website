from backend import app
import json

# Setup test client
def test_client():
    app.testing = True
    return app.test_client()

def test_wizard_basic_response_structure():
    """Test that wizard endpoint returns the expected JSON structure"""
    client = test_client()
    response = client.post('/api/wizard', 
                         json={'answers': {'genres': ['Action']}})
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Check all required fields are present
    assert 'movie' in data
    assert 'count' in data
    assert 'noMatches' in data
    assert 'message' in data

def test_wizard_genre_filter():
    """Test that genre filtering works"""
    client = test_client()
    response = client.post('/api/wizard',
                         json={'answers': {
                             'genres': ['Action'],
                             'rating': '0'  # Set low rating to ensure matches
                         }})
    
    data = json.loads(response.data)
    
    # If we found a movie, verify it's an action movie
    if not data['noMatches'] and data['movie']:
        assert 'action' in data['movie']['genres'].lower()

def test_wizard_runtime_filter():
    """Test that runtime filtering works"""
    client = test_client()
    response = client.post('/api/wizard',
                         json={'answers': {
                             'runtime': 'under90',
                             'rating': '0'  # Set low rating to ensure matches
                         }})
    
    data = json.loads(response.data)
    
    # If we found a movie, verify its runtime is under 90
    if not data['noMatches'] and data['movie']:
        runtime = float(data['movie']['runtime'])
        assert runtime <= 90

def test_wizard_no_matches():
    """Test the no-matches response"""
    client = test_client()
    # Use impossible criteria to ensure no matches
    response = client.post('/api/wizard',
                         json={'answers': {
                             'genres': ['NonexistentGenre'],
                             'rating': '11'
                         }})
    
    data = json.loads(response.data)
    assert data['noMatches'] == True
    assert data['movie'] == None
    assert data['count'] == 0