import { Text, TextInput, Select, Button, Container } from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import api from "../utils/api";
import { showNotification } from "@mantine/notifications";

const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const createNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: response } = await api.post("/post/add", { ...note });
    if (!response.status) {
      showNotification({ message: response.error });
    } else {
      showNotification({ message: "Note added sucessfully!!" });
    }
  };

  const tagData = [
    { value: "Default", label: "Default" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
    { value: "Fun", label: "Fun" },
    { value: "Important", label: "Important" },
    { value: "Memo", label: "Memo" },
  ];

  return (
    <Container size={720} py={32}>
      <form onSubmit={createNote}>
        <Text weight="bold">Enter Title here</Text>
        <TextInput
          placeholder="Title"
          id="title"
          name="title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          minLength={5}
          mb={12}
        />

        <Text size="md" weight="bold">
          Enter Note
        </Text>
        <RichTextEditor
          sx={{
            minHeight: 350,
          }}
          value={note.description}
          onChange={(e) => setNote({ ...note, description: e })}
          controls={[
            ["bold", "italic", "underline", "link"],
            ["unorderedList", "h1", "h2", "h3"],
            ["sup", "sub"],
            ["alignLeft", "alignCenter", "alignRight"],
          ]}
          placeholder="You can type here..."
        />

        <Select
          my={12}
          label={
            <Text size="md" weight="bold">
              Select Tag
            </Text>
          }
          placeholder="Tags"
          searchable
          defaultValue="Default"
          data={tagData}
          onChange={(e) => setNote({ ...note, tag: e! })}
        />

        <Button
          type="submit"
          variant="filled"
          disabled={!(note.title.length > 4)}
          my={16}
          size="md"
        >
          Add note
        </Button>
      </form>
    </Container>
  );
};

export default AddNote;
