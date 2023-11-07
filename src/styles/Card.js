import styled from "styled-components";

export const ContainerCards = styled.div`
  padding-top: 70px;
  padding-bottom: 120px;
  height: auto;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(5, minmax(20px, 100px));
  grid-auto-rows: minmax(auto, 200px);
  gap: 150px;
  flex-grow: 1;

  &.Uncarrousel {
    gap: 235px;
    padding-top: 50px;
  }
`;

export const H2Home = styled.h2`
  margin: 0px 0px 15px 0px;
  font-weight: 500;
  line-height: 29px;
  text-align: left;
  font-style: italic;
  padding-left: 50px;
`;

export const H5CardRating = styled.h5`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-decoration: none;
  border: solid black 1px;
  position: absolute;
`;

export const LinkCard = styled.link`
  text-decoration: none;
`;

export const H4Link = styled.h4`
  text-decoration: none;
  color: black;
`;

export const TitleCardConteiner = styled.div`
  width: 100px;
  height: 60px;
`;

export const DescriptionCardConteiner = styled.div`
  width: 320px;
  height: 70px;
`;

export const CardImg = styled.img`
  width: 200px;
  height: 300px;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  padding: 0px;
  justify-content: flex-end;
`;

export const SingleCardContainer = styled.div`
  width: 170px;
  height: 210px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export const SingleAboutCardContainer = styled.div`
  width: 310px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
`;

export const CardImgAboutUs = styled.img`
  display: flex;
  height: 200px;
  margin: 5px;
  object-fit: scale-down;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
  padding: 0px;
`;

export const ContainerAboutUs = styled.div`
  padding-top: 60px;
`;

export const CardsAboutUsContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 150px;
  height: 500px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(150px, 350px));
  grid-auto-rows: minmax(auto, 1000px);
  gap: 50px;
  flex-grow: 1;
`;

export const TrendingAndNewsContainer = styled.div`
  width: 150px;
  height: 200px;
  margin: 0px;
  padding: 0px;
`;

export const ButtonSelectCard = styled.select`
  margin: 0px;
  padding: 0.5em 0.5em;
  margin-left: 6em;
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

export const ButtonOptionsCard = styled.option`
  margin: 0px;
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

export const MenuConteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  height: 300px;
  margin: 0px;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  color: white;

  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  &.active {
    visibility: visible;
    opacity: 1;
  }

  background-color: rgba(1, 1, 1, 0.6);
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);

  list-style-type: none;

  align-self: center;
  &.inactive {
    visibility: hidden;
    opacity: 0;
  }
`;

export const TitleContainer = styled.div`
  &.long {
    font-size: 15px;
  }
  &.short {
    font-size: 20px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding-top: 80px;
`;

export const CardIcon = styled.div`
  cursor: pointer;

  padding: 10px;

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
