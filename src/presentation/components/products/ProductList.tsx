import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { Layout, List } from '@ui-kitten/components';

import { Product } from '../../../domain/entities/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  fetchNextPage: () => void;
}

const ProductList = ({ products, fetchNextPage }: ProductListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });

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
