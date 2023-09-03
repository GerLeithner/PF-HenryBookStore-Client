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

export const CoverAndInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
  border: none;
`;

export const Cover = styled.img`
  width: 220px;
  height: 370px;
  border: 1px solid #ccc;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 10px
`;

export const Props = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
    text-align: right;
  margin: 0;
  padding: 10px 0px 10px 0px;
`;

export const H1 = styled.span`
  font-size: 64px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: left;
`;

export const H2 = styled.span`
  font-size: 32px;
  font-weight: 400;
  margin: 0px;
`;

export const H3 = styled.span`
  font-size: 24px;
  font-weight: 100;
  margin: 0px;
`;

export const Description = styled.span`
  overflow: auto;
  text-align: left;
  font-size: 16px;
  font-weight: 100;
  color: #D9D9D9;
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