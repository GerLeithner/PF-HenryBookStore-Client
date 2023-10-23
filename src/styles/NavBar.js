import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const ContainerNavBar = styled.div`
  z-index: 10;
  width: 100%;
  position: fixed;
  padding: 0px 30px 0px 30px;
  height: 50px;
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

export const ButtonNavBar = styled.button`
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-decoration: none;
  font-weight: 400;
  font-size: 24px;
  padding: 0px 0px 0px 0px;
  background-color: transparent;
  border-color: transparent;
  border: 0px;
  height: 36px;

  &:hover {
    cursor: pointer;
    color: #622cd4;
  }

  &.active {
    color: #622cd4;
  }
`;

export const NavBarProfileLink = styled.div`
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
  pointer-events: auto;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0px;
  }
  &:hover {
    background: #622cd4;
    cursor: pointer;
    transition: 0.2s;
  }
  &.focus {
    background: #622cd4;
    cursor: pointer;
    transition: 0.2s;
  }
`;

export const NavProfilePic = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0px;
  background-color: white;

  &:hover {
    transition: 0.3s;
    width: 48px;
    height: 48px;
    padding: 0px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  //align-items: baseline;
  flex-direction: column;
  align-items: center;
  padding-top: 77px;
  pointer-events: none;
`;

export const DropDownContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: black;
  border-radius: 10%;
  padding: 0px 5px 5px 5px;
  pointer-events: auto;
  &.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition: 0, 0002s;
  }
  &.inactive {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-200px);
    transition: 0, 0002s;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    border: none;
    background: none;
    font-size: 18px;
    padding: 5px;
    transition: background-color 0.5s ease-in-out;
    text-decoration: none;
    gap: 5px;
    svg {
      height: 25px;
      fill: white;
    }

    &:hover {
      cursor: pointer;
      color: #622cd4;

      svg {
        fill: #622cd4;
      }
    }
  }
`;
