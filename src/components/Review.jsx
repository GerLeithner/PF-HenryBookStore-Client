import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DetailReview, ReviewContent, ReviewInfo, Score } from "../styles/Review";

export default function Review({ r, user, bookId }) {
  return (
    <DetailReview>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "cen"
        }}
      >
        <ReviewInfo>{r.user.userName}</ReviewInfo>
        <div style={{ border: "solid #D9D9D9 2px", borderRadius: "5px", height: "26px", width: "35px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <ReviewInfo>{r.score},0</ReviewInfo>
        </div>
      </div>
      <ReviewContent>{r.comment ? r.comment : ""}</ReviewContent>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <ReviewInfo>{r.create_date}</ReviewInfo>
      </div>
    </DetailReview>
  );
}
