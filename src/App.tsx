import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import About from './pages/About';
import NoteState from './context/NoteState';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import F404 from './pages/404';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Container, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import MyNote from './pages/MyNote';

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "'Inter', sans-serif",
        primaryColor: 'teal',
        headings: {
          fontFamily: "'Montserrat', sans-serif",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position="top-right">
        <NoteState>
          <Router>
            <Navbar />
            <Container sx={{ minHeight: '100vh' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/note/:id" element={<MyNote />} />
                <Route path="/*" element={<F404 />} />
              </Routes>
            </Container>
          </Router>
          <Footer />
        </NoteState>
      </NotificationsProvider>
    </MantineProvider>
  );
}
