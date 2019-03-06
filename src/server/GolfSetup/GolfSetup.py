#!/usr/local/bin/python2

import random as ran
import numpy as np
import functools as func
import itertools as itertools
import Players as P

test_data = [{'name': 'Oddis', 'hc': 10}, {'name':'Bjorn', 'hc': 10}, {'name': 'SMU', 'hc': 10}, {'name': 'Poggen', 'hc': 10},{'name': 'Jorgen', 'hc': 10},{'name': 'Anders', 'hc': 10}]


def _cleanTeamCobinations(list):
    res = []
    for tc in list:
        if _isUniqueTupple(tc):
            res.append(tc)
    return res

def _isUniqueTupple(tupple):
    a = tupple[0][0]
    b = tupple[0][1]
    return a not in tupple[1] and b not in tupple[1]

def _randomTeamCombination(iterable,nrPlayers,size):
    final = []

    while len(final) < nrPlayers - nrPlayers%size:
        try:
            pool = tuple(iterable)
            n = len(pool)
            indices = sorted(ran.sample(xrange(n), nrPlayers/size))
            final = func.reduce(lambda x, y: set(x) | set(y), tuple(pool[i] for i in indices))
        except ValueError:
            print 'e'
            pass

    return tuple(pool[i] for i in indices)

def _getHandicapForPlayers(players,player_list):
    hc = []
    for p in players:
        hc += map(lambda x : x['hc'], filter(lambda x: x['name'] == p, player_list))
    return _calcTeamHc(hc)

def _calcTeamHc(hclist):
    newlist = sorted(hclist)
    if len(newlist) == 1:
        return hclist[0]
    elif len(newlist) == 2:
        return round(func.reduce(lambda x,y : x+ y[0]*y[1], zip(newlist,[0.35,0.15]),0 ),1)
    elif len(newlist) == 3:
        return round(func.reduce(lambda x, y: x + y[0] * y[1], zip(newlist, [0.25, 0.15, 0.10]), 0), 1)
    elif len(newlist) > 3:
        return round(func.reduce(lambda x, y: x + y[0] * y[1], zip(newlist, [0.15, 0.10, 0.07, 0.05]), 0), 1)
    else:
        None

################################################################################


def createPairing(size=2,player_list=[]):

    # Define player details, Name and handicap
    if size < 1 or size > len(player_list):
        return {'pairings': None}

    # Get player names only
    player_names = [ entry['name'] for entry in player_list ]

    # Randomiz order of playrs
    random_player_list = np.random.permutation(player_names)

    # Find possible teams, and represent it in a number
    teams_list = itertools.combinations(random_player_list,size)
    t_list = list(teams_list)

    # Find non overlapping set of teams
    possible_pairings = _randomTeamCombination(t_list,len(player_list),size)

    result = []
    for pairing in possible_pairings:
        entry = {}
        entry['players'] = []
        for player in pairing:
            entry['players'].append(next((item for item in player_list if item['name'] == player), None))
        entry['hc'] =  _getHandicapForPlayers(pairing,player_list)
        result.append(entry)

    return {'pairings': result}


if __name__ == "__main__":
    print createPairing(size=2,player_list=test_data)
