from app.database import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(120), nullable=True)  # You can make name nullable if not always required

    companies = db.relationship('Company', backref='user', lazy=True)

    def __init__(self, email, password, role, name=None):
        self.email = email
        self.role = role
        self.name = name
        self.set_password(password)  # Use set_password to set the password hash

    def set_password(self, password):
        """Hash the password before storing it in the database."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check the hashed password."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Return user details as a dictionary."""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'companies': [company.to_dict() for company in self.companies] if self.companies else [],
        }
