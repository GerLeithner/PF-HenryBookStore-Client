import styled from "styled-components";

export const AccoutContainer = styled.div`
  margin: 0px;
  padding: 60px 20px 20px 270px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
`;

export const SubscriptionOptions = styled.div`
  width: 100%;
  padding: 20px 20px 25px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #ccc;
  gap: 50px
`;

export const ImageAndInfo = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
`;

export const ProfilePic = styled.img`
  height: 150px;
  width: 150px !important;
  border: 1px solid #ccc;
  border-radius: 50%;
`;

export const ProfilePicInput = styled.label`
  margin: 0px;
  padding: 0px 20px 0px 20px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  background-color: #fff;
  transition: all 0.01s ease 0s;
  cursor: pointer;


  &:hover {
    background-color: ${({ color }) => color || "#1b8f2b"};
    color: #fff;
    border-color: ${({ color }) => color || "#1b8f2b"};
  }

  &:active {
    transform: translateY(-1px);
  }
`;


export const InfoContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: ${({ gap }) => gap || "0px"};
`;

export const FiledAndButton = styled.div`
  height: 55px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  gap: 155px;
`;

export const Field = styled.div`
  margin: 0px;
  padding: 0px 30px 0px 30px;
  height: 30px;
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
`;

export const PlanSelect = styled.select`
  border: none;
  outline: none;
  font: inherit;
`;

export const EditFieldButton = styled.button`
  margin: 0px;
  padding: 0px 20px 0px 20px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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



