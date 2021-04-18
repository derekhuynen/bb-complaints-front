#!/usr/bin/env python3
from . import db

def push(db):
    import pandas as pd
    data = pd.read_csv("../../data/addr_lat_lng.csv")

    print(data.head())