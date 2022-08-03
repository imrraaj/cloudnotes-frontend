import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from '@mantine/core';
import { Alien, At } from 'tabler-icons-react';

const HOST: String = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('xxx-Authorization')) {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEX.test(credentials.email)) return;
    if (credentials.password.length < 5) return;

    const response = await fetch(`${HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.error !== undefined) {
      navigate('/login');
    } else {
      await localStorage.setItem('xxx-Authorization', json.authToken);
      navigate('/dashboard');
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: theme.headings.fontFamily,
          fontWeight: 700,
        })}
      >
        Welcome back!
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Text component={Link} to="/signup" size="sm" color="teal" underline>
          Create account
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            label="Email"
            name="email"
            variant="filled"
            icon={<At />}
            size="md"
            placeholder="name@example.com"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <PasswordInput
            label="Password"
            icon={<Alien />}
            mt="md"
            name="password"
            variant="filled"
            size="md"
            placeholder="Your password"
            value={credentials.password}
            onChange={onChange}
            required
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            {loading ? <Loader size="sm" color="#ffffff" /> : 'Sign in'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
