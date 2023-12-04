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
  width: 20px;
  height: 20px;
  margin: 0px;
`;

export const ButtonIcons = styled.div`
  width: 31px;
  height: 31px;
  margin: 0;
  svg {
    &.fillWhite {
      fill: white;
    }
    &.finished {
      stroke: white;
      fill: none;
      width: 61px;
      height: 62px;
    }

    width: 60px;
    height: 60px;
  }
  &:hover {
    color: #622cd4;
    svg {
      &.fillWhite {
        fill: #622cd4;
      }
      &.finished {
        stroke: #622cd4;
      }
    }
  }
  &:active {
    transform: translateY(+2px);
  }
  svg {
    &.fillWhite {
      fill: white;
    }
    &.finished {
      stroke: white;
      fill: none;
      width: 61px;
      height: 62px;
    }

    width: 60px;
    height: 60px;
  }
  &:hover {
    color: #622cd4;
    svg {
      &.fillWhite {
        fill: #622cd4;
      }
      &.finished {
        stroke: #622cd4;
      }
    }
  }
  &:active {
    transform: translateY(+2px);
  }
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

export const OverLay = styled.div`
  width: 100%;
  height: 480px;
  padding: 20px 20px 20px 20px;
  margin: 0;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: "row";
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  color: white;
  &.catalogue {
    position: fixed;
    z-index: 2;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

export const Cover = styled.img`
  width: 250px;
  height: 390px;
`;

export const Description = styled.span`
  overflow: auto;
  text-align: left;
  font-size: 16px;
  font-weight: 100;
  color: #d9d9d9;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 10px; /* Ancho de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #3f3f3f; /* Color del pulgar de la barra de desplazamiento */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #d9d9d9; /* Color de fondo de la barra de desplazamiento */
    border-radius: 5px;
  }
`;

export const Props = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  text-align: right;
  margin: 0;
  padding: 10px 0px 10px 0px;
`;

export const H1 = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: left;
`;

export const H2 = styled.span`
  font-size: 32px;
  font-weight: 400;
  margin: 0px;
  padding: 0;
`;

export const H3 = styled.span`
  font-size: 24px;
  font-weight: 100;
  margin: 0px;
  color: #ffffff;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: white;
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
    transform: translateY(+2px);
  }
`;

export const ButtonDetail = styled.button`
  display: flex;
  align-items: center;
  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "50px"};
  padding: 10px 20px 10px 20px;
  color: #ffffff;
  background-color: ${({ colorFondo }) => colorFondo || "#3F3F3F"};
  border: none;
  border-radius: 5px;
  transition: all 0.01s ease 0s;
  cursor: pointer;
  outline: none;

  font-size: 20px;
  font-weight: 400;
  margin: 0px;

  &:hover {
    background-color: ${({ colorHover }) => colorHover || "#6F6F6F"};

    svg {
      &.fillWhite {
        fill: #622cd4;
      }
      &.finished {
        stroke: #622cd4;
      }
    }
  }

  &:active {
    transform: translateY(+2px);
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
