import styled from "styled-components";

export const H1Detail = styled.h1`
  padding-top: 25px;
  padding-bottom: 40px;
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
`;

export const H5Detail = styled.h5`
  font-family: "Roboto Condensed", sans-serif;
  text-decoration: none;
`;

export const DetailContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-top:50px;
  margin-bottom: 50px;
  width: 450px;
  background-color: #1b8f2b65;
  padding: 15px;
  border-radius: 10px;
 
`;
export const InfoSeccion =styled.div`
  font-family: "Roboto Condensed", sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  margin: 0 auto;
  border: 3px solid lightgrey;
  outline: none;
  padding: 10px;
  width: 380px;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
  background-color: whitesmoke;

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


