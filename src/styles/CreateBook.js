import styled from "styled-components";

export const FormContainer = styled.form`
  margin: 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  align-items: left;
  width: 100%;
  text-align: left;
  border: 1px solid #ccc;
`;

export const ImageAndInfoContainer = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
`;

export const BookImage = styled.img`
  width: 170px;
  height: 220px;
  border: 1px solid #ccc;
  margin: 0px;
`;

export const InfoContainer = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const PropAndInputAndError = styled.div`
  margin: 0px;
  padding:0px;
  display:flex;
  flex-direction: column;
  height: ${({ alto }) => alto || "40px"};
  align-items: flex-end;
`;

export const PropAndInput = styled.div`
  margin: 0px;
  padding:0px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  width: ${({ width }) => width || "100%"};
`;

export const FormInput = styled.input`
  height: 23px;
  width: ${({ ancho }) => ancho || "675px"};
  margin-left: ${({ margen }) => margen || "20px"};
  border: 1.5px solid #ccc;
  outline: none;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  text-align: right;
  padding-right: 30px;

  &:hover {
    box-shadow: 0px 0px 20px -17px;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    border: 2px solid #ccc;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FormTextArea = styled.textarea`
  border: 1.5px solid #ccc;
  outline: none;
  height: ${({ alto }) => alto || "100px"};
  width: 100%;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    box-shadow: 0px 0px 20px -17px;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    border: 2px solid grey;
  }
`;

export const H3Form = styled.span`
  margin: 0px;
  margin-left: ${({ margenIzq }) => margenIzq || "20px"};
  margin-right: ${({ margenRig }) => margenRig || "0px"};;
  font-weight: 500;
  line-height: 20px;
  font-size: 16px;
  text-align: left;
  font-style: italic;
`;

export const ErrorsForm = styled.span`
  margin: 0px;
  color: ${({ color }) => color || "#ff0000"};
  font-size: 14px;
`;

export const DropDownSelect = styled.div`
  position: relative;
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  &:empty {
    border: none;
  }
`;

export const ButtonForm = styled.button`
  width: ${({ ancho }) => ancho || "max-content"};
  margin-left: ${({ margenIzq }) => margenIzq || "0px"};
  padding: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #111;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ color }) => color || "#1b8f2b"};
    /* box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4); */
    color: #fff;
    //transform: translateY(-7px);
    border: none;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

