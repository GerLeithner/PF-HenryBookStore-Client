import React from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { ReactComponent as LogoutIcon } from "../icons/logout.svg";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as BooksIcon } from "../icons/books.svg";
import { ReactComponent as UsersIcon } from "../icons/users.svg";

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

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const searchInput = useSelector((state) => state.search);

  const [modal, setModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
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

  function DropDownItem({ link, type, Icon }) {
    if (type == "Logout") {
      return (
        <div>
          <button onClick={link} type="button">
            <LogoutIcon />
            {type}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            to={link}
            style={{
              textDecoration: "none",
            }}
          >
            <button type="button">
              <Icon />
              {type}
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
      <ContainerNavBar>
        <HomeAndLibrary>
          <HomeLinkNavBar to={"/home"}>Novel Wave</HomeLinkNavBar>
          <LinkNavBar to={"/library"}>My Library</LinkNavBar>
          {currentUser && currentUser.admin && (
            <MenuContainer ref={adminRef}>
              <ButtonNavBar
                type="button"
                className={openAdmin ? "active" : "inactive"}
                onClick={() => setOpenAdmin(!openAdmin)}
              >
                Admin
              </ButtonNavBar>
              <DropDownContainer className={openAdmin ? "active" : "inactive"}>
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
              onClick={() => setOpenMenu(!openMenu)}
            >
              {currentUser && currentUser.profilePic ? (
                <img src={currentUser.profilePic} />
              ) : (
                <img src="https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996" />
              )}
            </NavBarProfileLink>
            <DropDownContainer className={openMenu ? "active" : "inactive"}>
              <DropDownItem
                link={"/profile"}
                type={"Settings"}
                Icon={SettingsIcon}
              />
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
