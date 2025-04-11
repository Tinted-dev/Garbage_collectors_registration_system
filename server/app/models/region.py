from app import db

collector_region = db.Table('collector_region',
    db.Column('collector_id', db.Integer, db.ForeignKey('collectors.id')),
    db.Column('region_id', db.Integer, db.ForeignKey('regions.id'))
)

class Region(db.Model):
    __tablename__ = 'regions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    collectors = db.relationship('GarbageCollector', secondary=collector_region, back_populates='regions')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
