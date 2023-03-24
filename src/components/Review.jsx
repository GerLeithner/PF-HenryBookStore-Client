import React, { useState, useEffect } from "react";

import { DetailReview, ReviewContent, ReviewInfo } from "../styles/Review";

export default function Review({ r }) {
  return (
    <DetailReview>
      <div style={{ display: "flex", flexDirection: "row",justifyContent: "space-between" }}>
        <ReviewInfo>By {r.user.userName}</ReviewInfo>
        <ReviewInfo>Score {r.score}</ReviewInfo>
      </div>
      <ReviewContent>{r.comment ? r.comment : ""}</ReviewContent>
      <div style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end" }}>
      <ReviewInfo>On {r.create_date}</ReviewInfo>
      </div>
    </DetailReview>
  );
}
