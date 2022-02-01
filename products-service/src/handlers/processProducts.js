import createError from 'http-errors'
import { getEndedProducts } from '../lib/getEndedProducts'
import { closeProduct } from '../lib/closeProduct'

async function processProducts(event, context) {
  try {
    const productsToClose = await getEndedProducts()
    const productsClosed = productsToClose.map((product) => closeProduct(product))
    await Promise.all(productsClosed)

    return { closed: productsClosed.length}
  } catch (error) {
    throw new createError.InternalServerError(error)
  }
}

export const handler = processProducts