import styled from "styled-components";

export const DetailReview = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3f3f3f;
  margin: 0px;
  height: 130px;
  padding: 10px;
  gap: 10px;
`;

export const ReviewConteiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 730px;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background-color: RED;
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
`;

export const Reviews = styled.div`
`;

export const ReviewContent = styled.span`
  overflow: auto;
  text-align: left;
  height: 100px;
`;

export const ReviewInfo = styled.span`
  text-align: left;
  font-style: italic;
`;