import styled from "styled-components";

export const Account = styled.div`
  padding-top: 80px;
  padding-bottom: 93.4px;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E1E1E;
`;

export const AccountContainer = styled.div`
  padding: 0;
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  padding: 20px 0px 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  font-size: 20px;
  font-weight: 200;
  gap: 50px
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
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

export const ProfilePic = styled.img`
  width: 180px;
  border-radius: 50%;
  margin: 0;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ProfilePicInput = styled.label`
  margin: 0px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: #FFFFFF;
  background: none;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;

  svg {
    height: 25px;
    width: 25px;
    stroke: #FFFFFF;
  }

  &:hover {
    color: #622cd4;
    svg {
    stroke: #622cd4;
  }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const Loading = styled.div`
  font-style: italic;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  color: #622CD4;

  svg {
    height: 30px;
    width: 30px;
    fill: #622CD4;
    stroke: "#622CD4";
  }
`;

export const InfoContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  margin: 0;
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
  padding: 0px;
  color: ${({ textColor }) => textColor }
`;

export const PlanSelect = styled.select`
  border: none;
  outline: none;
  font: inherit;
`;

export const EditFieldButton = styled.button`
  margin: 0px;
  border: none;
  background: none;
  color: #622CD4;
  display: inline;
  font-size: inherit;
  font-family: inherit;

  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #FFFFFF
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const HeaderAccount = styled.div`
  padding-bottom: 20px;
  margin: 0px;
  font-size: 32px;
  color: #D9D9D9;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #D9D9D9;
`;

