from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models import db
from app.models.company import Company
from app.models.region import Region
from app.models.user import User  # Make sure to import User model

company_bp = Blueprint('company_bp', __name__)

# ✅ Create a new company AND a user account
@company_bp.route('/register', methods=['POST', 'OPTIONS'])
def register_company():
    if request.method == 'OPTIONS':
        return jsonify({}), 200  # Handle CORS preflight

    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')  # ✅ Must be included in frontend
    description = data.get('description')
    region_name = data.get('region')  # Assuming region is sent by name

    if not all([name, email, phone, password, region_name]):
        return jsonify({"msg": "All fields are required"}), 400

    # ✅ Check if user email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "Email already registered"}), 409

    # ✅ Create the user account
    hashed_pw = generate_password_hash(password)
    user = User(email=email, password=hashed_pw, role='company')
    db.session.add(user)
    db.session.flush()  # allows access to user.id before commit

    # ✅ Find region by name
    region = Region.query.filter_by(name=region_name).first()
    if not region:
        return jsonify({"msg": "Selected region not found"}), 404

    # ✅ Create the company
    company = Company(
        name=name,
        email=email,
        phone=phone,
        description=description,
        user_id=user.id
    )
    company.regions.append(region)

    db.session.add(company)
    db.session.commit()

    return jsonify({"msg": "Company registered successfully. Please login."}), 201
