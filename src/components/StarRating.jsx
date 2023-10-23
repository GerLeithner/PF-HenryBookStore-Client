import React from "react";

import { ReactComponent as StarFill } from "../icons/starFill.svg";
import { ReactComponent as StarEmpty } from "../icons/starEmpty.svg";

import { StarsContainer } from "../styles/CardRecommended";

export default function StarRating({ rating }) {
  const maxStars = 5;
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<StarFill key={i} />);
    } else {
      stars.push(<StarEmpty key={i} />);
    }
  }

  return <StarsContainer>{stars}</StarsContainer>;
}
