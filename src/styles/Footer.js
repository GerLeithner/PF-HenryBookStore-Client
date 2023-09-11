import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0%;
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  cursor: default;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-top: 3px;
  width: 200px;
  text-decoration: none;
  svg {
    height: 20px;
    width: 20px;
    fill: white;

    &:hover {
      fill: #622cd4;
    }
  }
`;
