from flask import Flask, jsonify
from flask_cors import CORS
import csv

# Install Flask using pip install Flask (MAC "pip install Flask")
# Run this file using python backend.py (MAC "python3 backend.py")
# Access the server at http://localhost:5000/ <-example

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_name():
   return "<html><body><h1>Hello world!</h1></body></html>"

@app.route('/data')
def get_data():
   data = []

   try:
      # Open CSV file and parse it
      with open("tmdb_5000_movies.csv") as file:
         reader = csv.DictReader(file)

         # Add each row to list
         for row in reader:
            data.append(row)

   except Exception as e:
      print(f"Something went wrong! \n Error: {str(e)}")

   # Return as JSON dictionary
   return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5200)
