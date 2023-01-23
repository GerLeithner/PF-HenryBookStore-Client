import styled from "styled-components";

export const FieldFormContainer = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 55px;
`;
// margin: 0px;
// padding: 20px;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: flex-end;
// gap: 20px;
// width: 100%;
// border: 1px solid #ccc;

export const FieldInputWarning = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &:active {
    transform: scale(0.95);
  }
  &:focus {
    border: 2px solid #ccc;
  }
`;

export const FieldInput = styled.input`
  margin: 0px;
  padding-right: 30px;
  width: 100%;
  text-align: left;
  outline: none;
  border: none;
  font: inherit;
  
  &:focus {
    border: none
  }
`;

export const FormWarnign = styled.span`
  display: flex;
  margin: 0px;
  color: ${({ color }) => color || "#ff0000"};
  font-size: 14px;
`;

export const EditFieldFormButton = styled.button`
  width: 100px;
  margin: 0px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: #111;
  background-color: #fff;
  font: inherit;

  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ color }) => color || "#1b8f2b"};
    color: #fff;
    border-color: ${({ color }) => color || "#1b8f2b"};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

