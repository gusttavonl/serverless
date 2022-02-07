import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import schema from '../lib/schemas/placeBidSchema'
import createError from 'http-errors'
import { getProductById } from './getProduct'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function placeBid(event, context) {
  let updatedProduct
  
  const { id } = event.pathParameters
  const { amount } = event.body

  const product = await getProductById(id)

  if(product.status !== 'OPEN') {
    throw new createError.Forbidden(`You cannot change the bid of closed products!`)
  }

  if(amount === product.bid.amount) {
    throw new createError.Forbidden(`Your bid must be different than ${product.bid.amount}!`)
  }

  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set bid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    const result = await dynamoDb.update(params).promise()
    updatedProduct = result.Attributes
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedProduct),
  };
}

export const handler = commonMiddleware(placeBid).use(validator({ inputSchema: schema }))


