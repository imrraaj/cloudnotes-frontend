import React, { useEffect, useState } from "react";
import { NoteInterface, useCustomContext } from "../context/NoteState";
import Protected from "../components/Protected";
import Note from "./Note";
import { Container, Grid, Loader, Stack, Text } from "@mantine/core";

const ShowNotes = ({ shared = false }: { shared?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<NoteInterface[] | null>(null);
  const { myNotes, sharedNotes, getNotesSharedWithMe } = useCustomContext();

  useEffect(() => {
    setLoading(true);
    if (shared) {
      getNotesSharedWithMe();
      setNotes(sharedNotes);
      console.log(sharedNotes);
    } else {
      setNotes(myNotes);
    }
    setLoading(false);
  }, []);

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
        <Loader color="teal" size="xl" />;
      </Stack>
    );
  }

  return (
    <Protected>
      <Container py={32}>
        <Grid>
          {notes?.map((noteItem) => {
            return (
              <Grid.Col
                sm={12}
                md={6}
                lg={4}
                key={noteItem._id}
                style={{ minHeight: 180 }}
              >
                <Note {...noteItem} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Protected>
  );
};

export default ShowNotes;

/*
<div className="my-4 px-8">
      <h2 className="text-center font-bold text-2xl my-10">Your Notes</h2>
      <div className="sm:block md:grid md:gap-4 grid-cols-3 self-center">
        {notes && notes.length > 0
          ? notes.map((note: NoteInterface) => {
            return (
              <Note
                key={note._id}
                title={note.title}
                description={note.description}
                _id={note._id}
                tag={note.tag}
              />
            );
          })
          : "No Notes to display"}
      </div>
    </div>
    */
