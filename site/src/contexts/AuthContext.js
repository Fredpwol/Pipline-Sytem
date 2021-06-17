import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const authContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useHistory()

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    setOrganization(localStorage.getItem("org") || "");
  },[])
  
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("org")
    setToken("")
    setEmail("");
    setOrganization("");
    history.push("/login")
  }

  return (
    <authContext.Provider
      value={{
        organization,
        setOrganization,
        email,
        setEmail,
        token,
        setToken,
        logOut
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;