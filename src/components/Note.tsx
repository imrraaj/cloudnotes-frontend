import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { NoteInterface, useCustomContext } from "../context/NoteState";
import { AiFillDelete } from "react-icons/ai";

import EditNote from "./EditNote";

const NoteItem = (props: NoteInterface) => {
  const { deleteNote } = useCustomContext();

  return (
    <Card shadow="sm" p="lg">
      <Group position="apart" align="stretch">
        <Text weight={600} size="xl">
          {props.title}
        </Text>
        <Badge color="teal" variant="dot">
          {props.tag}
        </Badge>
      </Group>

      <Group align="center" style={{ marginTop: 16 }}>
        <Button component={Link} to={"/note/" + props._id} variant="light">
          Read More
        </Button>
        <Text style={{ cursor: "pointer" }}>
          <AiFillDelete onClick={() => deleteNote(props._id)} />
        </Text>
        <Text style={{ cursor: "pointer" }}>
          <EditNote {...props} />
        </Text>
      </Group>
    </Card>
  );
};

export default NoteItem;

/*
<div className="border-2 border-slate-700 rounded-lg p-2 px-4 h-fit my-5 w-full">
      <h4 className="text-xl font-semibold">{props.title}</h4>
      <p className="px-2 py-1 bg-slate-200 text-slate-700 text-sm font-semibold w-fit rounded-lg my-2">
        {props.tag ? props.tag : "Default"}
      </p>
      <p className="card-text">{props.description}</p>
      <FaRegEdit className="cursor-pointer text-xl my-5 mr-4 inline" />
      <RiDeleteBin2Line
        onClick={() => deleteNote(props._id)}
        className="cursor-pointer text-xl my-5 inline text-red-600"
      />
    </div>
*/
