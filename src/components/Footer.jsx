import React from "react";
import { FooterContainer, IconsContainer, Icon } from "../styles/Footer";
import { ReactComponent as FacebookIcon } from "../icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../icons/instagram.svg";

export default function Footer({ rgba }) {
  return (
    <FooterContainer rgba={rgba}>
      <IconsContainer>
        <Icon href="https://www.facebook.com/" target="_blank">
          <FacebookIcon />
        </Icon>
        <Icon href="https://twitter.com/" target="_blank">
          <TwitterIcon />
        </Icon>
        <Icon href="https://www.instagram.com/" target="_blank">
          <InstagramIcon />
        </Icon>
      </IconsContainer>
      <div
        style={{
          paddingRight: "200px",
        }}
      >
        © Copyright 2023 - Developed for Henry
      </div>
    </FooterContainer>
  );
}
