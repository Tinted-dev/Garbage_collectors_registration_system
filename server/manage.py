from flask_script import Manager
from flask_migrate import MigrateCommand
from app import create_app, db

app = create_app()
manager = Manager(app)

# Add the 'db' command to the manager
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
