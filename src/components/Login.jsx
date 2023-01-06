import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ButtonCatalogue } from "../styles/Catalogue";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();



  
  return (
    <ButtonCatalogue
      onClick={async () =>
        await loginWithRedirect({
          authorizationParams: {
            redirect_uri: "https://pf-henry-book-store-client.vercel.app/home",
          },
        })
      }
    >
      Get Started
    </ButtonCatalogue>
  );
};

/* import React from "react";

const LogIn = () => {
  
  return <div>LogIn</div>;
};

export default LogIn; */
