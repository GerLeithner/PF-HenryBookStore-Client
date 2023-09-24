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
  margin: 0;
  /* background-color: aqua; */
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
`;

export const ReviewContent = styled.p`
  text-align: left;
  height: 100px;
  font-size: medium;
  margin: 0;
`;

export const ReviewInfo = styled.p`
  text-align: left;
  font-size: large;
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
  gap: 10px;
  /* background-color: red; */
`;

export const ReviewHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  margin: 0;
  /* background-color: aqua; */
`;

export const CloseDetail = styled.div`
  font-size: 32px;
  font-weight: 600;
  transform: rotate(45deg);
  &:hover {
    cursor: pointer;
    color: #622CD4;
  }
`;

export const NewReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  padding: 10px;
`;

export const CancelButton = styled.button`
  height: fit-content;
  width: fit-content;
  padding: 5px 20px 5px 20px;
  color: #D9D9D9;
  background-color: #1E1E1E;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  font-size: 16px;
  font-weight: 100;
  margin: 0px;

  &:hover {
    color: #622CD4;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const SubmitButton = styled.button`
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
  /* height: 1.7em; */
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
  border-bottom: 1px solid #D9D9D9;
  caret-color: #D9D9D9;
  color: #D9D9D9;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  background-color: #1E1E1E;
  &:active {
    transform: scale(0.95);
  }
`;