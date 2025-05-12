from app.database import db
from sqlalchemy.orm import relationship

# Many-to-many association table: Company <-> Region
company_region = db.Table(
    'company_region',
    db.Column('company_id', db.Integer, db.ForeignKey('company.id'), primary_key=True),
    db.Column('region_id', db.Integer, db.ForeignKey('region.id'), primary_key=True)
)

# Many-to-many association table: Company <-> User (for collectors)
company_collectors = db.Table(
    'company_collectors',
    db.Column('company_id', db.Integer, db.ForeignKey('company.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_approved = db.Column(db.Boolean, default=False)

    # Foreign key to User (the user who created/manages the company)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    regions = relationship('Region', secondary=company_region, backref='companies', lazy='dynamic')
    service_requests = relationship('ServiceRequest', backref='company', lazy=True)
    collectors = relationship('User', secondary=company_collectors, backref='companies_managed', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'description': self.description,
            'is_approved': self.is_approved,
            'user_id': self.user_id,
            'regions': [region.to_dict() for region in self.regions.all()] if self.regions else [],
            'service_requests': [service_request.to_dict() for service_request in self.service_requests] if self.service_requests else [],
            'collectors': [collector.to_dict() for collector in self.collectors.all()] if self.collectors.all() else [],
        }
