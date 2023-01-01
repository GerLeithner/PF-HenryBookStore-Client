import React from "react";
import { useSelector } from "react-redux";
import { 
    PropAndInput, 
    DescriptionContainer, 
    H3Form, FormTextArea, 
    ErrorsForm 
} from "../styles/CreateBook";

export default function BookReviews() {
    
    const reviews = useSelector(state => state.detail.reviews);

    return (
        <>
            { reviews.length ? reviews.map(r => {
                return (
                    <DescriptionContainer>
                        <PropAndInput>
                            <H3Form margenIzq="0px">{r.user.userName}</H3Form>
                            <div style={{display: "flex", flexDirection: "row", gap: "70px"}}>
                                <ErrorsForm>Score: {r.score}</ErrorsForm>
                                <ErrorsForm>{r.create_date}</ErrorsForm>
                            </div>
                        </PropAndInput>
                        <FormTextArea type="text" value={r.comment} alto="40px"/>
                    </DescriptionContainer>
                )
                
            }) :
            <H3Form margenIzq="0px">The book hasn't users reviews yet</H3Form>
            }
        </>
    )
}