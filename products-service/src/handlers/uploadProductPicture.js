import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import cors from '@middy/http-cors';
import createError from 'http-errors';
import { getProductById } from './getProduct';
import { uploadPictureToS3 } from '../lib/uploadPictureToS3';
import { setProductPictureUrl } from '../lib/setProductPictureUrl';
import uploadProductPictureSchema from '../lib/schemas/uploadProductPictureSchema';

export async function uploadProductPicture(event) {
  const { id } = event.pathParameters;
  const { email } = event.requestContext.authorizer;
  const product = await getProductById(id);

  if (product.creator !== email) {
    throw new createError.Forbidden(`You are not the creator of this product!`);
  }

  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  let updatedProduct;

  try {
    const pictureUrl = await uploadPictureToS3(product.id + '.jpg', buffer);
    updatedProduct = await setProductPictureUrl(product.id, pictureUrl);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedProduct),
  };
}

export const handler = middy(uploadProductPicture)
  .use(httpErrorHandler())
  .use(validator({ inputSchema: uploadProductPictureSchema }))
  .use(cors());