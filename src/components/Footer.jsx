import React from "react";
import { FooterContainer, IconsContainer } from "../styles/Footer";
import { ReactComponent as FacebookIcon } from "../icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../icons/instagram.svg";

export default function Footer() {
  return (
    <FooterContainer>
      <IconsContainer>
        <a href="https://www.facebook.com/" target="_blank">
          <FacebookIcon />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <TwitterIcon />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <InstagramIcon />
        </a>
      </IconsContainer>
      <div
        style={{
          paddingRight: "20px",
        }}
      >
        © Copyright 2023 - Developed for Henry
      </div>
    </FooterContainer>
  );
}
