import React from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
  NavProfilePic,
  HomeAndLibrary,
  NavBarProfileLink,
  DropDownContainer,
  MenuContainer,
} from "../styles/NavBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const searchInput = useSelector((state) => state.search);

  const [modal, setModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  if (
    isAuthenticated &&
    currentUser &&
    (!currentUser.active || currentUser.banned)
  ) {
    history.push("/");
  }

  useEffect(() => {
    let handler = (e) => {if(!menuRef.current.contains(e.target)) {
      setOpenMenu(false)}}
    
    document.addEventListener("mousedown", handler)

    return () =>  document.removeEventListener("mousedown", handler);
  }, []);

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


  function DropDownItem({ link, type }) {

    if (type == "Logout") {
      return (
        <div>
          
            <button onClick={link} type="button">
              <span className={type}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {type}
            </button>
          
        </div>
      );
    } else {
      return (
        <div>
          <Link to={link}>
            <button type="button" >
              <span className={type} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {type}
            </button>
          </Link>
        </div>
      );
    }
  }

  console.log("Open Menu: ", openMenu)
  return (
    <div>
      <ContainerNavBar>
        <HomeAndLibrary>
          <HomeLinkNavBar to={"/home"}>Novel Wave</HomeLinkNavBar>
          <LinkNavBar to={"/library"}>My Library</LinkNavBar>
        </HomeAndLibrary>
        <SubContainerNavBar>
          {currentUser && currentUser.admin && (
            <>
              <LinkNavBar to={"/books"}>Books</LinkNavBar>
              <LinkNavBar to={"/users"}>Users</LinkNavBar>
            </>
          )}
          <SearchBar modal={modal} setModal={setModal} />
          {/* <LinkNavBar to={"/about"}>About Us</LinkNavBar> */}
          <MenuContainer ref={menuRef}>
            <NavBarProfileLink className={openMenu ? 'focus' : 'unfocus'} onClick={()=> setOpenMenu(!openMenu)}>
              {currentUser && currentUser.profilePic ? (
                <img src={currentUser.profilePic} />
              ) : (
                <img src="https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996" />
              )}
            </NavBarProfileLink>
            <DropDownContainer className={openMenu ? 'active' : 'inactive'}>
              <DropDownItem link={"/profile"} type={"Settings"} />
              <DropDownItem
                link={() => logout({ returnTo: window.location.origin })}
                type={"Logout"}
              />
            </DropDownContainer>
          </MenuContainer>
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
}
