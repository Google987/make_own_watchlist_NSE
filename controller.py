from flask import Flask, render_template, request, jsonify
from app import get_quote, get_quotes
from app import save_in_redis

app = Flask(__name__)

@app.route("/watchlist")
def getMyWatchList():
    data = get_quotes()
    return render_template('homepage.html', data=data)


@app.route("/add")
def add():
    code = request.args.get('code')
    print(code)
    if(save_in_redis(code)):
        return jsonify(get_quotes())
    return 'error'

@app.route("/refresh")
def refresh():
    return jsonify(get_quotes())

if __name__ == "__main__":
    app.run(debug=True)