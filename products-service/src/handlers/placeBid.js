import AWS from 'aws-sdk'
import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function placeBid(event, context) {
  let updatedProduct
  
  const { id } = event.pathParameters
  const { amount } = event.body

  const params = {
    TableName: proccess.env.PRODUCTS_TABLE_NAME,
    key: { id },
    UpdateExpession: 'set bid.amount = :amount',
    ExpressionAttributesValues: {
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

export const handler = commonMiddleware(placeBid)


