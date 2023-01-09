import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import { EditFieldButton } from "../styles/UserProfile";

export default function Logout() {
  const { logout } = useAuth0();

  return (
    <EditFieldButton color="red" onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </EditFieldButton>
  );
};
