import React from "react";
import { useSelector } from "react-redux";
import { 
    PropAndInput, 
    DescriptionContainer, 
    H3Form, FormTextArea, 
    ErrorsForm 
} from "../styles/CreateBook";

export default function BookReviews() {
    
    const reviews = useSelector(state => state.bookDetail.reviews);

    return (
        <>
            { reviews.length ? reviews.map(r => {
                return (
                    <DescriptionContainer>
                        <PropAndInput>
                            <ErrorsForm color={"black"} margenIzq="0px">{r.user.userName}</ErrorsForm>
                            <div style={{display: "flex", flexDirection: "row", gap: "70px"}}>
                                <ErrorsForm color={"black"}>Score: {r.score}</ErrorsForm>
                                <ErrorsForm color={"black"}>{r.create_date}</ErrorsForm>
                            </div>
                        </PropAndInput>
                        <FormTextArea type="text" value={r.comment} alto="40px"/>
                    </DescriptionContainer>
                )
                
            }) :
            <ErrorsForm>The book hasn't users reviews yet</ErrorsForm>
            }
        </>
    )
}