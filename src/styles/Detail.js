import styled from "styled-components";

export const SingleCardContainerDetail = styled.div`
  display: grid;
  grid-template-rows: 0.25fr 0.25fr;
  gap: 10px;
  width: 800px;
  height: 650px;
  border: 1px solid #ccc;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
  /* box-shadow: 2px 2px 6px 0px #ccc; */
  margin: 10px;
  padding-top: 20px;
  margin-top: 0px;
  background-color: white;
`;

export const ImgAndInfo = styled.div`
  padding-top: 80px;
  height: 350px;
  width: 720px;
  display: grid;
  align-items: center;
  grid-template-columns: 0.25fr 0.25fr;
  gap: 30px;
  padding-bottom: 0px;
`;

export const H1Detail = styled.h1`
  font-family: Inter;
  font-size: 20px;
  font-style: italic;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0px;
`;

export const TitleAndRating = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
  padding: 0px;
  align-items: center;
`;

export const SubtitleAndYear = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
  padding: 0px;
  align-items: center;
`;

export const H2Detail = styled.h2`
  font-family: "Inter";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0px;
  text-transform: capitalize;
`;

export const H4Detail = styled.h4`
  font-family: "Inter";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  text-transform: capitalize;
  margin: 0px;
`;

export const H5Detail = styled.h5`
  font-family: "Inter";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  padding: 0px;
  padding-left: 20px;
  margin: 0px;
`;

export const TitleCardConteinerDetail = styled.div`
  width: 300px;
  margin: 0px;
`;
export const GridConteinerDetail = styled.div`
  display: grid;
  padding-top: 0px;
  padding-bottom: 0px;
  grid-template-columns: repeat(2, minmax(60px, 500px));
  grid-auto-rows: minmax(auto, 100px);
  gap: 0px;
  flex-grow: 1;
  margin: 0px;
`;

export const ColumnConteinerDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  margin: 0px;
  padding: 0px;
`;

export const LeftColumnDetail = styled.div`
  grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding: 0px;
  margin: 0px;
`;

export const RigthColumnDetail = styled.div`
  grid-template-rows: repeat(2, minmax(60px, 300px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 0px;
  flex-grow: 1;
  padding: 0px;
  margin: 0px;
`;

export const CardImgDetail = styled.img`
  width: 150px;
  height: 200px;
  margin: 0px;
`;

export const StarDetail = styled.img`
  width: 15px;
  height: 15px;
  margin: 0px;
`;

export const DescriptionCardConteinerDetail = styled.div`
  width: 500px;
  height: 210px;
  padding: 0px;
  margin: 0px;
`;

export const DescriptionPDetail = styled.p`
  height: 150px;
  width: 550px;
  padding: 0px;
  text-align: justify;
  font-size: small;
  margin: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
`;

export const ImgContainerDetail = styled.div`
  width: 150px;
  height: 200px;
  gap: 0px;
  margin: 0px;
`;

export const DetailContainer = styled.div``;

export const InfoSeccion = styled.div``;

export const OverLay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color:rgba(0, 0, 0, 0.7);  */
  /* backdrop-filter: blur(1px); */
`;

export const ReviewConteiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  width: 730px;
  padding: 0px;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 1px;
  background-color: white;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
`;

export const UserAndStars = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 730px;
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ButtonCloseDetail = styled.button`
  margin: 10px;
  padding: 0.5em 0.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 200;
  font-weight: bolder;
  color: red;
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 2px 3px rgba(0.2, 0.2, 0.2, 0.3);
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: bolder;
  top: 65px;
  right: 300px;
  position: absolute;

  &:hover {
    background-color: red;
    box-shadow: 0px 15px 20px rgba(255, 125, 0, 0.4);
    color: #fff;
    //transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonSelectDetail = styled.select`
  margin: 10px;
  padding: 0.5em 0.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 200;
  color: black;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: bolder;
  top: 65px;
  right: 340px;
  position: absolute;

  &:hover {
    background-color: #1b8f2b;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    //transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonOptionsDetail = styled.option`
  margin: 10px;
  padding: 0.5em 0.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 200;
  color: black;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: bolder;
  top: 65px;
  right: 340px;
  position: absolute;

  &:hover {
    background-color: #1b8f2b;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    //transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonDetail = styled.button`
  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "30px"};
  padding: 0.3em;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 50px;
  color: #111;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    box-shadow: 0px 15px 20px #3f3f3f;
    //transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonsConteiner = styled.div`
  padding-top: 0px;
  height: 50px;
  width: 720px;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: space-around;
  padding-bottom: 0px;
  align-self: flex-end;
`;

export const InfoContainerReview = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
