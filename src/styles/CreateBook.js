import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  items-align: center;
  padding-top: 80px;
`;

export const FormContainer = styled.form`
  margin: 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: max-content;
`;

export const ImageAndInfoContainer = styled.form`
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const BookImage = styled.img`
  width: 150px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0px;
`;

export const InfoContainer = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const PropAndInput = styled.div`
  background-color: red;
  margin: 0px;
  padding:0px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  width: 100%;
`;
















export const H1Form = styled.h1`
  padding-top: 25px;
  padding-bottom: 40px;
  margin-bottom: 0px;
  font-family: "Roboto Condensed", sans-serif;
`;

export const H3Form = styled.h3`
  margin: 0px 0px 15px 0px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  font-style: italic;
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