import AWS from 'aws-sdk'
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHendler from '@middy/http-error-handler'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function getProduct(event, context) {
  let product
  try {
    const { id } = event.pathParameters
    const result = await dynamoDb.get({
      TableName: proccess.env.PRODUCTS_TABLE_NAME,
      key: { id }
    }).promise()
  
    product = result.Item
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  if(!product){
    throw new createError.NotFound(`Product with id ${id} not exists!`)
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
}

export const handler = middy(getProduct)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHendler())


