from flask import Flask, render_template, request, jsonify, redirect, url_for
from GolfSetup import GolfSetup
from GolfSetup import Players
from pymongo import MongoClient
import os
import functools
import traceback
from uuid import UUID

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

@app.route("/list", methods=['GET'])
def result():
    try:
        res = []
        for entry in jsonblob.find({},projection={'_id': False}):
            res.append({'players': [entry], 'hc': entry['hc']})
            players.append(entry)
        return jsonify({'pairings': res})

    except Exception, err:
        traceback.print_exc()

@app.route("/player", methods=['GET'])
def player():
    try:
        player_id = request.args.get('uuid')
        if _validate_uuid4(player_id):
            db_player = jsonblob.find_one({'uuid':player_id}, projection={'_id': False})
            return jsonify(db_player)

    except Exception, err:
        traceback.print_exc()


def _validate_uuid4(uuid_string):

    """
    Validate that a UUID string is in
    fact a valid uuid4.
    Happily, the uuid module does the actual
    checking for us.
    It is vital that the 'version' kwarg be passed
    to the UUID() call, otherwise any 32-character
    hex string is considered valid.
    """

    try:
        val = UUID(uuid_string, version=4)
    except ValueError:
        # If it's a value error, then the string
        # is not a valid hex code for a UUID.
        return False

    # If the uuid_string is a valid hex code,
    # but an invalid uuid4,
    # the UUID.__init__ will convert it to a
    # valid uuid4. This is bad for validation purposes.

    return val.hex == uuid_string


if __name__ == "__main__":
    app.run(debug=(os.environ['RUN_MODE'] != 'prod' ))