import Carousel from "react-elastic-carousel";
import React from "react";

export default function Loading(props) {
  const times = 5;
  return (
    <div
      style={{
        paddingTop: "180px",
      }}
    >
      <Carousel itemsToShow={5} pagination={false}>
        {[...Array(times)].map((e, i) => {})}
      </Carousel>
    </div>
  );
}
