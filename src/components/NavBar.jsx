import React, { useState } from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
  NavProfilePic
} from "../styles/NavBar";


export default function NavBar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!isAuthenticated && currentUser) {
      dispatch(getCurrentUser(null));
    }
    if (isAuthenticated && !currentUser) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <ContainerNavBar>
        <HomeLinkNavBar to={"/home"}>Books Explorer</HomeLinkNavBar>
        <SubContainerNavBar>
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/library"}>Library</LinkNavBar>
          {currentUser && currentUser.admin && (
            <>
              <LinkNavBar to={"/books"}>Books</LinkNavBar>
              <LinkNavBar to={"/users"}>Users</LinkNavBar>
            </>
          )}
          
          <LinkNavBar to={"/about"}>About Us</LinkNavBar>
          <LinkNavBar to={"/profile"}>
            { currentUser && currentUser.profilePic ? 
              <NavProfilePic src={currentUser.profilePic}/> :
              <NavProfilePic alt=""/> 
            }
          </LinkNavBar>
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
};

