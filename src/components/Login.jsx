import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <ButtonCatalogue
      onClick={async () =>
        await loginWithRedirect()
      }
    >
      Get Started
    </ButtonCatalogue>
  );
};

