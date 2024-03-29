import styled from "styled-components";

export const Account = styled.div`
  padding-top: 89px;
  padding-bottom: 20px;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: #1e1e1e;
  //height: 100vh;
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
  border-bottom: 1px solid #d9d9d9;
  color: #d9d9d9;
  font-size: 20px;
  font-weight: 200;
  gap: 50px;

  &.subscription {
    min-height: 180px;
  }
`;

export const SubscriptionOptions = styled.div`
  width: 100%;
  padding: 20px 20px 25px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;
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
  color: #ffffff;
  background: none;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;

  svg {
    height: 25px;
    width: 25px;
    stroke: #ffffff;
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
  color: #622cd4;

  svg {
    height: 30px;
    width: 30px;
    fill: #622cd4;
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
  color: ${({ textColor }) => textColor};
`;

export const PlanSelect = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: transparent;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1.5;
  color: #d9d9d9;
  padding-bottom: 3px;
  width: auto;
  height: 45px;
  text-align: center;
`;

export const EditFieldButton = styled.button`
  cursor: pointer;
  margin: 0px;
  border: none;
  background: none;
  color: #622cd4;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  font-size: inherit;
  font-family: inherit;

  transition: all 0.01s ease 0s;

  outline: none;

  &:hover {
    color: #ffffff;
  }

  &:active {
    transform: translateY(-1px);
  }

  &.on {
    circle {
      fill: #622cd4;
      stroke: #622cd4;
    }
  }
  svg {
    cursor: pointer;
    height: 40px;
    width: 40px;
    fill: white;

    path {
      stroke: none;
    }

    circle {
      fill: #666666;
      stroke: #666666;
    }
  }
`;

export const HeaderAccount = styled.div`
  padding-bottom: 20px;
  margin: 0px;
  font-size: 32px;
  color: #d9d9d9;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #d9d9d9;
`;

export const NotificationContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #622cd4;
  gap: 10px;

  &.off {
    color: #666666;
  }
`;
