from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail

from app.database import db  # Local database.py
from app.routes import auth_routes, company_routes, admin_routes  # Local routes

mail = Mail()  # Define globally so it can be imported elsewhere if needed

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    mail.init_app(app)
    app.mail = mail  # Attach mail instance to app

    # Register models inside app context
    with app.app_context():
        from app.models.company import Company
        from app.models.region import Region
        from app.models.user import User

        Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
    app.register_blueprint(company_routes.company_bp, url_prefix='/companies')
    app.register_blueprint(admin_routes.admin_bp, url_prefix='/admin')

    return app
