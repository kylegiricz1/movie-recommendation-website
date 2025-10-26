from flask import Flask, jsonify
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_name():
    return "<html><body><h1>Hello world!</h1></body></html>"

@app.route('/data')
def get_data():
    data = []

    try:
        # ✅ Read CSV using UTF-8 so Windows doesn't break
        with open("tmdb_5000_movies.csv", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                data.append(row)

    except Exception as e:
        print(f"Something went wrong! \nError: {str(e)}")
        return {"error": str(e)}

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5200)
