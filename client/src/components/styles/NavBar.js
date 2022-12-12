import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerNavBar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: green;
  justify-content: flex-end;
`;

const LinkNavBar = styled(Link)`
  display: flex;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 30px 20px;

  &:hover {
    color: black;
  }
`;

export default LinkNavBar;
