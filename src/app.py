import os
from itertools import groupby
from operator import itemgetter

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask
from flask_cors import CORS

from src.config import config_str_to_obj
from src.requests import request_user_profile
from src.utils import create_status_success_response


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['API_URL'] = os.getenv("API_URL")
    app.config['MAX_USERS'] = os.getenv("MAX_USERS")
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(config_str_to_obj(app.env))

    with app.app_context():
        from src.db_handler import db
        db.init_app(app)
        db.create_all()

    app.logger.info(f'app {app.name} running in environment: {app.env}')

    # creating a flask scheduler
    sched = BackgroundScheduler(daemon=True)
    sched.add_job(func=request_user_profile,
                  trigger="interval",
                  seconds=36000,
                  args=[app, app.config['API_URL'], app.config['MAX_USERS']]
                  )
    sched.start()

    # Initial load of data
    request_user_profile(app, app.config['API_URL'], app.config['MAX_USERS'])

    @app.route('/get_users', methods=['GET'])
    def get_users():
        from src.db_handler.model import Users
        users = Users.query.all()
        result = [record.as_dict() for record in users]
        sorted_input = sorted(result, key=itemgetter("country"))
        groups = groupby(sorted_input, key=itemgetter("country"))
        result = list(
            map(
                lambda x: dict(
                    name=x[0],
                    users=list(map(lambda y: dict(email=y["email"], gender=y["gender"], name=y["name"]), x[1]))
                ),
                groups
            ))
        response = create_status_success_response(result)
        return response

    return app
