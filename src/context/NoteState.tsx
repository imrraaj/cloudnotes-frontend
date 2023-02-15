import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { showNotification } from "@mantine/notifications";
const HOST: string = import.meta.env.VITE_BACKEND_URL;

export interface NoteWithoutId {
  title: string;
  description: string;
  tag: string;
}

export interface NoteInterface extends NoteWithoutId {
  id: string;
}

interface ContextType {
  myNotes: NoteInterface[] | null;
  sharedNotes: NoteInterface[] | null;
  addNote: Function;
  deleteNote: Function;
  getNotes: Function;
  getNotesSharedWithMe: Function;
}

const NoteContext = createContext<ContextType>({} as ContextType);
export const useCustomContext = () => useContext(NoteContext);

// export const useUser = () => {
//   try {
//     const token = getCookieAuthorization();
//     const decodedData = jwt_decode(token) as {
//       exp: number;
//       iat: number;
//       user: { username: string; email: string; id: string };
//     };
//     return decodedData.user.username;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// };

function getCookieAuthorization() {
  let cookie = document.cookie;
  let output = {} as { [key: string]: string };
  cookie.split(/\s*;\s*/).forEach(function (pair: string) {
    const splitedString = pair.split(/\s*=\s*/);
    output[splitedString[0]] = splitedString.splice(1).join("=");
  });
  return output.Authorization;
}

const MESSAGE_IF_REQ_FAILS = "Internal Server Error";

type Props = {
  children?: React.ReactNode;
};

const NoteState = ({ children }: Props) => {
  const [myNotes, setMyNotes] = useState<NoteInterface[]>([]);
  const [sharedNotes, setSharedNotes] = useState<NoteInterface[]>([]);

  const getNotes = async () => {
    const response = await fetch(`${HOST}/api/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookieAuthorization(),
      },
    });
    const res = await response.json();
    if (res.status === true) {
      setMyNotes(res.data);
    } else {
      showNotification({ message: MESSAGE_IF_REQ_FAILS, color: "red" });
    }
  };

  const getSingleNote = async (id: string) => {
    const response = await fetch(`${HOST}/api/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookieAuthorization(),
      },
    });
    const res = await response.json();
    if (res.status === true) {
      setMyNotes(res.data);
    } else {
      showNotification({ message: MESSAGE_IF_REQ_FAILS, color: "red" });
    }
  };

  // Add a Note
  const addNote = async (note: NoteWithoutId) => {
    const response = await fetch(`${HOST}/api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookieAuthorization(),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });

    const res = await response.json();
    if (res.status === true) {
      setMyNotes(myNotes?.concat(res.data));
    } else {
      showNotification({ message: MESSAGE_IF_REQ_FAILS, color: "red" });
    }
  };

  // Delete a Note
  const deleteNote = async (id: string) => {
    const newNotes = myNotes?.filter((note) => {
      return note.id !== id;
    });
    setMyNotes(newNotes);

    const response = await fetch(`${HOST}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookieAuthorization(),
      },
    });
    const res = await response.json();
    if (res.status === true) {
      showNotification({ message: res.data.message, color: "red" });
    } else {
      showNotification({ message: MESSAGE_IF_REQ_FAILS, color: "red" });
    }
  };

  const getNotesSharedWithMe = async () => {
    const response = await fetch(`${HOST}/api/shared-with-me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookieAuthorization(),
      },
    });
    const res = await response.json();
    if (res.status === true) {
      setSharedNotes(res.data.message);
    } else {
      showNotification({ message: MESSAGE_IF_REQ_FAILS, color: "red" });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        myNotes,
        sharedNotes,
        addNote,
        deleteNote,
        getNotes,
        getNotesSharedWithMe,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
export default NoteState;
