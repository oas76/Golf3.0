#!/usr/local/bin/python2

import uuid
import traceback

def getPlayersTest():
    return [
        {"name": "Oddis", "hc": 10.4, "avatar": "https://avatars0.githubusercontent.com/u/2941042?s=400&u=dab56bd704c3b8c7eec0f26b085746b739aedebe&v=4"},
        {"name": "Bjorn", "hc": 14.0, "avatar": "https://scontent.fosl4-1.fna.fbcdn.net/v/t1.0-9/22310194_10213880588546377_3352603420073342897_n.jpg?_nc_cat=105&_nc_ht=scontent.fosl4-1.fna&oh=821ae1e339b1daa8b7991554240bf4f8&oe=5D1D87E5"},
        {"name": "SMU",   "hc": 14.7, "avatar": "https://avatars1.githubusercontent.com/u/502358?s=460&v=4"},
        {"name": "Poggen", "hc": 11.3, "avatar": "https://pbs.twimg.com/profile_images/1354488042/pam_usa1_400x400.jpg"},
        {"name": "Jorgen", "hc": 23.0, "avatar": "https://scontent.fosl4-1.fna.fbcdn.net/v/t1.0-1/c0.33.200.200a/1797586_10152362399350561_1413026494_n.jpg?_nc_cat=104&_nc_ht=scontent.fosl4-1.fna&oh=b5a350608cbaaa1eed4d9e5fcefb2ac8&oe=5D16C379"},
        {"name": "Anders", "hc": 19.8, "avatar": "https://s3-eu-west-1.amazonaws.com/apps.o5.no/apdm/lifeloop/op/birthday/20130901102314-1506-zr18/700.jpg"}
    ]

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
