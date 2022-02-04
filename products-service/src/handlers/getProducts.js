import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import validator from '@middy/validator'
import schema from '../lib/schemas/getProductsSchema'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function getProducts(event, context) {
  let products
  const { status } = event.queryStringParameters
  try {
    const params = {
      TableName: process.env.PRODUCTS_TABLE_NAME,
      IndexName: 'statusAndEndDate',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeValues: {
        ':status': status,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
      },
    };
    const result = await dynamoDb.query(params).promise();
    products = result.Items
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
}

export const handler = commonMiddleware(getProducts).use(validator({ inputSchema: schema, useDefaults: true }))


