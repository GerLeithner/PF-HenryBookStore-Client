import styled from "styled-components";

export const DetailReview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3f3f3f;
  margin: 0px;
  height: 140px;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
`;

// export const Reviews = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 730px;
//   height: 100%;
//   padding: 0px;
//   margin: 0px;
//   gap: 10px;
// `;

export const ReviewsList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  padding: 0;
  padding-right: 10px;
  margin: 0;
  /* background-color: aqua; */
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;

  ::-webkit-scrollbar {
    width: 10px; /* Ancho de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #3F3F3F; /* Color del pulgar de la barra de desplazamiento */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #D9D9D9; /* Color de fondo de la barra de desplazamiento */
    border-radius: 5px;
  }
`;

export const ReviewContent = styled.p`
  text-align: left;
  min-height: 50px !important;
  font-size: medium;
  margin: 0;
  /* color: #D9D9D9; */
`;

export const ReviewInfo = styled.p`
  text-align: left;
  font-size: ${({ fontSize }) => fontSize || "large"};
  margin: 0;
`;

export const Score = styled.div`
  height: 26px;
  border: solid 1px "#D9D9D9";
  border-radius: 5px;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 730px;
  height: 100%;
  padding: 0px;
  margin: 0px;
  gap: 15px;
  /* background-color: red; */
`;

export const ReviewHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export const CloseDetail = styled.div`
  font-size: 32px;
  font-weight: 600;
  transform: rotate(45deg);
  &:hover {
    cursor: pointer;
    color: #622cd4;
  }
`;

export const NewReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 10px;
`;

export const ReviewButton = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 5px 20px 5px 20px;
  color: ${({ textColor }) => textColor || "#FFFFFF"};
  background-color: ${({ backColor }) => backColor || "#622CD4"};
  border-radius: 5px;
  border: none;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  font-size: 16px;
  font-weight: 100;
  margin: 0px;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#7637FD"};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
`;

export const ReviewInput = styled.textarea`
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
  padding: 0px;
  font-size: 16px;
  background: transparent;
  font-size: 16px;
  line-height: 1.5;
  font-family: inherit;
  resize: none;
  border-bottom: 1px solid #d9d9d9;
  caret-color: #d9d9d9;
  color: #d9d9d9;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  background-color: #1e1e1e;

  &:active {
    transform: scale(0.95);
  }
`;

export const StyledSelect = styled.select`
  /* appearance: none; */
  border: none;
  border-bottom: 1px solid #d9d9d9;
  background: transparent;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  color: #d9d9d9;
  padding-bottom: 3px;
`;

export const StyledOption = styled.option`
  background-color: #1e1e1e;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &.hover {
  }
`;

export const EditMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    color: #d9d9d9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: none;
    background: none;
    font-size: 16px;
    padding: 0;
    transition: background-color 0.5s ease-in-out;
    text-decoration: none;
    gap: 5px;
    fill: #d9d9d9;

    &:active {
    transform: translateY(-1px);
    }

    &.active {
      visibility: visible;
      transform: translateY(0);
      transition: 0, 0002s;
      svg {
        fill: #622cd4;
      }
    }

    &:hover {
      cursor: pointer;
      color: #622cd4;

      svg {
        fill: #622cd4;
        stroke: #622cd4;
      }
    }
  }
`;

export const DropDownEdit = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #1e1e1e;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  margin-top: 10px;
  gap: 10px;

  svg {
    height: 20px;
    width: 20px;
    fill: #d9d9d9;
    stroke: #d9d9d9;
  }

  &.active {
    visibility: visible;
    transform: translateY(0);
    transition: 0, 0002s;
  }
  &.inactive {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-200px);
    transition: 0, 0002s;
  }
`;
