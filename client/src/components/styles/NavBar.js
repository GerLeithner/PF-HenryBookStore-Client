import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerNavBar = styled.div`
  background-color: green;
  width: 100%;
  height: 70px;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: auto;
  position: sticky;
`;

export const LinkNavBar = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  line-height: 1.75rem;
  padding: 0.8rem;
  position: relative;
  transition: background-color 0.5s ease-in-out;

  &:hover {
    color: #ffffff;
    background-color: #5ca91d;
  }
`;
