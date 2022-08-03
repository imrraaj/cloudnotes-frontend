import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import jwt from 'jsonwebtoken';
export interface NoteWithoutId {
  title: string;
  description: string;
  tag: string;
}

export interface NoteInterface extends NoteWithoutId {
  _id: string;
}

interface ContextType {
  notes: NoteInterface[] | null;
  addNote: Function;
  deleteNote: Function;
  getNotes: Function;
}

const NoteContext = createContext<ContextType>({} as ContextType);
export const useCustomContext = () => useContext(NoteContext);

type Props = {
  children?: React.ReactNode;
};

const NoteState = ({ children }: Props) => {
  const HOST: string = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [user, setUser] = useState();

  const getNotes = async () => {
    const response = await fetch(`${HOST}/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('xxx-Authorization')!,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (note: NoteWithoutId) => {
    const response = await fetch(`${HOST}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('xxx-Authorization')!,
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });

    const newnote = await response.json();
    setNotes(notes?.concat(newnote));
  };

  // Delete a Note
  const deleteNote = async (id: string) => {
    const newNotes = notes?.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    const response = await fetch(`${HOST}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('xxx-Authorization')!,
      },
    });
    const json = response.json();
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
export default NoteState;
