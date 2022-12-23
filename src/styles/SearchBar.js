import styled from "styled-components";

export const SearchContainer = styled.div`
  /* text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; */
  z-index: 1;
  width: 100%;
  //position: fixed;
  padding: 0px 30px 0px 30px;
  height: 50px;
  background-color: green;
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  align-items: center;
  margin: 0px;
`;

export const InputAndButton = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const InputSearch = styled.input`
  width: 320px;
  height: 37px;
  display: flex;
  flex-direction: column;
  line-height: 28px;
  border: 2px solid transparent;
  //border-bottom-color: #777;
  //padding: 0.2rem 0;
  outline: none;
  background-color: #fff;
  color: #0d0c22;
  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  outline: none;
  padding: 0.2rem 1rem;
  border-radius: 15px;
  border-color: #1b8f2b;

  &:hover {
    outline: none;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
    border-color: #1b8f2b;
  }
  &::placeholder {
    color: #777;
  }
  &:focus::placeholder {
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

export const DropdownSearch = styled.div`
  z-index: 1;
  /* position: relative; */
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
  margin: 2px 0;
`;
