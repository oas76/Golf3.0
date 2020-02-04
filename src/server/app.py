from flask import Flask, render_template, request, jsonify, redirect, url_for
from GolfSetup import GolfSetup
from GolfSetup import Players
from pymongo import MongoClient
import os
import functools
import traceback
from uuid import UUID
import time

app=Flask(__name__)

db_uri = 'mongodb://admin:golfpro1@ds153974.mlab.com:53974/heroku_lx5rwnvr'
mongo = MongoClient(db_uri)
db = mongo.get_database()
jsonblob = db.jsonblob
settings = db.settings

@app.route("/",methods=['GET'])
def main():
    return render_template('index.html')

@app.route("/settings",methods=['GET'])
def get_settings():
    for res in settings.find({'id': 1}, projection={'_id': False}):
        print res
        return jsonify(res)

@app.route("/settings/slopevalue",methods=['GET'])
def get_slope():
    for entry in settings.find({'id': 1}, projection={'_id': False}):
        print entry
        return jsonify(entry)

@app.route("/settings/slopevalue",methods=['POST'])
def set_slope():
    new_slope = float(request.args.get('slope'))
    print new_slope
    if new_slope > 55 and new_slope < 155:
        res = settings.update_one(
            {'id': 1},
            {
                "$set": {
                    "slope_value": new_slope
                }
            }
        )
        return jsonify("200 OK")
    else:
        return jsonify("400 NOK")

@app.route("/settings/touryear",methods=['GET'])
def get_year():
    for entry in settings.find({'id': 1}, projection={'_id': False}):
        print entry
        return jsonify(entry)

@app.route("/settings/touryear",methods=['POST'])
def set_year():
    new_year = float(request.args.get('year'))
    print new_year
    if new_year > 2100 and new_year < 2019:
        res = settings.update_one(
            {'id': 1},
            {
                "$set": {
                    "tour_year": new_year
                }
            }
        )
        return jsonify("200 OK")
    else:
        return jsonify("400 NOK")    

@app.route("/randomize", methods=['GET'])
def randomize():
    try:
        teamsize = request.args.get('teamsize')
        if  teamsize.isdigit() and 0 < teamsize:
            res = GolfSetup.createPairing(size=int(teamsize), player_list=_get_players_from_db())
            return jsonify(res)

        return jsonify(None)

    except Exception, err:
        traceback.print_exc()

@app.route("/list", methods=['GET'])
def result():
    try:
        time.sleep(1)
        res = map(lambda x: {'players': [x], 'hc': x['hc']}, _get_players_from_db())
        return jsonify({'pairings': res})

    except Exception, err:
        traceback.print_exc()

@app.route("/points", methods=['POST'])
def set_points():
    try:
        game_type = request.args.get('gametype')
        data = request.get_json()
        player_id = ""
        result = ""
        db_val = {}
        if data and game_type:
            for entry in data:
                db_val = {}
                db_val['game'] = game_type
                db_val['points'] = float(entry['points'])
                player_id = entry['uuid']
                if _validate_uuid4(player_id):
                    res = jsonblob.update_one(
                        {'uuid': player_id},
                        {
                         "$push": {
                                "points": db_val
                                }
                        }
                    )

            return jsonify(["200 OK"])
        else:
            return jsonify(["404 NOK"])

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

@app.route("/player", methods=['POST'])
def playerUpdate():
    try:
        res = ""
        player_id = request.args.get('uuid')
        player_name = request.args.get('name')
        player_hc = float(request.args.get('hc'))
        if _validate_uuid4(player_id) and player_name and player_hc:
            res = jsonblob.update_one(
                {'uuid':player_id},
                {
                    "$set": {
                        "name": player_name,
                        "hc": player_hc }
                }
            )
            return jsonify("200 OK")
        else:
            return jsonify("403 Invalid Input")
    except Exception, err:
        traceback.print_exc()

@app.route("/deletepoints", methods=['GET'])
def deletePoints():
    try:
        res = jsonblob.update_many(
                    {},
                    {
                        "$set": {
                            "points": []}
                    }
               )
        return jsonify("200 OK")
    except Exception, err:
        traceback.print_exc()

def _get_players_from_db():
    players = [];
    for entry in jsonblob.find({}, projection={'_id': False}):
        players.append(entry)
    return sorted(players,key=_getTotal,reverse=True)

def _getTotal(player):
    return functools.reduce(lambda x,y: y['points'] + x, player['points'], 0)

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
