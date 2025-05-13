from app.database import db
from werkzeug.security import generate_password_hash, check_password_hash

from werkzeug.security import generate_password_hash, check_password_hash
from app.database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # ✅ Must exist
    role = db.Column(db.String(20), nullable=False)

    def __init__(self, email, password, role):
        self.email = email
        self.password = generate_password_hash(password)  # ✅ hash it here
        self.role = role

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        """Return user details as a dictionary."""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'companies': [company.to_dict() for company in self.companies] if self.companies else [],
        }
