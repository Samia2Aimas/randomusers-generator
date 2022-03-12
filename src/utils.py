from flask import jsonify


def create_status_success_response(payload=None):
    response = jsonify({
        'statusCode': 200,
        'body': "SUCCESS",
        'data': payload
    })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Credentials', 'True')
    return response
