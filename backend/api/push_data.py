from . import db
from .models import House

def push(db):
    import pandas as pd
    data = pd.read_csv("../data/addr_lat_lng.csv")

    houses = data.to_dict('records')
    records = []
    for h in houses:
        print(h)
        x = House(h['street'], h['city'], h['state'], h['zipcode'], h['license'], h['expiration'], h['longitude'], h['latitude'])
        records.append(x)

    try:
        # numRowsDeleted = db.session.query(House).delete()
        # print(numRowsDeleted)
        db.session.bulk_save_objects(records)
    except:
        db.session.rollback()
        raise
    else:
        print(House.query.all())
        db.session.commit()

# push(db)

# if __name__ == '__main__':
#     push(db)