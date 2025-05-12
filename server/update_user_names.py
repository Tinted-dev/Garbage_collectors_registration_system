from app import create_app
from app.database import db
from app.models.user import User  # Adjust import if needed

app = create_app()

with app.app_context():
    # Query all users with NULL name
    users_to_update = User.query.filter_by(name=None).all()
    
    for user in users_to_update:
        user.name = "Unknown"  # Change this default name as needed
    
    db.session.commit()
    print(f"Updated {len(users_to_update)} user(s).")
