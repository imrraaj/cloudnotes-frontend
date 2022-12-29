import AddNote from "../components/AddNotes";
import ShowNotes from "../components/ShowNotes";
import Protected from "../components/Protected";

import { Tabs } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Photo, MessageCircle, Settings } from "tabler-icons-react";
import { useEffect } from "react";
// import { useUser } from "../context/NoteState";

const Home = () => {
  useEffect(() => {
    // const u = useUser();
    showNotification({
      title: `Welcome Back`,
      message: "Hey there, your code is awesome! 🤥",
      autoClose: 2000,
      color: "teal",
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
        <Tabs.Tab label="Shared With me" icon={<Photo />}>
          <ShowNotes shared />
        </Tabs.Tab>
      </Tabs>
    </Protected>
  );
};

export default Home;
