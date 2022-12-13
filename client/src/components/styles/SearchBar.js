import styled from "styled-components";

export const SearchContainer = styled.div``;

export const InputSearch = styled.input`
  width: 230px;
  height: 30px;
  line-height: 28px;
  border: 2px solid transparent;
  border-bottom-color: #777;
  padding: 0.2rem 0;
  outline: none;
  background-color: transparent;
  color: #0d0c22;
  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus {
    outline: none;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
    border-color: #1b8f2b;
  }
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
