import { Anchor, Button, Container, Group, Text, Box } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
const Navbar = () => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('xxx-Authorization');
    setisLoggedin(false);
    navigate('/login');
  };

  useEffect(() => {
    if (localStorage.getItem('xxx-Authorization')) {
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, []);
  return (
    <Container my={32}>
      <nav>
        <Group position="apart" align="center">
          <div>
            <Text
              component={Link}
              to="/"
              color="teal"
              size="xl"
              mr={10}
              sx={(theme) => ({
                fontFamily: `${theme.headings.fontFamily}`,
                fontWeight: 700,
              })}
            >
              CloudNotes
            </Text>
            <Anchor component={Link} to="/" p={12} size="md">
              Home
            </Anchor>
            <Anchor component={Link} to="/about" p={12} size="md">
              About
            </Anchor>
            <Anchor component={Link} to="/dashboard" p={12} size="md">
              Dashboard
            </Anchor>
          </div>

          <div>
            <Group px={12}>
              {!isLoggedin && (
                <Button variant="light" component={Link} to="/login">
                  <Text size="md">Login</Text>
                </Button>
              )}

              {isLoggedin && (
                <>
                  <Button
                    component={Link}
                    to="/profile"
                    variant="outline"
                    sx={{
                      borderRadius: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      aspectRatio: '1/1',
                    }}
                  >
                    <Photo size={20} />
                  </Button>

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
