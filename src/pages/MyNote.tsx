import React, { useEffect, useState } from "react";
import { NoteInterface, useCustomContext } from "../context/NoteState";
import { useParams } from "react-router";
import Protected from "../components/Protected";
import { Badge, Button, Card, Container, Group, Text } from "@mantine/core";

const MyNote = () => {
  const { id: ID } = useParams() as { id: string };
  const { notes, getNotes } = useCustomContext();

  const [currentNote, setCurrentNote] = useState<NoteInterface>({
    title: "",
    description: "",
    tag: "",
    _id: ID,
  });

  useEffect(() => {
    if (!notes) {
      //TODO call api for this one note
      return;
    }
    const x = notes?.filter((n) => n._id === ID);
    if (!x) {
      setCurrentNote({
        title: "No Note Found",
        description: "",
        _id: ID,
        tag: "",
      });
      return;
    }
    setCurrentNote(x[0]);
  }, [ID]);

  return (
    <Protected>
      <Container>
        <Group position="apart" align="stretch">
          <Text weight={800} size="xl">
            {currentNote?.title || "Unavailable"}
          </Text>
          <Badge color="teal" variant="dot">
            {currentNote?.tag || "Unavailable"}
          </Badge>
        </Group>

        <Text
          size="md"
          dangerouslySetInnerHTML={{ __html: currentNote?.description }}
        ></Text>
      </Container>
    </Protected>
  );
};
export default MyNote;
