import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///garbage_system.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'mumbidenis@gmail.com'  #  Set to your admin email
    MAIL_PASSWORD = '7August92'  #  Replace with your Gmail password
    MAIL_DEFAULT_SENDER = 'mumbidenis@gmail.com' # Set to your admin email
    ADMIN_EMAIL = 'mumbidenis@gmail.com'
