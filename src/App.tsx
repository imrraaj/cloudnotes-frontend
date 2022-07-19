// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import About from "./pages/About";
import NoteState from "./context/NoteState";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import { Container, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';
import MyNote from "./pages/MyNote";



export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "'Inter', sans-serif",
        primaryColor:"teal",
        headings: {
          fontFamily: "'Montserrat', sans-serif",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position="top-right">
        <NoteState>
          <Container>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/note/:id" element={<MyNote />} />
                <Route path="/*" element={<Link to="/">GO HOME</Link>} />
              </Routes>
            </Router>
          </Container>
        </NoteState>
      </NotificationsProvider>
    </MantineProvider>
  );
}
