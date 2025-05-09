from flask import Blueprint, request, jsonify, current_app
from ..database import db
from app.models.collector import GarbageCollector
from app.models.region import Region
from app.models.verification import Verification
from flask_mail import Message, Mail  # Import Flask-Mail

bp = Blueprint('collectors', __name__, url_prefix='/collectors')



def send_approval_notification(collector_email, is_approved):
    """
    Sends an email notification to the collector about their approval status using Flask-Mail.

    Args:
        collector_email (str): The email address of the collector.
        is_approved (bool): True if approved, False if denied.
    """
    with current_app.app_context():  #  Get the mail object from the current app
        mail = current_app.extensions['mail']
        msg = Message(
            subject="Collector Approval Status",
            recipients=[collector_email],
            body=f"Your collector application has been {'approved' if is_approved else 'denied'}."
        )
        mail.send(msg)



def send_new_registration_notification(collector_email):
    """
    Sends an email notification to the admin about a new collector registration using Flask-Mail.

    Args:
        collector_email (str): Email of the newly registered collector.
    """
    with current_app.app_context(): #needed for flask mail
        mail = current_app.extensions['mail']
        msg = Message(
            subject="New Collector Registration",
            recipients=["mumbidenis@gmail.com"],  # Change to your admin email(s)
            body=f"A new collector has registered with the email: {collector_email}."
        )
        mail.send(msg)



# GET all collectors
@bp.route('/', methods=['GET'])
def get_collectors():
    """
    Retrieves all collectors from the database.  Includes the is_approved status.
    """
    collectors = GarbageCollector.query.all()
    return jsonify([c.serialize() for c in collectors]), 200

# GET collector by ID
@bp.route('/<int:id>', methods=['GET'])
def get_collector(id):
    """
    Retrieves a single collector by ID. Includes the is_approved status.

    Args:
        id: The ID of the collector to retrieve.

    Returns:
        A JSON response containing the collector's data, or a 404 error if not found.
    """
    collector = GarbageCollector.query.get_or_404(id)
    return jsonify(collector.serialize()), 200

# POST create new collector
@bp.route('/', methods=['POST'])
def create_collector():
    """
    Creates a new collector in the database.  Sets is_approved to False by default.
    Handles potential errors during creation.  Also sends a notification to the admin.
    """
    data = request.json
    try:
        regions = Region.query.filter(Region.id.in_(data.get("region_ids", []))).all()

        collector = GarbageCollector(
            full_name=data['full_name'],
            email=data['email'],
            phone=data['phone'],
            national_id=data['national_id'],
            regions=regions,
            is_approved=False  # Set default value here
        )
        db.session.add(collector)
        db.session.commit()

        # Send notification to admin about new registration
        send_new_registration_notification(collector.email)

        return jsonify(collector.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# PUT update collector
@bp.route('/<int:id>', methods=['PUT'])
def update_collector(id):
    """
    Updates an existing collector's data.  Handles updating the is_approved status.
    Sends a notification to the collector about the approval status change.

    Args:
        id: The ID of the collector to update.

    Returns:
        A JSON response containing the updated collector's data, or a 404 error if not found.
    """
    data = request.json
    collector = GarbageCollector.query.get_or_404(id)

    collector.full_name = data.get('full_name', collector.full_name)
    collector.email = data.get('email', collector.email)
    collector.phone = data.get('phone', collector.phone)
    collector.national_id = data.get('national_id', collector.national_id)
    old_approval_status = collector.is_approved
    collector.is_approved = data.get('is_approved', collector.is_approved)

    if 'region_ids' in data:
        collector.regions = Region.query.filter(Region.id.in_(data['region_ids'])).all()

    db.session.commit()
    # Send notification on change
    if old_approval_status != collector.is_approved:
        send_approval_notification(collector.email, collector.is_approved)

    return jsonify(collector.serialize()), 200

# DELETE collector
@bp.route('/<int:id>', methods=['DELETE'])
def delete_collector(id):
    """
    Deletes a collector from the database.

    Args:
        id: The ID of the collector to delete.

    Returns:
        A JSON response indicating success, or a 404 error if not found.
    """
    collector = GarbageCollector.query.get_or_404(id)
    db.session.delete(collector)
    db.session.commit()
    return jsonify({"message": "Collector deleted."}), 200

# GET verifications for a specific collector
@bp.route('/<int:collector_id>/verifications', methods=['GET'])
def get_collector_verifications(collector_id):
    """
    Retrieves the verification history for a specific collector.

    Args:
        collector_id: The ID of the collector.

    Returns:
        A JSON response containing the verification history.
    """
    verifications = Verification.query.filter_by(collector_id=collector_id).all()

    verification_history = []
    for verification in verifications:
        verification_history.append({
            'id': verification.id,
            'verifier_name': verification.verifier_name,
            'verified_at': verification.verified_at.isoformat(),
            'collector_id': verification.collector_id,
        })

    return jsonify(verification_history), 200
