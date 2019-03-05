from flask import Flask, render_template, request, jsonify, redirect, url_for
from GolfSetup import GolfSetup
import traceback
import uuid
from pymongo import MongoClient





app=Flask(__name__)

db_uri = 'mongodb://admin:golfpro1@ds153974.mlab.com:53974/heroku_lx5rwnvr'
mongo = MongoClient(db_uri)
jsonblob = mongo.db.jsonblob

@app.route("/db_test",methods=['GET'])
def db_test():
    try:
        jsonblob.insert({'uuid': uuid.uuid4().hex})
        return jsonify("ok")
    except Exception, err:
        traceback.print_exc()

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