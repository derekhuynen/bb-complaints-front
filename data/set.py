#!/usr/bin/env python

import pandas as pd
import csv

data = pd.read_csv("addr_lat_lng.csv")
    

print(data[' latitude'].iloc[0])
