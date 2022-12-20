import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import { ButtonCatalogue } from "../styles/Catalogue";
import { Login } from "./Login";
import { Logout } from "./Logout";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    console.log(user);
    const { email, nickname } = user;

    const userDb = {
      email,
      nickname,
    };
  }

  return (
    <div>
      <div>
        <h1>Henry Book Store</h1>
      </div>
      <div>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <div>
            <Link to="/home">
              <ButtonCatalogue>Enter the book Store</ButtonCatalogue>
            </Link>
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
