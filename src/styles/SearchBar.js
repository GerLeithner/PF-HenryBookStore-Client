import styled from "styled-components";

export const SearchContainer = styled.div`
  z-index: 1;
  padding: 0px 30px 0px 30px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
`;

export const InputAndButton = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
`;

export const InputSearch = styled.input`
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: column;
  line-height: 28px;
  border: none;
  border-radius: 10px 0px 0px 10px;
  outline: none;
  padding: 0.2rem 1rem;
`;

export const DropdownSearch = styled.div`
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  &:empty {
    border: none;
  }
`;

export const RowSearchBar = styled.div`
  cursor: pointer;
  text-align: center;
`;