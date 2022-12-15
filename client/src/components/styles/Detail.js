import styled from "styled-components";

export const SingleCardContainerDetail = styled.div`
  display:grid;
  align-items: center;
  grid-template-columns: 0.25fr 0.25fr;
  gap: 40px;
  width: 600px;
  height: 300px;
  border: 1px solid #ccc;
  align-items: center;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  margin:10px;
  background-color: rgba(0, 0, 0, 0.7);
 

`;
export const H1Detail=styled.h1`
font-family: Inter;
font-size: 24px;
font-style: italic;
font-weight: 500;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
margin:0px;

`;
export const TitleAndRating=styled.div`
display:flex;
flex-direction: row;
margin:0px;
justify-content: space-between;
padding:0px;
align-items:center;


`;
export const SubtitleAndYear=styled.div`
display:flex;
flex-direction: row;
margin:0px;
justify-content: space-between;
padding:0px;
align-items:center;

`;

export const H2Detail=styled.h2`
font-family: 'Inter';
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
margin:0px;
text-transform:capitalize;

`;
export const H4Detail=styled.h4`
font-family: 'Inter';
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
text-transform: capitalize;
margin:0px;

`;

export const TitleCardConteinerDetail= styled.div`
 width: 300px;
 margin:0px;
`;
export const GridConteinerDetail= styled.div`
  display: grid;
  padding-top:0px;
  padding-bottom:0px;
  grid-template-columns: repeat(2, minmax(60px, 500px));
  grid-auto-rows: minmax(auto, 100px);
  gap: 0px;
  flex-grow: 1;
  margin:0px;

  
`;
export const DescriptionCardConteinerDetail= styled.div`
 width: 420px;
 height: 210px;
 padding:0px;
 margin: 0px;
`;
export const ColumnConteinerDetail= styled.div`
 display:flex;
 flex-direction:column;
 height: 300px;
 justify-content: space-between;
 margin:0px;
 padding:0px;

`;
export const LeftColumnDetail= styled.div`
grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding:0px;
  margin:0px;
  
`;
export const RigthColumnDetail= styled.div`
  grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding:0px;
  margin:0px;
`;


export const CardImgDetail = styled.img`
  width: 150px;
  height: 200px;
  margin: 0px;

`;
export const DescriptionPDetail= styled.p`
padding:0px;
text-align:justify;
font-size: small;
margin:0px;
  
`;


export const ImgContainerDetail = styled.div`
 
  gap:0px;
  margin:0px;
  

`;

export const DetailContainer=styled.div`
`;

export const InfoSeccion=styled.div`
`;