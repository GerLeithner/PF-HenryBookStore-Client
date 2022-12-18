import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerNavBar = styled.div`
  z-index: 1;
  width: 100%;
  position: fixed;
  padding: 0px 30px 0px 30px;
  height: 50px;
  background-color: green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;   
  align-items: center;
`;

export const SubContainerNavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  gap: 70px;
  align-items: center;
`;

export const HomeLinkNavBar = styled(Link)`
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-Decoration: none;
  font-weight: 600;
  font-size: 25px;
  font-style: italic;
  height: 50px;
  padding: 0px 15px 0px 15px;

  &:hover {
    color: #ffffff;
    background-color: #5ca91d;
  }
`;

export const LinkNavBar = styled(Link)`
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-Decoration: none;
  font-weight: 400;
  font-size: 20px;
  height: 50px;
  padding: 0px 15px 0px 15px;

  &:hover {
    color: #ffffff;
    background-color: #5ca91d;
  }
`;



