from app import db

class Verification(db.Model):
    __tablename__ = 'verifications'

    id = db.Column(db.Integer, primary_key=True)
    collector_id = db.Column(db.Integer, db.ForeignKey('collectors.id'), nullable=False)
    verifier_name = db.Column(db.String(120), nullable=False)
    date_verified = db.Column(db.DateTime, server_default=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "collector_id": self.collector_id,
            "verifier_name": self.verifier_name,
            "date_verified": self.date_verified.isoformat()
        }
