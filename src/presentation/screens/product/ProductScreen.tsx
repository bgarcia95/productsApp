import { useRef } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';

import { getProductById, updateCreateProduct } from '../../../actions/products';

import MainLayout from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Product } from '../../../domain/entities/product';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { ProductImages } from '../../components/products/ProductImages';
import { GENDERS, SIZES } from '../../../config/constants/constants';

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: ProductScreenProps) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  // useQuery
  const { data: product, error } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: async () => getProductById(productIdRef.current),
  });

  // useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // creation
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      // queryClient.setQueryData(['product', data.id], data);
    },
  });

  if (!product) {
    return <MainLayout title="Loading..." />;
  }

  return (
    <Formik initialValues={product} onSubmit={values => mutate(values)}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subtitle={`Price: $${values.price}`}>
          <ScrollView style={{ flex: 1 }}>
            {/* Images */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProductImages images={values.images} />
            </Layout>

            {/* Form */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={'Product title'}
                value={values.title}
                onChangeText={handleChange('title')}
                style={{ marginVertical: 5 }}
              />
              <Input
                label={'Slug'}
                value={values.slug}
                onChangeText={handleChange('slug')}
                style={{ marginVertical: 5 }}
              />
              <Input
                label={'Description'}
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
              />
            </Layout>

            {/* Price and Stock */}
            <Layout
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
                marginVertical: 5,
              }}
            >
              <Input
                label="Price"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{ flex: 1 }}
                keyboardType="numeric"
              />
              <Input
                label="Stock"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{ flex: 1 }}
                keyboardType="numeric"
              />
            </Layout>

            {/* Selectors */}
            <ButtonGroup
              style={{ marginTop: 20, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {SIZES.map(size => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup
              style={{ marginTop: 20, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {GENDERS.map(gender => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                >
                  {gender.toUpperCase()}
                </Button>
              ))}
            </ButtonGroup>

            {/* Save button */}
            <Button
              accessoryLeft={<CustomIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled={isPending}
              style={{ margin: 15 }}
            >
              Save
            </Button>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
