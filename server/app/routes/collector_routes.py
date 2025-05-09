from flask import Blueprint, request, jsonify, current_app
from ..database import db
from app.models.collector import GarbageCollector
# ... other imports ...

bp = Blueprint('collectors', __name__, url_prefix='/collectors')

# ... other routes ...

@bp.route('/<int:id>', methods=['PUT'])
def update_collector(id):
    """
    Updates an existing collector's data.  Handles updating the is_approved status.
    """
    data = request.json
    collector = GarbageCollector.query.get_or_404(id)

    collector.full_name = data.get('full_name', collector.full_name)
    collector.email = data.get('email', collector.email)
    collector.phone = data.get('phone', collector.phone)
    collector.national_id = data.get('national_id', collector.national_id)
    old_approval_status = collector.is_approved
    collector.is_approved = data.get('is_approved', collector.is_approved)  # This is CRUCIAL

    if 'region_ids' in data:
        collector.regions = Region.query.filter(Region.id.in_(data['region_ids'])).all()

    print(f"Received data for update: {data}")
    print(f"Before update - collector.is_approved: {old_approval_status}")
    print(f"Setting collector.is_approved to: {collector.is_approved}")

    db.session.commit()  # Move this inside the conditional block if needed.

    print(f"After commit - collector.is_approved: {collector.is_approved}") #check value after commit

    # ... notification code ...
    return jsonify(collector.serialize()), 200
