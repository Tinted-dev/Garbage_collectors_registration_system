from models import db
from datetime import datetime

class ServiceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign key to company
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'phone': self.phone,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'company_id': self.company_id
        }
