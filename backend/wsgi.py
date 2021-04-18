'''
entry point
'''
from api import create_app, db
from api.models import House
from api.push_data import push

app = create_app()
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'House': House, 'push' : push}

if __name__== '__main__':
    app.run(host='0.0.0.0', port=5000)
