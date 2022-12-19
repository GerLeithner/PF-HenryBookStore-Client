import styled from "styled-components";

export const SingleCardContainerRecomended = styled.div`
  display:grid;
  align-items: center;
  grid-template-columns: 0.25fr 0.25fr;
  padding: 10px 30px 10px 30px;
  gap: 100px;
  width: max-content;
  height: max-content;
  align-items: center;
  margin: 0px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
`;



export const TitleAndRating = styled.div`
  display:flex;
  flex-direction: row;
  margin:0px;
  justify-content: space-between;
  padding:0px;
  align-items:center;
`;

export const SubtitleAndYear = styled.div`
  display:flex;
  flex-direction: row;
  margin:0px;
  justify-content: space-between;
  padding:0px;
  align-items:center;
`;

export const TitleCardConteinerRecomended = styled.div`
 width: 300px;
 margin:0px;
`;

export const GridConteinerRecomended = styled.div`
  display: grid;
  padding-top:0px;
  padding-bottom:0px;
  grid-template-columns: repeat(2, minmax(60px, 500px));
  grid-auto-rows: minmax(auto, 100px);
  gap: 0px;
  flex-grow: 1;
  margin:0px;
`;

export const DescriptionCardConteinerRecomended = styled.div`
  width: 600px;
  height: max-content;
  padding:0px;
  margin: 0px;
  text-overflow:ellipsis;
`;

export const ColumnConteinerRecomended = styled.div`
  display:flex;
  flex-direction:column;
  height: 300px;
  justify-content: space-between;
  margin:0px;
  padding:0px;
`;

export const LeftColumnRecomended = styled.div`
  grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding:0px;
  margin:0px;
`;

export const RigthColumnRecomended = styled.div`
  grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding:0px;
  margin:0px;
`;

export const ImgContainerRecomended = styled.div`
  display:grid;
  grid-template-columns: 200px 200px;
  row-gap: 0px;
  gap:0px;
  margin:0px;
`;

export const CardImgRecomended = styled.img`
  width: 200px;
  height: 300px;
  margin: 0px;
`;

export const H1Recomended = styled.h1`
  font-style: italic;
  font-weight: 500;
  text-align: left;
  margin:0px;
`;

export const H2Recomended = styled.h2`
  font-weight: 500;
  line-height: 29px;
  text-align: left;
  margin:0px;
`;

export const H4Recomended=styled.h4`
text-align: left;
margin:0px;
`;

export const DescriptionRecomended = styled.p`
  padding:0px;
  margin:0px;
  text-align: left;
`;







