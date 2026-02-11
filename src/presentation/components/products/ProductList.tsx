import { Layout, List } from '@ui-kitten/components';

import { Product } from '../../../domain/entities/product';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

const ProductList = ({ products, fetchNextPage }: ProductListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    // Sleep 2s
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
    />
  );
};
export default ProductList;
