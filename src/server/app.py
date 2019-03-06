from flask import Flask, render_template, request, jsonify, redirect, url_for
from GolfSetup import GolfSetup
from GolfSetup import Players
from pymongo import MongoClient
import os
import functools
import traceback
import uuid

app=Flask(__name__)

db_uri = 'mongodb://admin:golfpro1@ds153974.mlab.com:53974/heroku_lx5rwnvr'
mongo = MongoClient(db_uri)
db = mongo.get_database()
print db.collection_names()
jsonblob = db.jsonblob
players = []

@app.route("/",methods=['GET'])
def main():
    return render_template('index.html')

@app.route("/randomize", methods=['GET'])
def randomize():
    try:
        teamsize = request.args.get('teamsize')
        if  teamsize.isdigit() and 0 < teamsize:
            res = GolfSetup.createPairing(size=int(teamsize), player_list=players)
            return jsonify(res)

        return jsonify(None)

    except Exception, err:
        traceback.print_exc()

@app.route("/result", methods=['GET'])
def result():
    try:
        res = []
        for entry in jsonblob.find({},projection={'_id': False}):
            res.append({'players': [entry] })
            players.append(entry)
        return jsonify({'pairings': res})

    except Exception, err:
        traceback.print_exc()


if __name__ == "__main__":
    app.run(debug=(os.environ['RUN_MODE'] == 'dev' ))