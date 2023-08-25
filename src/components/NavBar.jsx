import React from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
  NavProfilePic,
} from "../styles/NavBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const searchInput = useSelector((state) => state.search);

  const [modal, setModal] = useState(false);

  if (
    isAuthenticated &&
    currentUser &&
    (!currentUser.active || currentUser.banned)
  ) {
    history.push("/");
  }

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
        <HomeLinkNavBar to={"/home"}>Novel Wave</HomeLinkNavBar>
        <SubContainerNavBar>
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/library"}>Library</LinkNavBar>
          {currentUser && currentUser.admin && (
            <>
              <LinkNavBar to={"/books"}>Books</LinkNavBar>
              <LinkNavBar to={"/users"}>Users</LinkNavBar>
            </>
          )}
          <SearchBar modal={modal} setModal={setModal} />
          {/* <LinkNavBar to={"/about"}>About Us</LinkNavBar> */}
          <LinkNavBar to={"/profile"}>
            {currentUser && currentUser.profilePic ? (
              <NavProfilePic src={currentUser.profilePic} />
            ) : (
              <NavProfilePic src="https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996" />
            )}
          </LinkNavBar>
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
}
