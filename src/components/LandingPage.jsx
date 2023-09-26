import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { editUser, getRecommendedBooks } from "../redux/actions";
import { getCurrentUser } from "../redux/actions";

import Login from "./Login";
import Logout from "./Logout";

import { ButtonCatalogue } from "../styles/Catalogue";
import {
  BackgroundContainer,
  LandingContainer,
  Title,
  SloganButtonContainer,
  Balance,
} from "../styles/Landing";
import Footer from "./Footer";

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.currentUser);
  const recommended = useSelector((state) => state.recommended);

  const { isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && currentUser) {
      dispatch(getCurrentUser(null));
    }
    if (isAuthenticated && !currentUser) {
      let googleUser = false;

      if (user.sub.slice(0, 6) === "google") {
        googleUser = true;
      }

      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
        googleUser,
      };

      dispatch(getCurrentUser(userDb));
    }
    if (!recommended.length) {
      dispatch(getRecommendedBooks());
    }
  }, [dispatch, isAuthenticated]);

  function handleActiveUser(e) {
    e.preventDefault();

    dispatch(
      editUser({
        id: currentUser.id,
        active: true,
      })
    );
    alert("The account has been activated");
    history.push("/home");
  }

  function redirectHome() {
    history.push("/home");
  }

  function banned() {
    alert("This account has been banned");
    logout({ returnTo: window.location.origin });
  }

  // let concatTitles="Cat's Eye, All the Devils Are Here, The essential Neruda, Harlan Coben Spring , Harry Potter and the Goblet of Fire, Ficciones"

  var promotionalBooks = [
    "Cat's Eye",
    "All the Devils Are Here",
    "The essential Neruda",
    "Harlan Coben Spring",
    "Harry Potter and the Goblet of Fire",
    "Ficciones",
  ];

  //  recommended && recommended.length && recommended.map(b=>{
  //   concatTitles=concatTitles + b.title + ", "
  //  })
  //  var promotionalBooks=concatTitles.slice(0,-2)

  return (
    <BackgroundContainer>
      <LandingContainer>
        <Title>NOVEL WAVE</Title>
        <SloganButtonContainer>
          <div>Explore, Stream, Read – Your Books, Your Way!</div>
          {isAuthenticated &&
            currentUser &&
            currentUser.active &&
            !currentUser.banned &&
            redirectHome()}
          {isAuthenticated && currentUser && !currentUser.active && (
            <>
              <div>
                The current account has been disabled, please activate it to
                continue
              </div>
              <ButtonCatalogue onClick={(e) => handleActiveUser(e)}>
                Activate Account
              </ButtonCatalogue>
              <Logout />
            </>
          )}
          {isAuthenticated && currentUser && currentUser.banned && banned() && (
            <>
              <div></div>
              <Logout />
            </>
          )}
          {!isAuthenticated && <Login />}
        </SloganButtonContainer>
        <Balance></Balance>
      </LandingContainer>
    </BackgroundContainer>
  );
}
