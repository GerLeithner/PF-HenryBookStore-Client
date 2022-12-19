import styled from "styled-components";

export const H1Form = styled.h1`
  padding-top: 25px;
  padding-bottom: 40px;
  margin-bottom: 0px;
  font-family: "Roboto Condensed", sans-serif;
`;

export const H5Form = styled.h5`
  font-family: "Roboto Condensed", sans-serif;
  text-decoration: none;
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


export const GenresContainer= styled.div`
 display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, minmax(80px, 100px));
  grid-auto-rows: minmax(auto, 50px);
  gap: 10px;
  flex-grow: 1;
`;

export const GenreNameLabel= styled.label`
 width: 40px;
 height: 60px;
`;