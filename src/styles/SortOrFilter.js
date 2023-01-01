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
  color: ${({ color }) => color || "black"};
  cursor: pointer;
  font: inherit;
`;

export const DownfallButton = styled.div`
  border: none;
  background-color: white;
  display: contents;
  margin: 0px;
  padding: 0px;
  color: ${({ color }) => color || "black"};
  cursor: pointer;
  font: inherit;  
`;

export const SideButton = styled.button`
  width: ${({ ancho }) => ancho || "max-content"};
  height: 30px;
  padding: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #111;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${({ color }) => color || "#1b8f2b"};
    /* box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4); */
    color: #fff;
    //transform: translateY(-7px);
    border: none;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

