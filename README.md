# movie-recommendation-website
This website uses genre and rating preferences to recommend a movie.

# To run our program:
You need to run both the back-end and the front-end at the same time (so 2 different terminals).

For the front-end (React):
- Open a terminal and go to the front-end folder.
- Run `npm install` and `npm install cross-env` (to install all required libraries)
- Then run `npm start` (to start the front-end)

For the back-end (Flask):
- Open another terminal and go to the back-end folder.
- Run `pip install flask`, `pip install flask_cors`, and `pip install -q -U google-genai` to install all required libraries.
- Then run `python backend.py` to start the back-end.

Then go to `http://localhost:5000` to view the webpage.

Thanks,
John
