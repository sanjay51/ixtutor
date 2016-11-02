from __future__ import print_function
import uuid
import time

import boto3
import json

DYNAMO_TABLE_NAME = 'user'
def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'OPTIONS', 
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, Content-Type=application/json'
        },
    }


def lambda_handler(event, context):
    httpMethod = event['httpMethod']

    if httpMethod == 'GET':
        request = event['queryStringParameters']
        operation = request['operation']

        if operation == 'getUserByEmail':
            userEmail = request['userEmail']
            return respond(None, getUserByEmail(userEmail))
        elif operation == 'getUserById':
            userId = request['userId']
            return respond(None, getUserById(userId))
        elif operation == 'login':
            userEmail = request['userEmail']
            password = request['password']
            return respond(None, login(userEmail, password))
        elif operation == 'signup':
            email = request['email']
            password = request['password']
            name = request['name']
            # TODO: Validate few things here (email in use, basic checks etc.)
            return respond(None, signup(email, password, name))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(httpMethod)))

def getUserByEmail(userEmail):
    return getItem('user', { 'email': userEmail })

def getUserById(userId):
    return getItem('user', { 'id': userId })

def login(userEmail, password):
    return getUserByEmail(userEmail)

def signup(email, password, name):
    # make a UUID based on the host ID and current time
    id = str(uuid.uuid1())

    # use epoch time for creation time
    epoch = time.time()

    item = {
        'id': id, 
        'email': email, 
        'password': password,
        'data': json.dumps({
            'name': name,
            'status': 'ACTIVE',
            'creation_timestamp': str(epoch),
            'courses_authored': [],
            'courses_enrolled': []
        })
    }

    return putItem(DYNAMO_TABLE_NAME, item)

def getItem(tableName, itemKey):
    table = boto3.resource('dynamodb', region_name='us-east-1').Table(tableName)
    return table.get_item(Key=itemKey)

def updateItem(tableName, itemKey, expression, expressionAttributeValues, returnValues):
    table = boto3.resource('dynamodb', region_name='us-east-1').Table(tableName)
    return table.update_item(Key=itemKey, UpdateExpression=expression, 
        ExpressionAttributeValues=expressionAttributeValues, ReturnValues=returnValues)

def scan(tableName, projection):
    table = boto3.resource('dynamodb', region_name='us-east-1').Table(tableName)
    return table.scan(ProjectionExpression=projection)

def putItem(tableName, item):
    table = boto3.resource('dynamodb', region_name='us-east-1').Table(tableName)
    return table.put_item(Item=item)
