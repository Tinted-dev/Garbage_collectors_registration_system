from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db
from app.models.company import Company
from app.models.region import Region

company_bp = Blueprint('company_bp', __name__)

# Create a new company (only accessible by company owners)
@company_bp.route('/', methods=['POST'])
@jwt_required()
def create_company():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Validate input
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    description = data.get('description')
    region_ids = data.get('region_ids', [])  # List of region IDs

    if not name or not email or not phone:
        return jsonify({"msg": "Name, email, and phone are required"}), 400

    # Check if company already exists
    existing_company = Company.query.filter_by(name=name).first()
    if existing_company:
        return jsonify({"msg": "Company with this name already exists"}), 409

    # Create new company
    company = Company(name=name, email=email, phone=phone, description=description, user_id=user_id)

    # Add regions to company
    regions = Region.query.filter(Region.id.in_(region_ids)).all()
    company.regions.extend(regions)

    db.session.add(company)
    db.session.commit()

    return jsonify(company.to_dict()), 201


# Get all companies (accessible by everyone)
@company_bp.route('/', methods=['GET'])
def get_all_companies():
    companies = Company.query.all()
    return jsonify([company.to_dict() for company in companies])


# Get company details by ID (accessible by everyone)
@company_bp.route('/<int:company_id>', methods=['GET'])
def get_company(company_id):
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"msg": "Company not found"}), 404
    return jsonify(company.to_dict())


# Update company details (only accessible by company owners)
@company_bp.route('/<int:company_id>', methods=['PUT'])
@jwt_required()
def update_company(company_id):
    user_id = get_jwt_identity()
    company = Company.query.get(company_id)

    if not company:
        return jsonify({"msg": "Company not found"}), 404

    if company.user_id != user_id:
        return jsonify({"msg": "You do not have permission to edit this company"}), 403

    data = request.get_json()
    company.name = data.get('name', company.name)
    company.email = data.get('email', company.email)
    company.phone = data.get('phone', company.phone)
    company.description = data.get('description', company.description)

    # Update regions if provided
    region_ids = data.get('region_ids', [])
    if region_ids:
        regions = Region.query.filter(Region.id.in_(region_ids)).all()
        company.regions = regions

    db.session.commit()

    return jsonify(company.to_dict())


# Delete a company (only accessible by company owners)
@company_bp.route('/<int:company_id>', methods=['DELETE'])
@jwt_required()
def delete_company(company_id):
    user_id = get_jwt_identity()
    company = Company.query.get(company_id)

    if not company:
        return jsonify({"msg": "Company not found"}), 404

    if company.user_id != user_id:
        return jsonify({"msg": "You do not have permission to delete this company"}), 403

    db.session.delete(company)
    db.session.commit()

    return jsonify({"msg": "Company deleted successfully"}), 200
