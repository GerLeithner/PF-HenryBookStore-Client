import styled from "styled-components";

export const FilterHead = styled.div`
  width: 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const FilterBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const FilterButton = styled.button`
  border: none;
  background-color: white;
  display: contents;
  margin: 0px;
  padding: 0px;
  color: white;
  cursor: pointer;
  font: inherit;
  &:hover {
    color: #622cd4;
  }
`;

export const DownfallButton = styled.div`
  border: none;
  background-color: white;
  display: contents;
  margin: 0px;
  padding: 0px;
  color: white;
  cursor: pointer;
  font: inherit;
`;

export const SideButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ ancho }) => ancho || "max-content"};
  height: 30px;
  padding: 5px;
  font-size: 14px;
  font-weight: 300;
  color: white;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  svg {
    fill: white;
    height: 24px;
    width: 24px;
    transition: all 0.3s ease 0s;
  }

  &:hover {
    color: #622cd4;
    border-color: #622cd4;
    transition: all 0.3s ease 0s;
    svg {
      transition: all 0.3s ease 0s;
      fill: #622cd4;
    }
  }

  &:active {
    transform: translateY(2px);
  }
`;
