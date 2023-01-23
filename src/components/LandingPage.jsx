import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { editUser, getRecomendedBooks } from "../redux/actions";
import { getCurrentUser } from "../redux/actions";

import Login from "./Login";
import Logout from "./Logout";

import { ButtonCatalogue } from "../styles/Catalogue";
import {
  BoxContainer,
  ButtonsConteiner,
  PromotionalConteiner,
  H4Landing,
  BackgroundConteiner,
} from "../styles/Landing";

var promotionalBooks = [
  "Cat's Eye",
  "All the Devils Are Here",
  "The essential Neruda",
  "Harlan Coben Spring",
  "Harry Potter and the Goblet of Fire",
  "Ficciones",
];

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.currentUser);
  const recomended = useSelector((state) => state.recomended);

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
    if (!recomended.length) {
      dispatch(getRecomendedBooks());
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

  return (
    <BackgroundConteiner>
      <BoxContainer>
        <div>
          <h1>Book Explorer</h1>
        </div>
        <h2>
          Welcome to the best place to find incredible books to feed your mind
        </h2>
        <h3>Our catalog is full of classic and trendy books like:</h3>
        <PromotionalConteiner>
          {promotionalBooks &&
            promotionalBooks.map((e) => <H4Landing>{e}</H4Landing>)}
        </PromotionalConteiner>
        <ButtonsConteiner>
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
        </ButtonsConteiner>
      </BoxContainer>
    </BackgroundConteiner>
  );
}
