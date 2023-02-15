import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
import { Alien, At } from "tabler-icons-react";
import { useUser } from "../context/AuthContext";
import { showNotification } from "@mantine/notifications";
import api from "../utils/api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data: response } = await api.post("/auth/login", {
      ...credentials,
    });

    if (!response.status) {
      setLoading(false);
      showNotification({ message: response.message, color: "red" });
    } else {
      localStorage.setItem("authorization", response.data.token);
      setUser({ isLoggedin: true, username: credentials.username });
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  if (user.isLoggedin) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Text component={Link} to="/signup" size="sm" color="teal" underline>
          Create account
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            name="username"
            variant="filled"
            icon={<At />}
            size="md"
            placeholder="name@example.com"
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
          <Button fullWidth mt="xl" type="submit">
            {loading ? <Loader size="sm" color="#ffffff" /> : "Log In"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
