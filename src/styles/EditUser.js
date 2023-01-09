import styled from "styled-components";

export const UserEditContainer = styled.form`
  margin: 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  border: 1px solid #ccc;
`;

export const UserPic = styled.img`
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 0px;
`;

export const FieldContainer = styled.div`
  margin: 0px;
  padding: 0px, 10px 0px 10px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 820px;
`;

export const Field = styled.div`
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 27px;
  width: 380px;
  border: 1px solid #ccc;
`;

export const ButtonDisable = styled.button`
  height: 35px;
  width: ${({ ancho }) => ancho || "max-content"};
  margin-left: ${({ margenIzq }) => margenIzq || "0px"};
  padding: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #111;
  background-color: white;
  border: 3px solid #ccc;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;
  font: inherit;

  &:hover {
    border-color: ${({ color }) => color};
    background-color: ${({ color }) => color || "#1b8f2b"};
    color: #fff;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonClose = styled.button`
  height: 20px;
  width: 20px;
  padding: 0px;
  font-size: 14px;
  font-weight: 300;
  color: #111;
  background-color: #fff;
  border: 1px solid #ccc;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: red;
    background-color: red;
    color: #fff;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const H3Field = styled.span`
  margin: 0px;
  font-weight: 500;
  line-height: 20px;
  font-size: 16px;
  text-align: left;
`;