from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .database import db  # Import db from database.py
from flask_mail import Mail  # Import Flask-Mail

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)
    db.init_app(app)

    # Initialize Flask-Mail
    mail = Mail(app)  # Initialize Flask-Mail here with the app instance
    app.mail = mail #register the mail instance

    # Ensure all models are imported so SQLAlchemy registers them
    with app.app_context():
        from app.models.collector import GarbageCollector
        from app.models.collector_history import CollectorHistory
        from app.models.region import Region
        from app.models.user import User
        from app.models.verification import Verification

        # Run migrations *after* all models are registered
        Migrate(app, db)

    # Import and register all routes after model setup
    from app.routes import collector_routes, user_routes, region_routes, verification_routes
    app.register_blueprint(collector_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(region_routes.bp)
    app.register_blueprint(verification_routes.bp)

    return app
