import styled from "styled-components";

export const ContainerCards = styled.div`
  padding-top: 25px;
  padding-bottom: 50px;
  height: 300px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, minmax(20px, 100px));
  grid-auto-rows: minmax(auto, 600px);
  gap: 100px;
  flex-grow: 1;
`;
export const ContainerAboutUs = styled.div`
height:600px;
padding-bottom: 550px;
`;


export const ContainerCardsAboutUs = styled.div`
  padding-top: 25px;
  padding-bottom: 150px;
  height: 500px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(400px, 500px));
  grid-auto-rows: minmax(auto, 1000px);
  gap: 50px;
  flex-grow: 1;
`;


export const H2Home = styled.h2`
  padding-top: 10px;
  width: 400px;
  height: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 18px;

color: #020202;
`;

export const H5CardRating = styled.h5`
  font-family: "Roboto Condensed", sans-serif;
  width: 20px;
  height: 20px;
  border-radius: 50% ;
  text-decoration: none;
  border: solid black 1px;
  position: absolute;
  padding-top: 3px;
  margin-left: 80px;
  margin-top: 150x;
`;


export const LinkCard = styled.link`
  font-family: "Roboto Condensed", sans-serif;
  text-decoration: none;
`;
export const H4Link = styled.h4`
  font-family: "Roboto Condensed", sans-serif;
  text-decoration: none;
  color: black;
`;

export const TitleCardConteiner= styled.div`
 width: 100px;
 height: 60px;
`;
export const DescriptionCardConteiner= styled.div`
 width: 320px;
 height: 70px;
`;

export const CardImg = styled.img`
  width: 100px;
  height: 150px;
  display: flex;
  margin: auto;
  margin-top: 5px;
  object-fit: scale-down;
`;

export const CardImgAboutUs = styled.img`
  width: 200px;
  height: 200px;
  display: flex;
  margin: auto;
  margin-top: 5px;
  object-fit: scale-down;
`;

export const ImgContainer = styled.div``;

export const SingleCardContainer = styled.div`
  width: 110px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  
`;
export const SingleAboutCardContainer = styled.div`
  width: 350px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  
`;


export const TrendingAndNewsContainer =styled.div`

`;