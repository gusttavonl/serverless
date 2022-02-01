import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function getProducts(event, context) {
  let products
  try {
    const result = await dynamoDb.scan({
      TableName: process.env.PRODUCTS_TABLE_NAME,
    }).promise()
  
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

export const handler = commonMiddleware(getProducts)


