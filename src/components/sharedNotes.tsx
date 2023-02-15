import { useEffect, useState } from "react";

import Protected from "../components/Protected";
import Note from "./Note";
import { Container, Grid, Input, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../context/AuthContext";
import api from "../utils/api";
import { NoteInterface } from "../context/NoteState";
import { showNotification } from "@mantine/notifications";

function useDebounceValue(value: string, time = 250) {
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebValue(value);
    }, time);

    return () => clearTimeout(timer);
  }, [value, time]);
  return debValue;
}

const SharedNotes = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [queriednotes, setQueriedNotes] = useState<NoteInterface[]>([]);
  const debouncedValue = useDebounceValue(query);
  const { user } = useUser();

  useEffect(() => {
    async function callPost() {
      const { data: response } = await api.get("/post/shared-with-me");

      if (!response.status) {
        showNotification({ message: response.message, color: "red" });
      } else {
        console.log(response.data);
        setNotes(response.data);
      }
    }

    if (user.isLoggedin) {
      setLoading(true);
      callPost();
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      const n = notes.filter(
        (note) =>
          note.title.includes(query) ||
          note.tag.includes(query) ||
          note.description.includes(query)
      );
      setQueriedNotes(n);
    }
  }, [debouncedValue]);

  if (!notes) {
    return (
      <Text weight="bold" size="md">
        No notes to display
      </Text>
    );
  }

  if (loading) {
    return (
      <Stack style={{ minHeight: "80vh" }} align="center" justify="center">
        <Loader color="teal" size="xl" />
      </Stack>
    );
  }

  return (
    <Protected>
      <Container py={32}>
        <Input
          type="text"
          mb={32}
          placeholder="Search in notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Grid columns={2}>
          {query &&
            queriednotes?.map((noteItem) => {
              return (
                <Grid.Col key={noteItem.title}>
                  <SharedNoteItem {...noteItem} />
                </Grid.Col>
              );
            })}
          {query && !queriednotes.length && <Grid.Col>No Note Found</Grid.Col>}
          {!query &&
            notes?.map((noteItem) => {
              return (
                <Grid.Col key={noteItem.title}>
                  <SharedNoteItem {...noteItem} />
                </Grid.Col>
              );
            })}
        </Grid>
      </Container>
    </Protected>
  );
};

export default SharedNotes;

import { Badge, Box, Card, Group } from "@mantine/core";
import { Link } from "react-router-dom";

const SharedNoteItem = (props: NoteInterface) => {
  return (
    <Card shadow="sm" p="lg">
      <Group position="apart" align="stretch">
        <Text weight={600} size="xl">
          {props.title.slice(0, 30)} {props.title.length > 30 ? "..." : ""}
        </Text>
        <Badge
          color="teal"
          variant={props.tag === "Important" ? "filled" : "dot"}
        >
          {props.tag}
        </Badge>
      </Group>

      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "1em",
        }}
        mt={16}
      >
        <Text component={Link} to={"/note/" + props.id} color="teal" size="sm">
          Read More
        </Text>
      </Box>
    </Card>
  );
};
