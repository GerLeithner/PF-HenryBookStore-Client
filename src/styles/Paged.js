import styled from "styled-components";

export const PaginationUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: center;
  margin: 0px;
  padding-top: 0px;
  gap: 20px;
  align-self: center;
`;

export const PagedButton = styled.button`
  border: none;
  background-color: white;
  display: contents;
  margin: 0px;
  padding: 0px;
  color: ${({ color }) => color || "black"};
  cursor: pointer;
  font: inherit;
`;
