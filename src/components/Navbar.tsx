import { Anchor, Button, Container, Group, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("authorization");
    setUser({ isLoggedin: false, username: null });
    navigate("/login");
  };

  return (
    <Container my={32}>
      <nav>
        <Group position="apart" align="center">
          <div>
            <Text component={Link} to="/" size="xl" weight="bold" mr={10}>
              CloudNotes
            </Text>
            <Anchor component={Link} to="/" p={12} size="md">
              Home
            </Anchor>
            <Anchor component={Link} to="/about" p={12} size="md">
              About
            </Anchor>
          </div>

          <div>
            <Group px={12}>
              {!user.isLoggedin && (
                <Button variant="light" component={Link} to="/login">
                  <Text size="md">Login</Text>
                </Button>
              )}

              {user.isLoggedin && (
                <>
                  <Link to="/profile">
                    <img
                      height={32}
                      width={32}
                      src={`https://api.dicebear.com/5.x/shapes/svg?seed=${user.username}`}
                      alt={user.username ?? "User Image"}
                      style={{ borderRadius: "100%" }}
                    />
                  </Link>

                  <Button
                    variant="light"
                    component={Link}
                    to="/"
                    onClick={Logout}
                  >
                    <Text size="md">Logout</Text>
                  </Button>
                </>
              )}
            </Group>
          </div>
        </Group>
      </nav>
    </Container>
  );
};

export default Navbar;
