from backend.app import app
import json

# Set up test client
def client_test():
    app.testing = True
    return app.test_client()

def test_genres_filter():
    """Test that the movies are able to be filtered by genre"""

    # Let's do a mock test
    client = client_test()
    test_json = {"genres": ["comedy", "science fiction", "western"], "ratings": [], "year": ""}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # Check the movie "Wild Wild West" appears; it should be the only movie that meets criteria
    # of comedy, science fiction, and western genres
    assert data[0]["title"] == "Wild Wild West"
    assert len(data) == 1

def test_genres_filter_no_match():
    """Test that no movies return if genre criteria doesn't match"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": ["western", "science fiction", "war"], "ratings": [], "year": ""}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be no movies that is a western, science fiction, and war at the same time.
    assert len(data) == 0
    
def test_single_rating_filter():
    """Test if movies can be filtered by a single rating"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": [], "ratings": ["1"], "year": ""}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be only 3 movies with a rating of 1/10.
    assert data[0]["title"] == "Superbabies: Baby Geniuses 2"
    assert data[1]["title"] == "All Hat"
    assert data[2]["title"] == "Gory Gory Hallelujah"
    assert len(data) == 3

def test_multiple_rating_filter():
    """Test if movies can be filtered by multiple ratings"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": [], "ratings": ["1", "2"], "year": ""}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be 24 movies with a rating of 1/10 or 2/10.
    assert len(data) == 24

def test_year_filter():
    """Test if movies can be filtered by release year"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": [], "ratings": [], "year": "1954"}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be 4 movies released in 1954.
    assert data[0]["title"] == "20,000 Leagues Under the Sea"
    assert data[1]["title"] == "The Egyptian"
    assert data[2]["title"] == "On the Waterfront"
    assert data[3]["title"] == "Seven Samurai"
    assert len(data) == 4

def test_year_filter_no_match():
    """Test if no movies return if none match release year"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": [], "ratings": [], "year": "1800"}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be no movies released in 1800.
    assert len(data) == 0

def test_genre_and_rating_filter():
    """Test if movies can be filtered by both genre and rating"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": ["comedy", "family"], "ratings": ["8"], "year": ""}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be only 3 family comedy movies that have a rating of 8/10
    assert data[0]["title"] == "Inside Out"
    assert data[1]["title"] == "Back to the Future"
    assert data[2]["title"] == "Karachi se Lahore"
    assert len(data) == 3

def test_genre_rating_and_year_filter():
    """Test if movies can be filtered by genre, rating, and year"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": ["comedy", "family"], "ratings": ["8"], "year": "2015"}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be only 2 family comedy movies that have a rating of 8/10 and are released in 2015
    assert data[0]["title"] == "Inside Out"
    assert data[1]["title"] == "Karachi se Lahore"
    assert len(data) == 2

def test_genre_rating_and_year_filter_2():
    """Test another time if movies can be filtered by genre, rating, and year"""

    # Let's do a mock test again
    client = client_test()
    test_json = {"genres": ["comedy", "history", "drama"], "ratings": ["7"], "year": "2013"}
    response = client.post("/data_filtered",  json = test_json)
    
    # Ensure the data is received okay
    assert response.status_code == 200
    data = json.loads(response.data)
    
    # There should be only 1 historic comedy drama movie that have a rating of 7/10 and is released in 2013
    assert data[0]["title"] == "Saving Mr. Banks"
    assert len(data) == 1