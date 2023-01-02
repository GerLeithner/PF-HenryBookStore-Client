import React from "react";
import { useSelector } from "react-redux";
import {
  PropAndInput,
  DescriptionContainer,
  H3Form,
  FormTextArea,
  ErrorsForm,
} from "../styles/CreateBook";
// import { StarDetail } from "../styles/Detail";
// import { StarsContainer } from "../styles/CardRecomended";
// import starFill from "../icons/starFill.svg";
// import starHalf from "../icons/starHalf.svg";

export default function BookReviews() {
  const detail = useSelector((state) => state.bookDetail);
  const reviews = useSelector((state) => state.bookDetail.reviews);

  console.log("State detail", detail);
  console.log("REVIEWS", reviews);
  // let reviewsScore = [];
  // let reviewsScoreFloor = [];
  // let stars = [];

  //     for (let i=0; i<reviews.length; i++){
  //         reviewsScore.push(reviews[i].score)
  //         reviewsScoreFloor.push(Math.floor(reviews[i].score))
  //         console.log(reviewsScore)
  //         let mod=reviewsScore[i] % reviewsScoreFloor[i]
  //         stars.push([])
  //         for(let j=0; j<reviewsScore[i]; j++){
  //             stars[i].push("star")
  //         }
  //         if (mod > 0) {
  //             stars[i].push("half");
  //           }
  //           reviews[i].stars=stars[i];
  //           console.log("REVIEWS",reviews[i])
  //     }

  return (
    <>
      {reviews.length ? (
        reviews.map((r) => {
          return (
            <DescriptionContainer>
              <PropAndInput>
                <ErrorsForm color={"black"} margenIzq="0px">
                  {r.user.userName}
                </ErrorsForm>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "70px" }}
                >
                  <ErrorsForm color={"black"}>Score: {r.score}</ErrorsForm>
                  <ErrorsForm color={"black"}>{r.create_date}</ErrorsForm>

                  {/* 
                    <StarsContainer>
                        <ErrorsForm>Score:
                            {r.stars &&
                            r.stars.map((s) =>
                            s === "star" ? (
                            <StarDetail src={starFill} alt="n" />
                            ) : (
                            <StarDetail src={starHalf} alt="n" />
                            )
                            )}
                        </ErrorsForm>
                    </StarsContainer>    
                    <ErrorsForm>{r.create_date}</ErrorsForm> */}
                </div>
              </PropAndInput>
              <FormTextArea type="text" value={r.comment} alto="80px" />
            </DescriptionContainer>
          );
        })
      ) : (
        <H3Form margenIzq="0px">The book hasn't users reviews yet</H3Form>
      )}
    </>
  );
}
