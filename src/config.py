import os


def config_str_to_obj(env):
    from werkzeug.utils import import_string
    class_name = ''.join([name.capitalize() for name in env.split('_')])
    return import_string(f'src.config.{class_name}Config')()


class Config(object):
    DEBUG = False
    TESTING = False
    # log all the statements issued to stderr?
    SQLALCHEMY_ECHO = DEBUG
    # track and emit signals on object modification? performance issue
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')
    DB_HOST = os.getenv('DB_HOST')
    DB_NAME = 'demicon'

    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{DB_USER}:{DB_PASS}@localhost/{DB_NAME}'
