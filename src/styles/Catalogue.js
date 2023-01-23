import styled from "styled-components";

export const SideBarContainer = styled.div`
  overflow: auto;
  position: fixed;
  z-index: 0;
  height: 100vh;
  width: 250px;
  background-color: #efefef;
  padding-top: ${({ paddingTop }) => paddingTop || "65px"};
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  /* overflow-y: scroll; */
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
  margin-top: 0px;
`;

export const ButtonCatalogue = styled.button`
  width: ${({ ancho }) => ancho || "max-content"};
  height: ${({ alto }) => alto || "max-content"};
  padding: ${({ padding }) => padding || "1em 1em"};
  font-size: ${({ fontSize }) => fontSize || "12px"};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: ${({ fontWeight }) => fontWeight || "200"};
  color: #111;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;
  margin:0px;

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