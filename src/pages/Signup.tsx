import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { Alien, At, UserCircle } from "tabler-icons-react";

const HOST = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("xxx-Authorization")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEX.test(credentials.email)) return;
    if (credentials.password.length < 5) return;

    setLoading(true);

    const response = await fetch(`${HOST}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email[0],
        username: credentials.username[0],
        password: credentials.password[0],
      }),
    });

    const responseJson = await response.json();

    if (responseJson.error !== undefined) {
      navigate("/login");
    } else {
      localStorage.setItem("xxx-Authorization", responseJson.authToken);
      navigate("/");
    }

    setLoading(false);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: [e.currentTarget.value],
    });
  };

  return (
    <Container size={480} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: theme.headings.fontFamily,
        })}
      >
        Create an account to get started
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Text component={Link} to="/login" size="sm" color="teal" underline>
          Login
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            label="Email"
            icon={<At />}
            name="email"
            variant="filled"
            size="md"
            placeholder="name@example.com"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <TextInput
            label="Username"
            icon={<UserCircle />}
            mt="md"
            name="username"
            variant="filled"
            size="md"
            placeholder="mightyboy"
            value={credentials.username}
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
            {loading ? <Loader size="sm" color="#ffffff" /> : "Sign in"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
