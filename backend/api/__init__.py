from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()



def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    
    db.init_app(app)
    migrate.init_app(app, db)

    from api.routes import houses
    app.register_blueprint(houses, url_prefix='/api/')
    CORS(app)

    with app.app_context():
        from . import routes
        db.create_all()

        return app
    
