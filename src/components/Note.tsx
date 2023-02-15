import { Badge, Box, Card, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { NoteInterface } from "../context/NoteState";
import { AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";

import EditNote from "./EditNote";
import api from "../utils/api";
import { showNotification } from "@mantine/notifications";

const NoteItem = (props: NoteInterface) => {
  const deleteNote = async (id: string) => {
    const toBeDeletedOrNot = confirm(
      "Are you sure you want to delete the note?"
    );
    if (toBeDeletedOrNot) {
      const { data: response } = await api.delete(`/post/delete/${id}`);
      if (!response.status) {
        showNotification({ message: response.error, color: "red" });
      } else {
        showNotification({ message: "Note deleted sucessfully!" });
      }
    }
  };

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

        <Text style={{ cursor: "pointer" }} color="blue">
          <EditNote {...props} />
        </Text>

        <Text
          style={{ cursor: "pointer" }}
          color="red"
          sx={{ display: "flex" }}
        >
          <AiFillDelete onClick={() => deleteNote(props.id)} />
        </Text>

        <Text style={{ cursor: "pointer" }} sx={{ display: "flex" }}>
          <ShareNote {...props} />
        </Text>
      </Box>
    </Card>
  );
};

export default NoteItem;

import { Modal } from "@mantine/core";
import { useState } from "react";
import { TextInput, Loader, Input } from "@mantine/core";
import { Radio } from "@mantine/core";
import { Button } from "@mantine/core";

const ShareNote = (props: NoteInterface) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareOrUnshare, setShareOrUnshare] = useState("");

  const [username, setUsername] = useState("");

  const editNote = async () => {
    if (shareOrUnshare === "share") {
      setLoading(true);
      const { data: response } = await api.post(`/post/share`, {
        postId: props.id,
        username,
      });
      if (!response.status) {
        showNotification({ message: response.message, color: "red" });
      } else {
        showNotification({ message: "Post Shared!" });
      }
      setLoading(false);
    } else if (shareOrUnshare === "unshare") {
      setLoading(true);
      const { data: response } = await api.post(`/post/unshare`, {
        postId: props.id,
        username,
      });
      if (!response.status) {
        showNotification({ message: response.message, color: "red" });
      } else {
        showNotification({ message: "Post unshared!" });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Share Note"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editNote();
          }}
        >
          <TextInput
            placeholder="Share with"
            label={
              <Text size="md" weight="bold">
                Username:
              </Text>
            }
            id="title"
            name="title"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            my={12}
            sx={{
              paddingBlock: 16,
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              paddingBlock: "1rem",
            }}
          >
            <Radio
              label="share"
              name="sharing"
              value="share"
              onChange={(e) => {
                if (e.target.checked) setShareOrUnshare("share");
              }}
            />
            <Radio
              label="unshare"
              name="sharing"
              value="unshare"
              onChange={(e) => {
                if (e.target.checked) setShareOrUnshare("unshare");
              }}
            />
          </Box>

          <Button
            color="teal"
            variant="filled"
            disabled={!username}
            type="submit"
          >
            {loading ? <Loader size="sm" color="#ffffff" /> : "Add User"}
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <AiOutlineShareAlt onClick={() => setOpened(true)} />
      </Group>
    </>
  );
};
