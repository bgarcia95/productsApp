import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/authStore';

interface RegisterScreenProps
  extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { height } = useWindowDimensions();
  const { signup } = useAuthStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const onRegister = async () => {
    if (
      form.name.length === 0 ||
      form.email.length === 0 ||
      form.password.length === 0
    ) {
      return;
    }

    setIsRegistering(true);

    const wasSuccessful = await signup(form.name, form.email, form.password);

    setIsRegistering(false);

    if (wasSuccessful) return;

    Alert.alert(
      'Registration Failed',
      'An error occurred while creating your account. Please try again.',
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <Text category="h1">Create Account</Text>
          <Text category="p2">Please create an account to continue</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            accessoryLeft={<CustomIcon name="person-outline" />}
            placeholder="Full name"
            value={form.name}
            style={{ marginBottom: 10 }}
            onChangeText={text => setForm({ ...form, name: text })}
          />
          <Input
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={text => setForm({ ...form, email: text })}
            style={{ marginBottom: 10 }}
          />
          <Input
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={text => setForm({ ...form, password: text })}
            style={{ marginBottom: 20 }}
          />
        </Layout>

        <Layout style={{ height: 10 }} />

        <Layout>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}
            onPress={onRegister}
            disabled={isRegistering}
          >
            Register
          </Button>
        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Text category="p2">Already have an account?</Text>
          <Text
            category="s1"
            status="primary"
            onPress={() => navigation.goBack()}
          >
            {' '}
            Sign in
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
