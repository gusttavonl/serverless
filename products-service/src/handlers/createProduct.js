import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHendler from '@middy/http-error-handler'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function createProduct(event, context) {
  const { title, qtd, status } = event.body;
  const now = new Date()

  const product = {
    id: uuid,
    title,
    qtd,
    status,
    createdAt: now.toISOString()
  }

  try {
    await dynamoDb.put({
      TableName: proccess.env.PRODUCTS_TABLE_NAME,
      Item: product
    }).promise()
  
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
 
  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
}

export const handler = middy(createProduct)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHendler())


