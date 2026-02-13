import { Image } from 'react-native';

import { Product } from '../../../domain/entities/product';
import { Card, Text } from '@ui-kitten/components';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Card
      onPress={() =>
        navigation.navigate('ProductScreen', { productId: product.id })
      }
      style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 3 }}
    >
      {product.images.length === 0 ? (
        <Image
          source={require('./../../../assets/no-product-image.png')}
          style={{ height: 200, width: '100%' }}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{ flex: 1, height: 200, width: '100%' }}
        />
      )}

      <Text numberOfLines={2} style={{ textAlign: 'center', color: 'black' }}>
        {product.title}
      </Text>
    </Card>
  );
};
export default ProductCard;
