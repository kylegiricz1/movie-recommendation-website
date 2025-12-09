# movie-recommendation-website
This website uses genre and rating preferences to recommend a movie.

# To run our program locally:
You need to run both the back-end and the front-end at the same time (so 2 different terminals).

For the front-end (React):
- Open a terminal and go to the front-end folder.
- Run `npm install`, `npm install cross-env`, `npm install @mui/material @emotion/react @emotion/styled`, `npm install ogl`,
`npm install @mui/x-date-pickers`, and `npm install dayjs` (to install all required libraries).
- Then run `npm start` (to start the front-end)

For the back-end (Flask):
- Open another terminal and go to the back-end folder.
- Run `pip install flask`, `pip install flask_cors`, and `pip install -q -U google-genai` to install all required libraries.
- Then run `python app.py` to start the back-end.

Then go to `http://localhost:5000` to view the webpage.

# To run our program in Docker:
1. Open a terminal and go to the project's root folder.
2. Run `docker compose build` (to build the container -- this may take 4-5 minutes).
3. Then run `docker compose up` (to start the containers).
4. Run `docker compose down` if you want to stop the containers.
5. Then go to `http://localhost:5000` to view the webpage.

Thanks,
John
