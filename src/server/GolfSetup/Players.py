#!/usr/local/bin/python2

import uuid
from pymongo import MongoClient
import traceback

#MONGO_URL = 'http://localhost:27017'
#client = MongoClient(MONGO_URL)
#db = client.data


def getPlayers():
    try:
        return list(collection.find())
    except Exception, err:
        traceback.print_exc()


def getPlayerByIndex(uuid):
    try:
        return collection.find_one({'uuid':uuid})
    except Exception,err:
        traceback.print_exc()

def deletePlayer(uuid):
    try:
        collection.delete_one({'uuid':uuid})
    except Exception,err:
        traceback.print_exc()

def addPlayer(name,hc, avatarUrl='https://placehold.it/75'):
    print 'WTF?'
    try:
        collection.insert_one({'uuid':uuid.uuid4().hex, 'Name': name, 'hc': hc, 'avatar': avatarUrl})
    except Exception,err:
        traceback.print_exc()

def updatePlayer(uuid,name,hc,avatar='https://placehold.it/75'):
    print 'WTF? WTF?'
    try:
        collection.update_one({'uuid':uuid},{
            "$set": {
                "Name": name,
                "hc": hc,
                "avatar": avatar,
            }})
    except Exception,err:
        traceback.print_exc()
