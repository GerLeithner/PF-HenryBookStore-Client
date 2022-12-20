import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login</button>;
};

/* import React from "react";

const LogIn = () => {
  
  return <div>LogIn</div>;
};

export default LogIn; */
