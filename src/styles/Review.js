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

export const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 730px;
  height: 100%;
  padding: 0px;
  margin: 0px;
  gap: 10px;
`;

export const ReviewsList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
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