import styled from "styled-components";

export const BooksContainer = styled.div`
    margin: 0px;
    padding-top: ${({ paddingTop }) => paddingTop || "70px"};
    padding-right: 20px; 
    padding-left: 270px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Table = styled.table`
    border: 1px solid #ccc;
    border-collapse: collapse;
    .tr, th {
        padding: 5px;
    }
    .tr, th, td {
        border: 1px solid #ccc;
    }
`;




