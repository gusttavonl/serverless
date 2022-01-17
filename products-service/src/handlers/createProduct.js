async function createProduct(event, context) {
  const { title, qtd, status } = JSON.parse(event.body);
  const now = new Date()

  const product = {
    title,
    qtd,
    status,
    createdAt: now.toISOString()
  }
  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
}

export const handler = createProduct;


