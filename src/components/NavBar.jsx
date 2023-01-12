import React, {useState, useEffect} from "react";
import { getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
  NavProfilePic,
  MenuConteinerNav,
  MenuTriggerNav,
  DropDownMenuNav,
  ButtonDisableNav,
  UlNav,
} from "../styles/NavBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const { isAuthenticated, user, isLoading , logout  } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  

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

  const handleMouseOver = () => {
    
    setIsHovering(true);
  
 
};

const handleMouseOutProfile = () => {
  setIsHoveringProfile(false);
};

const handleMouseOverProfile = () => {
  
  setIsHoveringProfile(true);


};

const handleMouseOut = () => {
setIsHovering(false);
};


  return (
    <div>
      <ContainerNavBar>
        <HomeLinkNavBar to={"/home"}>Books Explorer</HomeLinkNavBar>
        <SubContainerNavBar>
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/library"}>Library</LinkNavBar>
          {currentUser && currentUser.admin && (
            <MenuConteinerNav onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <MenuTriggerNav>
            <LinkNavBar >Dashboard</LinkNavBar>
            </MenuTriggerNav>
            <DropDownMenuNav
              className={`dropdown-menu ${isHovering ? "active" : "inactive"}`}
            >
              <UlNav>
                
  
              <LinkNavBar to={"/books"}>Books</LinkNavBar>
             <LinkNavBar to={"/users"}>Users</LinkNavBar>
               
  
              </UlNav>
            </DropDownMenuNav>
          </MenuConteinerNav>
          )}

          {/* <LinkNavBar to={"/about"}>About Us</LinkNavBar> */}
          
          <MenuConteinerNav onMouseOver={handleMouseOverProfile} onMouseOut={handleMouseOutProfile}>
            <MenuTriggerNav>
                 {currentUser && currentUser.profilePic ? (
              <NavProfilePic src={currentUser.profilePic} />
            ) : (
              <NavProfilePic src="https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996" />
            )}
            </MenuTriggerNav>
            <DropDownMenuNav
              className={`dropdown-menu ${isHoveringProfile ? "active" : "inactive"}`}
            >
              <UlNav>
                
  
              <LinkNavBar to={"/profile"}>Profile</LinkNavBar>
              {currentUser && (<ButtonDisableNav
              onClick={() => logout({ returnTo: window.location.origin })}
              ancho="220px"
              color="red"
            >Logout</ButtonDisableNav>)}
               
  
              </UlNav>
            </DropDownMenuNav>
            </MenuConteinerNav>

          {/* {currentUser && (
            <LinkNavBar
              onClick={() => logout({ returnTo: window.location.origin })}
            />
          )} */}
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
}

// onClick={() => logout({ returnTo: window.location.origin })}
