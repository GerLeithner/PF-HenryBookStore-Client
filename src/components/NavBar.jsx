import React from "react";
import { getCurrentUser, subscribeNAV } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import DropDownItem from "./DropDownItem.jsx";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as BooksIcon } from "../icons/books.svg";
import { ReactComponent as UsersIcon } from "../icons/users.svg";
import { ReactComponent as MyLibraryIcon } from "../icons/myLibrary.svg";

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
  ButtonNavBar,
  SvgLogos,
} from "../styles/NavBar";

import { searchInput } from "../redux/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const subNav = useSelector((state) => state.subscribe);

  const [modal, setModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const menuRef = useRef();
  const adminRef = useRef();

  if (
    isAuthenticated &&
    currentUser &&
    (!currentUser.active || currentUser.banned)
  ) {
    history.push("/");
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.admin) {
      let adminMenu = (e) => {
        if (!adminRef.current.contains(e.target)) {
          setOpenAdmin(false);
        }
      };

      document.addEventListener("mousedown", adminMenu);

      return () => document.removeEventListener("mousedown", adminMenu);
    }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  function handleSubscribeButton(e) {
    e.preventDefault();
    dispatch(dispatch(subscribeNAV(true)));
  }

  function handleNavLink() {
    return dispatch(searchInput(""));
  }

  return (
    <div>
      <ContainerNavBar>
        <HomeAndLibrary>
          {windowSize.width > 1150 ? (
            <HomeLinkNavBar
              to={"/home"}
              onClick={() => dispatch(searchInput(""))}
            >
              Novel Wave
            </HomeLinkNavBar>
          ) : (
            <HomeLinkNavBar
              to={"/home"}
              onClick={() => dispatch(searchInput(""))}
            >
              NW
            </HomeLinkNavBar>
          )}

          <LinkNavBar to={"/library"}>
            {" "}
            <MyLibraryIcon title="My Library" />
            {windowSize.width > 1150 && <div>My Library</div>}
          </LinkNavBar>
          {currentUser && !currentUser.subscription && (
            <ButtonNavBar
              onClick={(e) => handleSubscribeButton(e)}
              className="subscribe"
            >
              SUBSCRIBE NOW
            </ButtonNavBar>
          )}
          {currentUser && currentUser.admin && (
            <MenuContainer ref={adminRef}>
              <ButtonNavBar
                type="button"
                className={openAdmin ? "active" : "inactive"}
                onClick={() => setOpenAdmin((prevOpenAdmin) => !prevOpenAdmin)}
              >
                Admin
              </ButtonNavBar>
              <DropDownContainer
                className={openAdmin ? "active" : "inactive"}
                onClick={() => setOpenAdmin((prevOpenAdmin) => !prevOpenAdmin)}
              >
                <DropDownItem link={"/books"} type={"Books"} Icon={BooksIcon} />
                <DropDownItem link={"/users"} type={"Users"} Icon={UsersIcon} />
              </DropDownContainer>
            </MenuContainer>
          )}
        </HomeAndLibrary>
        <SubContainerNavBar>
          <SearchBar modal={modal} setModal={setModal} />

          <MenuContainer ref={menuRef}>
            <NavBarProfileLink
              className={openMenu ? "focus" : "unfocus"}
              onClick={() => setOpenMenu((prevOpenMenu) => !prevOpenMenu)}
            >
              {currentUser && currentUser.profilePic ? (
                <img alt="" src={currentUser.profilePic} />
              ) : (
                <img
                  alt=""
                  src="https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996"
                />
              )}
            </NavBarProfileLink>
            <DropDownContainer className={openMenu ? "active" : "inactive"}>
              <div onClick={() => setOpenMenu((prevOpenMenu) => !prevOpenMenu)}>
                <DropDownItem
                  link={"/profile"}
                  type={"Settings"}
                  Icon={SettingsIcon}
                />
              </div>

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
