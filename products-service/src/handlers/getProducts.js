import AWS from 'aws-sdk'
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHendler from '@middy/http-error-handler'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function getProducts(event, context) {
  let products
  try {
    const result = await dynamoDb.scan({
      TableName: proccess.env.PRODUCTS_TABLE_NAME,
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

export const handler = middy(getProducts)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHendler())


