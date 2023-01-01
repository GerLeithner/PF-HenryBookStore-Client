import React, { useState } from "react";

import { FilterButton, DownfallButton, FilterHead, FilterBody } from "../styles/SortOrFilter";

export default function SortOrFilter({ name, options, onButton }) {

    const [downfall, setDowfall] = useState(false);
    const [active, setActive] = useState(false);

    function handleDownfall(e) {
        e.preventDefault();
        setActive(!active);
        setDowfall(!downfall);
    }

    return(
        <div>
            <FilterHead>
                <span onClick={e => handleDownfall(e)} style={{cursor: "pointer"}}>{name}</span>
                <div style={{
                    transform: `rotate(${active ? "45deg" : "0deg"})`,
                    transition: "300ms ease all"
                }}>
                    <DownfallButton onClick={e => handleDownfall(e)}>+</DownfallButton>
                </div>
            </FilterHead>
            { downfall && 
            <FilterBody>
                { options.map((op, i) => {
                    return (
                        <div key={i}>
                            <FilterButton name={name} onClick={e => onButton(e)}>
                                {op.charAt(0).toUpperCase() + op.slice(1)}
                            </FilterButton>
                        </div>
                        
                    )
                })}
            </FilterBody> }
        </div>
    )
}