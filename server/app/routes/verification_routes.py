from flask import Blueprint, request, jsonify
from ..database import db
from app.models.verification import Verification
from app.models.collector import GarbageCollector

bp = Blueprint('verifications', __name__, url_prefix='/verifications')

# POST verify a collector
@bp.route('/', methods=['POST'])
def verify_collector():
    data = request.json
    try:
        verification = Verification(
            collector_id=data['collector_id'],
            verifier_name=data['verifier_name']
        )
        db.session.add(verification)
        db.session.commit()
        return jsonify(verification.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# GET all verifications
@bp.route('/', methods=['GET'])
def get_verifications():
    verifications = Verification.query.all()
    return jsonify([v.serialize() for v in verifications]), 200
