from ..database import db

class CollectorHistory(db.Model):
    __tablename__ = 'collector_history'

    id = db.Column(db.Integer, primary_key=True)
    collector_id = db.Column(db.Integer, db.ForeignKey('collectors.id'), nullable=False)
    action = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "collector_id": self.collector_id,
            "action": self.action,
            "timestamp": self.timestamp.isoformat()
        }
