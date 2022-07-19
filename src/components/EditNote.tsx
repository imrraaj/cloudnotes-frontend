import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { NoteInterface, NoteWithoutId } from "../context/NoteState";
import {
  MultiSelect,
  Text,
  TextInput,
  Stack,
  Select,
  Button,
  Container,
} from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { showNotification } from "@mantine/notifications";

const EditNote = (props: NoteInterface) => {
  const [opened, setOpened] = useState(false);
  const [note, setNote] = useState<NoteWithoutId>({
    title: props.title,
    description: props.description,
    tag: props.tag,
  });
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
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="EDIT NOTE">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showNotification({
              title: "Currently Work in Progress",
              message: "Please try again later",
              color:"red"
            });
            setOpened(false);
          }}
        >
          <TextInput
            placeholder="Title"
            label={
              <Text size="md" weight="bold">
                Enter Title here
              </Text>
            }
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
              minHeight: 200,
            }}
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
            placeholder="Tags"
            searchable
            defaultValue="default"
            data={tagData}
            onChange={(e) => setNote({ ...note, tag: e! })}
          />

          <Button
            color="teal"
            variant="filled"
            disabled={!note.title}
            type="submit"
          >
            Add note
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <FaEdit onClick={() => setOpened(true)} />
      </Group>
    </>
  );
};

export default EditNote;
