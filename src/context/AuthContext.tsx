import { useEffect, useReducer } from "react";
import { useContext, createContext, useState } from "react";

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
    const res = await fetch("http://localhost:5000/auth/verify-user", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const response = await res.json();
    if (response.status) {
      setUser({ isLoggedin: true, username: response.data.username });
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
