import styled from "styled-components";

export const H1Form = styled.h1`
  font-family: "Roboto Condensed", sans-serif;
`;

export const FormContainer = styled.form`
  margin: 0 auto;
  width: 400px;
  background-color: #1b8f2b65;
  padding: 15px;
  border-radius: 10px;
`;

export const FormInput = styled.input`
  font-family: "Roboto Condensed", sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1.5px solid lightgrey;
  outline: none;
  padding: 10px;
  width: 380px;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;

  &:hover {
    border: 2px solid lightgrey;
    box-shadow: 0px 0px 20px -17px;
  }

  &:active {
    transform: scale(0.95);
  }
  &:focus {
    border: 2px solid grey;
  }
`;

export const ErrorsForm = styled.p`
  font-family: "Roboto Condensed", sans-serif;
  margin-top: 0px;
  font-size: 14px;
  color: #ff0000;
`;
