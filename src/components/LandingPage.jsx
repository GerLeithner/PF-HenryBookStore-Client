import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonCatalogue } from "../styles/Catalogue";
import { OverLay } from "../styles/Detail";
import {
  BoxContainer,
  ButtonsConteiner,
  PromotionalConteiner,
  H4Landing,
  BackgroundConteiner,
} from "../styles/Landing";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { getCurrentUser } from "../redux/actions";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecomendedBooks } from "../redux/actions";
const LandingPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const recomended = useSelector((state) => state.recomended);

  useEffect(() => {
    if (!isAuthenticated && currentUser) {
      dispatch(getCurrentUser(null));
    }
    if (isAuthenticated && !currentUser) {
      console.log(user);
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
  console.log("state user: ", currentUser);

  // let concatTitles="Cat's Eye, All the Devils Are Here, The essential Neruda, Harlan Coben Spring , Harry Potter and the Goblet of Fire, Ficciones"

  var promotionalBooks = [
    "Cat's Eye",
    "All the Devils Are Here",
    "The essential Neruda",
    "Harlan Coben Spring",
    "Harry Potter and the Goblet of Fire",
    "Ficciones",
  ];

  //  recomended && recomended.length && recomended.map(b=>{
  //   concatTitles=concatTitles + b.title + ", "
  //  })
  //  var promotionalBooks=concatTitles.slice(0,-2)

  return (
    <BackgroundConteiner>
      <BoxContainer>
        <div>
          <h1>Book Explorer</h1>
        </div>
        {/* {currentUser && currentUser.userName} */}
        <h2>
          Welcome to the best place to find incredible books to feed your mind
        </h2>
        <h3>Our catalog is full of classic and trendy books like:</h3>
        <PromotionalConteiner>
          {promotionalBooks &&
            promotionalBooks.map((e) => <H4Landing>{e}</H4Landing>)}
        </PromotionalConteiner>
        {/* <h4>{promotionalBooks}</h4> */}

        <ButtonsConteiner>
          {!isAuthenticated && !isLoading ? (
            <Login />
          ) : (
            <>
              <Link to="/home">
                <ButtonCatalogue>Start Exploring</ButtonCatalogue>
              </Link>
              <Logout />

              {/* {currentUser ? (
              <div> Welcome {currentUser.userName} </div>
            ) : (
              <div />
            )} */}
            </>
          )}
        </ButtonsConteiner>
      </BoxContainer>
    </BackgroundConteiner>
  );
};

export default LandingPage;
