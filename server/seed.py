from app import create_app
from app.database import db
from app.models.company import Company, GarbageCollector
from app.models.region import Region
from app.models.user import User
from app.models.service_request import Verification
from werkzeug.security import generate_password_hash
import random

app = create_app()

def seed_data():
    with app.app_context():
        # Seed Regions
        regions = [
            'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
            'Kisii', 'Machakos', 'Nyeri', 'Meru'
        ]
        
        for region_name in regions:
            if not Region.query.filter_by(name=region_name).first():
                db.session.add(Region(name=region_name))
        db.session.commit()

        # Seed Companies
        companies = [
            {"name": "Clean Kenya Limited", "description": "Waste collection services for residential and commercial areas.", "region": "Nairobi"},
            {"name": "Eco Waste Solutions", "description": "Environmental waste management services across Kenya.", "region": "Mombasa"},
            {"name": "Green Waste Management", "description": "Providing sustainable waste disposal solutions.", "region": "Kisumu"},
            {"name": "Kenyatta Waste Collectors", "description": "Efficient waste collection services in Nairobi and surrounding areas.", "region": "Nairobi"},
            {"name": "Waste No More Ltd", "description": "Recycling and disposal of waste materials.", "region": "Nakuru"}
        ]

        for company_data in companies:
            if not Company.query.filter_by(name=company_data['name']).first():
                region = Region.query.filter_by(name=company_data['region']).first()
                company = Company(name=company_data['name'], description=company_data['description'], is_approved=True)
                company.regions.append(region)
                db.session.add(company)
        db.session.commit()

        # Seed Admin User
        admin_email = "admin@garbagecollectors.com"
        admin_password = "admin123"
        if not User.query.filter_by(email=admin_email).first():
            hashed_password = generate_password_hash(admin_password, method='sha256')
            admin = User(email=admin_email, password_hash=hashed_password, role='admin')
            db.session.add(admin)
        db.session.commit()

        # Seed Collectors
        companies = Company.query.all()
        for i in range(1, 6):
            email = f"collector{i}@mail.com"
            if not User.query.filter_by(email=email).first():
                password = generate_password_hash("collector123", method='sha256')
                user = User(email=email, password_hash=password, role="collector")
                db.session.add(user)
                db.session.commit()

                # Assign to a random company
                collector = GarbageCollector(name=f"Collector {i}", user_id=user.id, company_id=random.choice(companies).id)
                db.session.add(collector)
        db.session.commit()

        # Seed Verification Requests
        collectors = GarbageCollector.query.all()
        for collector in collectors:
            for j in range(2):  # Each collector gets 2 verifications
                verification = Verification(
                    name=f"Client {collector.name} - {j}",
                    phone_number=f"0712345{random.randint(100,999)}",
                    status="verified",
                    collector_id=collector.id
                )
                db.session.add(verification)
        db.session.commit()

        print("✅ Database seeded successfully with regions, companies, admin, collectors, and verifications!")

if __name__ == '__main__':
    seed_data()
