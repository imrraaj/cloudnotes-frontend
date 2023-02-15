import AddNote from "../components/AddNotes";
import ShowNotes from "../components/ShowNotes";
import Protected from "../components/Protected";
import { Tabs } from "@mantine/core";
import { Photo, Settings } from "tabler-icons-react";
import SharedNotes from "../components/sharedNotes";

const Home = () => {
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
          <SharedNotes />
        </Tabs.Tab>
      </Tabs>
    </Protected>
  );
};

export default Home;
