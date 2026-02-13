import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductsByPage } from '../../../actions/products/get-products-by-page';

import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductList from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParams, 'HomeScreen'>>();

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hour
  //   queryFn: async () => getProductsByPage(0),
  // });

  const {
    isLoading,
    data: products,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async params => await getProductsByPage(params.pageParam),

    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subtitle="Product maintenance"
        rightAction={() => {}}
        rightActionIcon="plus-outline"
      >
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            products={products?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        )}
      </MainLayout>
      <FAB
        iconName="plus-outline"
        onPress={() =>
          navigation.navigate('ProductScreen', { productId: 'new' })
        }
        style={{ position: 'absolute', bottom: 30, right: 20 }}
      />
    </>
  );
};
