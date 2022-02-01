import { getEndedProducts } from '../lib/getEndedProducts'

async function processProducts(event, context) {
  const productsToClose = await getEndedProducts()
  console.log(productsToClose)
}

export const handler = processProducts