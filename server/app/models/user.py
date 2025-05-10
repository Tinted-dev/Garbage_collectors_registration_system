from models import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # Can be 'admin' or 'company_owner'

    # One-to-many relationship with Company
    companies = db.relationship('Company', backref='user', lazy=True)

    def __init__(self, email, password, role):
        self.email = email
        self.password_hash = self.set_password(password)
        self.role = role

    def set_password(self, password):
        """Hashes the user's password for storage."""
        return generate_password_hash(password)

    def check_password(self, password):
        """Checks if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'companies': [company.to_dict() for company in self.companies]
        }
