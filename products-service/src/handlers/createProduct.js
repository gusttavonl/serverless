import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function createProduct(event, context) {
  const { title, qtd, status } = JSON.parse(event.body);
  const now = new Date()

  const product = {
    id: uuid,
    title,
    qtd,
    status,
    createdAt: now.toISOString()
  }

  dynamoDb.put({
    TableName: proccess.env.PRODUCTS_TABLE_NAME,
    Item: product
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
}

export const handler = createProduct;


