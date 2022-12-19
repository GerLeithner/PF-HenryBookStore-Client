import styled from "styled-components";

export const SideBarContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 200px;
  background-color: #efefef;
  padding: 85px 15px 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

export const SelectFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 0px;
  width: max-content;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const ButtonCatalogue = styled.button`
  margin: 10px;
  padding: 1em 1em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 200;
  color: #111;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  font-family: "Roboto Condensed", sans-serif;

  &:hover {
    background-color: #1b8f2b;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    //transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
