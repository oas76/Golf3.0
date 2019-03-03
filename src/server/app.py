from flask import Flask, render_template, request, jsonify, redirect, url_for
from GolfSetup import GolfSetup

import traceback

app=Flask(__name__)
app.config.update(dict(
    SECRET_KEY="H0le1n0ne",
    WTF_CSRF_SECRET_KEY="H0le1n0ne"
))

@app.route("/",methods=['GET'])
def main():
    return render_template('index.html')

@app.route("/randomize", methods=['GET'])
def randomize():
    try:
        teamsize = request.args.get('teamsize')
        print teamsize
        if  teamsize.isdigit() and 0 < teamsize:
            res = GolfSetup.createPairing(size=int(teamsize))
            return jsonify(res)

        return jsonify(None)

    except Exception, err:
        traceback.print_exc()

if __name__ == "__main__":
    app.run(debug=True)