import json

import requests
from sqlalchemy import exc

from src.db_handler import db
from src.db_handler.model import Users


def save_users(app, payload):
    users_list = []
    for user in payload["results"]:
        user_dict = {'name': f'{user["name"]["first"]} {user["name"]["last"]}',
                     'gender': user["gender"],
                     'email': user["email"],
                     'country': user["location"]["country"]
                     }
        users_list.append(Users(**user_dict))
    with app.app_context():
        db.session.add_all(users_list)
        try:
            db.session.commit()
            insert_status = True
        except exc.SQLAlchemyError as exception:
            raise
        return insert_status


def request_user_profile(app, api_url, max_users):
    payload = {'inc': 'name, gender, email, location', 'results': max_users}
    try:
        request = requests.get(
            '{api_url}'.format(api_url=api_url),
            params=payload
        )
        request.raise_for_status()

    except requests.exceptions.HTTPError as err:
        print('HTTP Error', err)

    except requests.exceptions.ConnectionError as errc:
        print('Error Connecting:', errc)

    except requests.exceptions.Timeout as errt:
        print('Timeout Error:', errt)

    except requests.exceptions.RequestException as err:
        print('OOps: Something Else', err)

    results = json.loads(request.content.decode('utf-8'))

    return save_users(app, results)
