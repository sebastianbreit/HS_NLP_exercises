from flask import Flask
from flask import render_template, request, make_response, jsonify
from flask_cors import CORS
from nlp.utils import get_named_entities, tokenize_with_pos

app = Flask(__name__)
CORS(app)

@app.route('/HL-POS',methods = ['POST'])
def pos():
    text = request.form['text']
    if text == '':
        return render_template('illegal.html'), 451
    else:
        tokenized=tokenize_with_pos(text)
        return jsonify(tokenized), 200


@app.route('/HL-NE',methods = ['POST'])
def ner():
    text = ""

    if request.method == 'POST':
        text=request.form['text']

    if text == "":
        return render_template('illegal.html'), 451
    else:
        return jsonify(get_named_entities(text)), 200


if __name__ == '__main__':
    app.run(use_reloader=True)
