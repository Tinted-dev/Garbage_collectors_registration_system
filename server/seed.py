from app import create_app, db
from app.models.user import User
from app.models.collector import GarbageCollector
from app.models.region import Region
from app.models.verification import Verification

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Regions
    region1 = Region(name="Nairobi West")
    region2 = Region(name="Eastlands")
    region3 = Region(name="Kasarani")
    db.session.add_all([region1, region2, region3])
    db.session.commit()

    # Admin User
    admin = User(email="admin@cejad.org", password="admin123", role="admin")
    user = User(email="user@community.org", password="user123", role="public")
    db.session.add_all([admin, user])
    db.session.commit()

    # Collectors
    collector1 = GarbageCollector(
        full_name="James Wanyama",
        email="james@gcollectors.com",
        phone="0700123456",
        national_id="12345678",
        regions=[region1, region2]
    )

    collector2 = GarbageCollector(
        full_name="Sarah Njoki",
        email="sarah@gcollectors.com",
        phone="0711123456",
        national_id="87654321",
        regions=[region3]
    )
    collector3 = GarbageCollector(
        full_name="Wahome Maina",
        email="wahome@gcollectors.com",
        phone="0751123456",
        national_id="57654321",
        regions=[region1]
    )
    collector4 = GarbageCollector(
        full_name="Leah Njoki",
        email="Leah@gcollectors.com",
        phone="0741123456",
        national_id="67654321",
        regions=[region2]
    )
    collector5 = GarbageCollector(
        full_name="Sam Njoroge",
        email="sa@gcollectors.com",
        phone="0731123456",
        national_id="77654321",
        regions=[region3]
    )

    db.session.add_all([collector1, collector2,collector3, collector4, collector5 ])
    db.session.commit()

    # Verifications
    v1 = Verification(collector_id=collector1.id, verifier_name="Paul Otieno")
    v2 = Verification(collector_id=collector2.id, verifier_name="Mary Atieno")

    db.session.add_all([v1, v2])
    db.session.commit()

    print("✅ Sample data seeded!")
