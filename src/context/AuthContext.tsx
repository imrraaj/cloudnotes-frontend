import { useEffect, useReducer } from "react";
import { useContext, createContext, useState } from "react";
import api from "../utils/api";

type User = {
  isLoggedin: boolean;
  username: string | null;
};

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

/** */
const AuthContext = createContext<ContextType>({} as ContextType);

/** */
export const useUser = () => useContext(AuthContext);

function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ isLoggedin: false, username: null });
  const [isLoading, setisLoading] = useState(false);

  async function verifyUser(token: string) {
    // axios
    const res_ = await api.get("/auth/verify-user", {
      headers: {
        Authorization: token,
      },
    });

    if (res_.data.status) {
      setUser({ isLoggedin: true, username: res_.data.username });
    }
  }

  useEffect(() => {
    setisLoading(true);
    const token = localStorage.getItem("authorization");
    if (token) {
      verifyUser(token);
    }
    setisLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loding</div>;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthenticationProvider;
