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

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: white;
  width: 800px;
  height: 500px;
`;

export const ReviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: white;
  padding: 15px 20px 20px 20px;
  gap: 10px;
  width: 350px;
`;

export const CoverAndInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
`;

export const Cover = styled.img`
  width: 170px;
  height: 220px;
  border: 1px solid #ccc;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Props = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  gap: 40px;
  /* color: white; */
`;

export const H1 = styled.h1`
  font-size: 25px;
  font-style: italic;
  font-weight: 500;
  line-height: 29px;
  margin: 0px;
`;

export const H2 = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0px;
`;

export const Description = styled.span`
  overflow: auto;
  text-align: left;
  height: 220px;
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