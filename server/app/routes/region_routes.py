from flask import Blueprint, jsonify
from app.models.region import Region

bp = Blueprint('regions', __name__, url_prefix='/regions')

@bp.route('/', methods=['GET'])
def get_regions():
    regions = Region.query.all()
    return jsonify([r.serialize() for r in regions]), 200
