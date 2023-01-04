import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <ButtonCatalogue onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </ButtonCatalogue>
  );
};
