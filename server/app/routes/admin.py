from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db
from app.models.company import Company
from app.models.user import User
from app.models.region import Region  # Import Region model

admin_bp = Blueprint('admin_bp', __name__)

# Approve a company (only accessible by admins)
@admin_bp.route('/approve_company/<int:company_id>', methods=['PUT'])
# @jwt_required()
def approve_company(company_id):
    user_id = get_jwt_identity()
    # Check if the user is an admin
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({"msg": "You do not have permission to approve companies"}), 403

    company = Company.query.get(company_id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404

    company.is_approved = True
    db.session.commit()

    return jsonify({"msg": "Company approved successfully", "company": company.to_dict()})

@admin_bp.route('/companies', methods=['GET'])
# @admin_required  # optional, remove if you want public access
def get_approved_companies():
    approved_companies = Company.query.filter_by(is_approved=True).all()
    return jsonify([company.to_dict() for company in approved_companies]), 200


# Get all unapproved companies (only accessible by admins)
@admin_bp.route('/unapproved_companies', methods=['GET'])
# @jwt_required()
def get_unapproved_companies():
    user_id = get_jwt_identity()
    # Check if the user is an admin
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({"msg": "You do not have permission to view unapproved companies"}), 403

    companies = Company.query.filter_by(is_approved=False).all()
    return jsonify([company.to_dict() for company in companies])

# Get all regions (only accessible by admins)
@admin_bp.route('/regions', methods=['GET'])
# @jwt_required()

@admin_bp.route('/regions', methods=['GET'])
def get_regions():
    try:
        regions = Region.query.all()
        return jsonify([region.to_dict() for region in regions]), 200
    except Exception as e:
        print(f"Error fetching regions: {e}")
        return jsonify({"message": "Internal server error"}), 500


# ... (other admin routes) ...
# Get all users (only accessible by admins)
@admin_bp.route('/users', methods=['GET'])
# @jwt_required()
def get_users():
    user_id = get_jwt_identity()
    # Check if the user is an admin
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({"msg": "You do not have permission to view users"}), 403

    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'email': u.email,
        'role': u.role,
        'companies': [company.to_dict() for company in u.companies]
    } for u in users])


# Admin-only route to add a new region
@admin_bp.route('/add_region', methods=['POST'])
# @jwt_required()
def add_region():
    # Ensure the user is an admin
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({"msg": "You do not have permission to add regions"}), 403

    # Get region data from the request
    data = request.get_json()
    region_name = data.get('name')

    if not region_name:
        return jsonify({"msg": "Region name is required"}), 400

    # Check if the region already exists
    existing_region = Region.query.filter_by(name=region_name).first()
    if existing_region:
        return jsonify({"msg": "Region already exists"}), 400

    # Create a new region
    new_region = Region(name=region_name)
    db.session.add(new_region)
    db.session.commit()

    return jsonify({"msg": "Region added successfully", "region": new_region.to_dict()}), 201
