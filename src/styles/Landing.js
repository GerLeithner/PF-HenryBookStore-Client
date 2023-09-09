import styled from "styled-components";
import landingBackground from "../images/LandingBackground.png";

export const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${landingBackground}) no-repeat center/cover;
`;

export const LandingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.71);
  padding: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;

  margin-bottom: auto;
  margin-right: auto;
  transition: background-color 0.5s ease-in-out;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 48px;
  font-style: italic;
  height: 50px;
  padding: 0px 15px 0px 15px;
  text-shadow: 0px 7px 4px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  line-height: normal;
  color: #622cd4;
  cursor: default;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;

export const SloganButtonContainer = styled.div`
  color: white;
  text-shadow: 0px 7px 4px rgba(0, 0, 0, 0.25);
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: default;
  button {
    width: 187px;
    height: 54px;
    color: #fff;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-radius: 5px;
    border-color: transparent;
    background: #622cd4;
    &:hover {
      cursor: pointer;
      background-color: #5b2ac4;
    }
    &:active {
      background-color: #3e1c85;
    }
  }
`;

export const Balance = styled.div`
  margin-top: auto;
  visibility: hidden;
`;
