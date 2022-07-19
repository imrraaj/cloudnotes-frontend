import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCustomContext } from "../context/NoteState";

const Protected = (props: React.PropsWithChildren) => {
  const navigator = useNavigate();
  const { getNotes } = useCustomContext();
  useEffect(() => {
    if (!localStorage.getItem("xxx-Authorization")) {
      navigator("/login", { replace: false });
    } else {
      getNotes();
    }
  }, []);
  return <>{props.children}</>;
};

export default Protected;
