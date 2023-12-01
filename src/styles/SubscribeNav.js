import styled from "styled-components";

export const SubscribeContainer = styled.div`
  position: relative;
  padding-top: 50px;
  width: 100%;
  z-index: 1;
`;

export const Nav = styled.nav`
  padding-right: 20px;
  background-color: #1e1e1e;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
`;

export const PlanSelectNav = styled.select`
  border: none;
  outline: none;
  font: inherit;
  height: 30px;
`;

export const H3NAV = styled.span`
  margin: 0px;
  font-weight: 500;
  line-height: 20px;
  font-size: 18px;
  text-align: left;
  font-style: italic;
  color: white;
`;
