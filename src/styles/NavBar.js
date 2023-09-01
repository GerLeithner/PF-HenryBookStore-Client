import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const ContainerNavBar = styled.div`
  z-index: 1;
  width: 100%;
  position: fixed;
  padding: 0px 30px 0px 30px;
  height: 60px;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin: 0px;
`;

export const HomeAndLibrary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 60px;
`;

export const SubContainerNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  align-items: center;
`;

export const HomeLinkNavBar = styled(Link)`
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 48px;
  font-style: italic;
  height: 50px;
  padding: 0px 15px 0px 15px;
  color: #622cd4;
`;

export const LinkNavBar = styled(NavLink)`
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-decoration: none;
  font-weight: 400;
  font-size: 24px;
  height: 50px;
  padding: 0px 15px 0px 15px;

  &:hover {
    color: #622cd4;
  }

  &.active {
    color: #622cd4;
  }
`;

export const NavBarProfileLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0px;
  //padding: 0px 15px 0px 15px;
  transition: 0.2s;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0px;

    &:hover {
      //border: solid 2px #622cd4;
    }
  }
  &:hover {
    background: #622cd4;
    transition: 0.2s;
  }
  &.active {
    background: #622cd4;
  }
`;

export const NavProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0px;
  background-color: white;
  &:hover {
    transition: 0.3s;
    width: 42px;
    height: 42px;
    padding: 0px;
  }
`;
