import styled from "styled-components";

export const CarouselContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-top: ${({ pTop }) => pTop};
    padding-bottom: 40px;
`;