import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white'  class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  background-size: 25px;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    background-size: 30px;
  }
`;

export const SearchContainer = styled.div`
  z-index: 1;
  padding: 0px 30px 0px 30px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
`;

export const InputAndButton = styled.form`
  text-align: center;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const InputSearch = styled.input`
  width: 0px;
  height: 35px;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  line-height: 28px;
  font-size: 20px;
  border: none;
  border-radius: 10px 0px 0px 10px;
  background-color: transparent;
  outline: none;
  padding: 0.2rem 1rem;
  padding-left: 5px;
  color: white;
  transition: 0.2s;

  &.active {
    visibility: visible;
    background: linear-gradient(#ffff, #000) center bottom 1px /
      calc(100% - 10px) 2px no-repeat;
    border-radius: 0px;
    width: 300px;
    transition: 0.2s;
  }
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
