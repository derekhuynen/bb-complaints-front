
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from . import db
from sqlalchemy import Column, Numeric, Integer, String, create_engine


class House(db.Model):
    __tablename__ = 'complaints'

    id = Column(Integer, primary_key=True, autoincrement=True)

    street = Column(String(50))
    city = Column(String(20))
    state = Column(String(2))
    zipcode = Column(String(10))

    longitude = Column(Numeric(7, 4))
    latitude = Column(Numeric(6, 4))

    license = Column(String(20))

    expiration = Column(String(30))

    def __init__(self, street, city, state, zipcode, license, expiration, longitude, latitude):
        self.street = street
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.license = license
        self.expiration = expiration
        self.longitude = longitude
        self.latitude = latitude

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
    
    def __repr__(self):
        return 'House address=%s %s, lng=%s, lat=%s'%(self.street, self.city, self.longitude, self.latitude)


    

