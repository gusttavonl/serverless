import AWS from 'aws-sdk'
import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export async function getProductById(id) {
  let product
  try {
    const result = await dynamoDb.get({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Key: { id }
    }).promise()
  
    product = result.Item
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  if(!product){
    throw new createError.NotFound(`Product with id ${id} not exists!`)
  }

  return product
}

async function getProduct(event, context) {
  const { id } = event.pathParameters
  const product = await getProductById(id)
 
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
}

export const handler = commonMiddleware(getProduct)


