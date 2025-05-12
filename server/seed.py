from flask import Flask
from app.database import db
from app.models.region import Region
from app.models.company import Company
from app.models.user import User
from app.models.service_request import ServiceRequest
from werkzeug.security import generate_password_hash  # ✅ Hash passwords
import random

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def seed_data():
    with app.app_context():
        # ✅ Create tables before seeding
        db.create_all()

        # Seed Regions
        regions = [
            'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
            'Kisii', 'Machakos', 'Nyeri', 'Meru'
        ]
        for region_name in regions:
            if not Region.query.filter_by(name=region_name).first():
                db.session.add(Region(name=region_name))
        db.session.commit()

        # Seed Admin User
        admin_email = "admin@garbagecollectors.com"
        admin_user = User.query.filter_by(email=admin_email).first()
        if not admin_user:
            admin = User(
                email=admin_email,
                password=generate_password_hash("admin123"),  # ✅ Hash password
                role="admin"
            )
            db.session.add(admin)
            db.session.commit()
            admin_user = admin  # Get the newly created admin user

        # Seed Companies with email and phone, associated with admin
        companies_data = [
            {
                "name": "Clean Kenya Limited",
                "email": "cleankenya@example.com",
                "phone": "+254700111222",
                "description": "Waste collection services for residential and commercial areas.",
                "region": "Nairobi"
            },
            {
                "name": "Eco Waste Solutions",
                "email": "ecowaste@example.com",
                "phone": "+254700333444",
                "description": "Environmental waste management services across Kenya.",
                "region": "Mombasa"
            },
            {
                "name": "Green Waste Management",
                "email": "greenwaste@example.com",
                "phone": "+254700555666",
                "description": "Providing sustainable waste disposal solutions.",
                "region": "Kisumu"
            },
            {
                "name": "Kenyatta Waste Collectors",
                "email": "kenyatta@example.com",
                "phone": "+254700777888",
                "description": "Efficient waste collection services in Nairobi and surrounding areas.",
                "region": "Nairobi"
            },
            {
                "name": "Waste No More Ltd",
                "email": "wastenomore@example.com",
                "phone": "+254700999000",
                "description": "Recycling and disposal of waste materials.",
                "region": "Nakuru"
            }
        ]
        for company_data in companies_data:
            if not Company.query.filter_by(name=company_data['name']).first():
                region = Region.query.filter_by(name=company_data['region']).first()
                company = Company(
                    name=company_data['name'],
                    email=company_data['email'],
                    phone=company_data['phone'],
                    description=company_data['description'],
                    is_approved=True,
                    user_id=admin_user.id
                )
                company.regions.append(region)
                db.session.add(company)
        db.session.commit()

        # Seed Collectors and Assign to Companies
        companies = Company.query.all()
        for i in range(1, 6):
            email = f"collector{i}@mail.com"
            if not User.query.filter_by(email=email).first():
                collector = User(
                    email=email,
                    password=generate_password_hash("collector123"),  # ✅ Hash password
                    role="collector"
                )
                db.session.add(collector)
                db.session.commit()
                company = random.choice(companies)
                company.collectors.append(collector)  # Changed 'users' to 'collectors'
                db.session.add(company)
        db.session.commit()

        # Seed Service Requests
        users = User.query.filter_by(role='collector').all()
        for user in users:
            for j in range(2):
                service_request = ServiceRequest(
                    full_name=f"Client {user.email} - {j+1}",
                    phone=f"0712345{random.randint(100,999)}",
                    description=f"Verification request for collector {user.email}",
                    company_id=random.choice(companies).id
                )
                db.session.add(service_request)
        db.session.commit()

        print("✅ Database seeded successfully with regions, companies, admin, collectors, and service requests!")

if __name__ == '__main__':
    seed_data()
