import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Protected from "../components/Protected";
import { Badge, Container, Group, Text } from "@mantine/core";
import api from "../utils/api";

const MyNote = () => {
  const { id } = useParams();

  if (!id) {
    return <div>No Id...</div>;
  }
  const [currentNote, setCurrentNote] = useState({
    title: "",
    description: "",
    tag: "",
    id,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getNote = async () => {
      const { data } = await api.get(`/post/get/${id}`);
      if (data.status) {
        setCurrentNote(data.data);
      }
    };
    setLoading(true);
    getNote();
    setLoading(false);
  }, []);
  if (loading) {
    return <div>loading....</div>;
  }
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
