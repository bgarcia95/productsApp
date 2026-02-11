import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';

import MainLayout from '../../layouts/MainLayout';

import { RootStackParams } from '../../navigation/StackNavigator';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { Formik } from 'formik';

const sizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL];

const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: ProductScreenProps) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();

  // useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: async () => getProductById(productIdRef.current),
  });
  // useMutation

  if (!product) {
    return <MainLayout title="Loading..." />;
  }

  return (
    <Formik initialValues={product} onSubmit={() => {}}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subtitle={`Price: $${values.price}`}>
          <ScrollView style={{ flex: 1 }}>
            {/* Images */}
            <Layout>
              {/* TODO: take into account when there are no images */}
              <FlatList
                data={values.images}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <FadeInImage
                    uri={item}
                    style={{ width: 300, height: 300, marginHorizontal: 7 }}
                  />
                )}
              />
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
              />
              <Input
                label="Stock"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{ flex: 1 }}
              />
            </Layout>

            {/* Selectors */}
            <ButtonGroup
              style={{ marginTop: 20, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {sizes.map(size => (
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
              {genders.map(gender => (
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
              onPress={() => {
                console.log('Save!');
              }}
              style={{ margin: 15 }}
            >
              Save
            </Button>

            <Text>{JSON.stringify(product, null, 2)}</Text>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
