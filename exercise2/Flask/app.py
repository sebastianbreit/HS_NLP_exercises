from flask import Flask
from flask import render_template, request, make_response, jsonify
from nlp.utils import get_named_entities, tokenize_with_pos

app = Flask(__name__)


@app.route()
def about():
    """This function should serve the about.html file on POST and GET requests
    Fill out the route decorator and function body
    """
    pass


@app.route()
def pos():
    """This function should accept only POST requests
    If the request body contains a "text" key it should process the associated value using
    your tokenize_with_pos() function and return the output in json format
    (Use request.form to get the POST requests body, you can use Flask's jsonify() function to return json)
    Since it makes no sense to tokenize empty text, also add a custom response with status code 451
    if the "text" value is a blank or empty string and serve the illegal.html file
    Fill out the route decorator and function body
    """
    pass


@app.route()
def ner():
    """This function should accept POST and GET requests
    It should work like the pos() function but use your get_named_entities() function
    to process text instead (Use request.method to handle POST vs GET requests)
    Fill out the route decorator and function body
    """
    pass


if __name__ == '__main__':
    app.run(use_reloader=True)
