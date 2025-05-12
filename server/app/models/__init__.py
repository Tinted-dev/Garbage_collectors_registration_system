from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import all models here so they are registered when db.create_all() is called
from .user import User
from .company import Company
from .region import Region
from .service_request import ServiceRequest


# Optional: if you define any association tables (e.g., company_region), import them too
# from .associations import company_region  # only if you've split it out into its own file
