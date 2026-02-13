import { isAxiosError } from 'axios';

import { tesloApi } from '../../config/api/tesloApi';
import { Product } from '../../domain/entities/product';
import { TesloProduct } from '../../infrastructure/interfaces/products.response';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = (images: string[]) => {
  // TODO: Check FILES

  return images.map(image => image.split('/').pop());
};

// TODO: Check if user comes
const updateProduct = async (product: Partial<Product>) => {
  console.log({ product });
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error updating product');
  }
};

const createProduct = async (
  product: Partial<Product>,
): Promise<TesloProduct> => {
  console.log({ product });
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.post('/products', {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error creating product');
  }
};
