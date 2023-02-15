import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { useUser } from "../context/AuthContext";
import { showNotification } from "@mantine/notifications";
import api from "../utils/api";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  if (user.isLoggedin) {
    return <Navigate to="/" replace={true} />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data: response } = await api.post("/auth/signup", {
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
