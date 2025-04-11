from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User

bp = Blueprint('users', __name__, url_prefix='/users')

# GET all users (for admin/debug only)
@bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200

# POST register user
@bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    try:
        user = User(
            email=data['email'],
            password=data['password'],  # In production, hash this!
            role=data.get('role', 'public')
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# POST login
@bp.route('/login', methods=['POST'])
def login_user():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify(user.serialize()), 200
    return jsonify({"error": "Invalid credentials"}), 401
