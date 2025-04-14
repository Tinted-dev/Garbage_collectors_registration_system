from ..database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # admin or public

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role
        }
