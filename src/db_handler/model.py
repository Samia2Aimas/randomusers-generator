from . import db


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(60), nullable=False)

    def as_dict(self):
        return {column.name: (getattr(self, column.name)) for column in self.__table__.columns}