from flask import request, render_template, make_response, Blueprint, make_response, jsonify, Response
from datetime import datetime as dt
from flask import current_app as app
from .models import db, House
import json
from decimal import Decimal
import random

all_houses = Blueprint('/all', __name__,)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

@all_houses.route('/all', methods=['GET'])
def query_all():
    '''
    Query all houses
    @return GeoJSON formatted data
    '''
    houses = House.query.all()
    results = {
                'type': 'FeatureCollection',
                'crs': {
                    'type': 'name',
                    'properties': {
                        'name': 'EPSG:4326'
                    }
                },
                'features': [
                    {
                        'geometry': {
                            'type': 'Point',
                            'coordinates' : [
                                house.longitude,
                                house.latitude
                            ]
                        },
                        'type': 'Feature',
                        'properties': {
                            'id': house.id,
                            'street': house.street,
                            'city': house.city,
                            'zipcode': house.zipcode,
                            'expiration': house.expiration
                        }
                } for house in houses ]
    }

    return Response(json.dumps(results, default=default), mimetype='application/json')