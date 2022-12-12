import styled from "styled-components";

export const ContainerCards = styled.div`
  padding: 10;
  height: 700px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(4, minmax(40px, 600px));
  grid-auto-rows: minmax(auto, 600px);
  gap: 10px;
  flex-grow: 1;
`;

export const CardImg = styled.img`
  width: 100px;
  height: 150px;
  display: flex;
  margin: 20px auto;
  object-fit: scale-down;
`;

export const ImgContainer = styled.div``;

export const SingleCardContainer = styled.div`
  width: 350px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  background-color: #1b8f2b65;
`;
