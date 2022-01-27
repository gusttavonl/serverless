import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'
import commonMiddleware from '../../lib/commonMiddleware'
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
    createdAt: now.toISOString(),
    bid: {
      amount: 0
    }
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

export const handler = commonMiddleware(createProduct)


