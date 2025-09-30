from flask import Flask

# Install Flask using pip install Flask (MAC "pip install Flask")
# Run this file using python backend.py (MAC "python3 backend.py")
# Access the server at http://localhost:5000/ <-example

app = Flask(__name__)

@app.route('/')
def hello_name():
   return "<html><body><h1>Hello world!</h1></body></html>"
   

if __name__ == '__main__':
   app.run()
