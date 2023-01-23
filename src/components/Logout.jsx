import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";

import { ButtonCatalogue } from "../styles/Catalogue";

export default function Logout() {
  const { logout } = useAuth0();

  return (
    <ButtonCatalogue color="red" onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </ButtonCatalogue>
  );
};
