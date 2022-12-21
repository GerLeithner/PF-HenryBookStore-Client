import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";
import { Login } from "./Login";
import { Logout } from "./Logout";

const LandingPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!isAuthenticated && currentUser) {
    dispatch(getUser(null));
  }

  if (isAuthenticated && !currentUser) {
    console.log(user);
    const { email, nickname } = user;

    const userDb = {
      email,
      nickname,
    };

    dispatch(getUser(userDb));
  }

  console.log("state user: ", currentUser);

  return (
    <div>
      <div>
        <h1>Henry Book Store</h1>
      </div>
      <div>
        {!isAuthenticated && !isLoading ? (
          <Login />
        ) : (
          <div>
            <Link to="/home">
              <ButtonCatalogue>Enter the book Store</ButtonCatalogue>
            </Link>
            {currentUser ? (
              <div> Welcome {currentUser.userName} </div>
            ) : (
              <div />
            )}
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
