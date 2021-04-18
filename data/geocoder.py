#!/usr/bin/env python
import csv
import requests
import json
import pprint as pp


gkey="AIzaSyBwyTFb6dI_pn0KDKRfilLTuhg0fVEeiqo"

data = []
with open("addresses.csv") as f:
    csv_reader = csv.reader(f, delimiter=',')
    line_count = 0
    for row in csv_reader:
        data.append(row)
url = "https://maps.googleapis.com/maps/api/geocode/json"

fields = data[0]
fields = fields[:-1]

data = data[1:]
fname = "addr_lat_lng.csv"
form_addr = []
count = 0
for addr in data:
    try:
        address = addr[0]
        license = addr[1]
        expDate = addr[2]
        
#        geolocator = Nominatim(user_agent="me")
#        location = geolocator.geocode(address)
        
#        print(address, location.latitude, location.longitude)
        params = {
                'key': gkey,
                'address': address
                }
        response = requests.get(url, params=params)
    
        json_data = json.loads(response.text)
    
        x = json_data
    
        results = x['results']
        
        thing = results[0]
        formatted_addr = thing['formatted_address']
        geom = thing['geometry']
        lat = geom['location']['lat']
        lng = geom['location']['lng']
    
        
        add = formatted_addr.split(',')
        number = add[0]
        city = add[1][1:]
        statezip = add[2].split()
        state = statezip[0]
        zipcode = statezip[1]
        
        
        stuff = [number, city, state, zipcode, lat, lng, license, expDate]
        print(stuff)
        form_addr.append(stuff)
    except:
        continue

with open(fname, 'w') as csvfile:
    csvwriter = csv.writer(csvfile)

    csvwriter.writerow(fields)
    csvwriter.writerows(form_addr)
