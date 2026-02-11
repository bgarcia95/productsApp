import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/authStore';

interface LoginScreenProps
  extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { height } = useWindowDimensions();
  const { login } = useAuthStore();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsLoggingIn(true);

    const wasSuccessful = await login(form.email, form.password);

    setIsLoggingIn(false);

    if (wasSuccessful) return;

    Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <Text category="h1">Login</Text>
          <Text category="p2">Please login to continue</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            style={{ marginBottom: 10 }}
          />
          <Input
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            style={{ marginBottom: 20 }}
          />
        </Layout>

        <Layout style={{ height: 10 }} />

        <Layout>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}
            onPress={onLogin}
            disabled={isLoggingIn}
          >
            Login
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
          <Text category="p2">Don't have an account?</Text>
          <Text
            category="s1"
            status="primary"
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            {' '}
            Sign up
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
