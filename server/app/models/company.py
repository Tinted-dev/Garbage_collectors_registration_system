from models import db
from sqlalchemy.orm import relationship

# Many-to-many association table: Company <-> Region
company_region = db.Table(
    'company_region',
    db.Column('company_id', db.Integer, db.ForeignKey('company.id'), primary_key=True),
    db.Column('region_id', db.Integer, db.ForeignKey('region.id'), primary_key=True)
)

class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_approved = db.Column(db.Boolean, default=False)

    # Foreign key to User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    regions = db.relationship('Region', secondary=company_region, backref='companies', lazy='dynamic')
    service_requests = db.relationship('ServiceRequest', backref='company', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'description': self.description,
            'is_approved': self.is_approved,
            'user_id': self.user_id,
            'regions': [region.to_dict() for region in self.regions],
            'service_requests': [sr.to_dict() for sr in self.service_requests]
        }
