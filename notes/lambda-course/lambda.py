from __future__ import print_function

import boto3
import json

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
    httpMethods = {
        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
        'GET': lambda dynamo, x: dynamo.scan(**x),
        'POST': lambda dynamo, x: dynamo.put_item(**x),
        'PUT': lambda dynamo, x: dynamo.update_item(**x),
    }

    httpMethod = 'GET'

    if httpMethod == 'GET':
        request = event['queryStringParameters']
        operation = request['operation']

        if operation == 'getCourseById':
            courseId = request['courseId']
            return respond(None, getCourseById(courseId))
        elif operation == 'getAllCoursesMetadata':
            return respond(None, getAllCoursesMetadata())
        elif operation == 'updateCourseMetadata':
            courseId = request['courseId']
            metadata = request['metadata']
            return respond(None, updateCourseMetadata(courseId, metadata))
        elif operation == 'updateCourseChapters':
            courseId = request['courseId']
            chapters = request['chapters']
            return respond(None, updateCourseChapters(courseId, chapters))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(httpMethod)))

def getCourseById(courseId):
    return getItem('course', { 'courseId': courseId })

def getAllCoursesMetadata():
    return scan('course', "courseId, metadata")

def updateCourseMetadata(courseId, metadata):
    itemKey = { 'courseId': courseId }
    expression = "set metadata = :metadata"
    expressionAttributeValues = {
        ':metadata': metadata
    }
    returnValues = "UPDATED_NEW"
    return updateItem('course', itemKey, expression, expressionAttributeValues, returnValues)

def updateCourseChapters(courseId, chapters):
    itemKey = { 'courseId': courseId }
    expression = "set payload = :chapters"
    expressionAttributeValues = {
        ':chapters': chapters
    }
    returnValues = "UPDATED_NEW"
    return updateItem('course', itemKey, expression, expressionAttributeValues, returnValues)

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