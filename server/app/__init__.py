from flask_migrate import Migrate
from app import db

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)
    db.init_app(app)

    from app.models import user, collector, region, verification  # 👈 Make sure models are imported
    Migrate(app, db)

    from app.routes import collector_routes, user_routes, region_routes, verification_routes
    app.register_blueprint(collector_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(region_routes.bp)
    app.register_blueprint(verification_routes.bp)

    return app
