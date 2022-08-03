import AddNote from '../components/AddNotes';
import ShowNotes from '../components/ShowNotes';
import Protected from '../components/Protected';

import { Tabs } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    showNotification({
      title: `Welcome Back {user}`,
      message: 'Hey there, your code is awesome! 🤥',
      autoClose: 2000,
      color: 'teal',
    });
  }, []);

  return (
    <Protected>
      <Tabs>
        <Tabs.Tab label="Add Notes" icon={<Settings />}>
          <AddNote />
        </Tabs.Tab>

        <Tabs.Tab label="Your Notes" icon={<Photo />}>
          <ShowNotes />
        </Tabs.Tab>
      </Tabs>
    </Protected>
  );
};

export default Home;
