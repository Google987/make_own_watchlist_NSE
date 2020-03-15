from flask import Flask, render_template, request, jsonify
from app import get_quote, get_quotes, save_in_redis, delete_in_redis

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

@app.route("/delete")
def delete():
    return delete_in_redis(request.args.get('code'))

if __name__ == "__main__":
    app.run(debug=True, port=50000)