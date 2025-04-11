from app import db
from .region import collector_region

class GarbageCollector(db.Model):
    __tablename__ = 'collectors'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    national_id = db.Column(db.String(20), unique=True, nullable=False)

    regions = db.relationship('Region', secondary=collector_region, back_populates='collectors')
    verifications = db.relationship('Verification', backref='collector', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "national_id": self.national_id,
            "regions": [r.serialize() for r in self.regions]
        }
