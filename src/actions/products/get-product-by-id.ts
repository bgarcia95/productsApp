import { tesloApi } from '../../config/api/tesloApi';
import { Gender, Product } from '../../domain/entities/product';
import { TesloProduct } from '../../infrastructure/interfaces/products.response';
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';

const emptyProduct: Product = {
  id: '',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
  images: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;

  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);

    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching product by id ${id}`);
  }
};
