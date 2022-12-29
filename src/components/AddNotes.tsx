import {
  MultiSelect,
  Text,
  TextInput,
  Stack,
  Select,
  Button,
  Container,
} from "@mantine/core";
import React, { useState } from "react";
import { useCustomContext, NoteWithoutId } from "../context/NoteState";
import { RichTextEditor } from "@mantine/rte";
import { showNotification } from "@mantine/notifications";

const AddNote = ({ editing = false }: { editing?: boolean }) => {
  const { addNote } = useCustomContext();

  const [note, setNote] = useState<NoteWithoutId>({
    title: "",
    description: "",
    tag: "default",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    showNotification({
      title: `Note Added!!`,
      message: "",
      autoClose: 2000,
    });
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };

  const tagData = [
    { value: "default", label: "Default" },
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];

  return (
    <Container size={720} py={32}>
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Title"
          label={
            <Text size="md" weight="bold">
              Enter Title here
            </Text>
          }
          size="md"
          id="title"
          name="title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          minLength={5}
          my={12}
          sx={{
            paddingBlock: 16,
          }}
        />

        <Text size="md" weight="bold">
          Enter Note
        </Text>
        <RichTextEditor
          sx={{
            minHeight: 350,
          }}
          style={{ fontSize: 18 }}
          value={note.description}
          onChange={(e) => setNote({ ...note, description: e })}
          controls={[
            ["bold", "italic", "underline", "link"],
            ["unorderedList", "h1", "h2", "h3"],
            ["sup", "sub"],
            ["alignLeft", "alignCenter", "alignRight"],
          ]}
          placeholder="Type @ or # to see mentions autocomplete"
        />

        <Select
          my={12}
          label={
            <Text size="md" weight="bold">
              Select Tag
            </Text>
          }
          size="md"
          placeholder="Tags"
          searchable
          defaultValue="default"
          data={tagData}
          onChange={(e) => setNote({ ...note, tag: e! })}
        />

        <Button
          type="submit"
          variant="filled"
          disabled={!note.title}
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
