from flask import Blueprint, request, jsonify
from app import db
from app.models.collector import GarbageCollector
from app.models.region import Region

bp = Blueprint('collectors', __name__, url_prefix='/collectors')

# GET all collectors
@bp.route('/', methods=['GET'])
def get_collectors():
    collectors = GarbageCollector.query.all()
    return jsonify([c.serialize() for c in collectors]), 200

# GET collector by ID
@bp.route('/<int:id>', methods=['GET'])
def get_collector(id):
    collector = GarbageCollector.query.get_or_404(id)
    return jsonify(collector.serialize()), 200

# POST create new collector
@bp.route('/', methods=['POST'])
def create_collector():
    data = request.json
    try:
        regions = Region.query.filter(Region.id.in_(data.get("region_ids", []))).all()

        collector = GarbageCollector(
            full_name=data['full_name'],
            email=data['email'],
            phone=data['phone'],
            national_id=data['national_id'],
            regions=regions
        )
        db.session.add(collector)
        db.session.commit()
        return jsonify(collector.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# PUT update collector
@bp.route('/<int:id>', methods=['PUT'])
def update_collector(id):
    data = request.json
    collector = GarbageCollector.query.get_or_404(id)

    collector.full_name = data.get('full_name', collector.full_name)
    collector.email = data.get('email', collector.email)
    collector.phone = data.get('phone', collector.phone)
    collector.national_id = data.get('national_id', collector.national_id)

    if 'region_ids' in data:
        collector.regions = Region.query.filter(Region.id.in_(data['region_ids'])).all()

    db.session.commit()
    return jsonify(collector.serialize()), 200

# DELETE collector
@bp.route('/<int:id>', methods=['DELETE'])
def delete_collector(id):
    collector = GarbageCollector.query.get_or_404(id)
    db.session.delete(collector)
    db.session.commit()
    return jsonify({"message": "Collector deleted."}), 200
