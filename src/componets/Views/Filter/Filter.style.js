import styled, {css} from "styled-components";

export const FilterWrapper = styled.div`
    max-width: 100%;
    position: relative;
    min-height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 1100px) {
        border: none;
        min-height: calc(100vh - 55px);
        margin-top: 20px;
        padding: 0 0 100px;
    }
`

export const BlockInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    font-size: 18px;
    color: rgb(102, 102, 102);

    @media screen and (max-width: 768px) {
        position: relative;
        justify-content: center;
    }
`

export const Date = styled.span`
    margin-right: 20px;
    font-size: 15px;
    margin-top: 7px;
    display: ${props => !props.mobile ? 'block' : 'none'};

    @media screen and (max-width: 768px) {
        display: ${props => props.mobile ? 'block' : 'none'};
        font-size: 13px;
    }
`

export const ShowAllGroupsBtn = styled.div`
    padding: 5px 20px;
    border-radius: 10px;
    color: #9b9b9b;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid #cbcbcb;
    width: fit-content;
    text-align: center;
    transition: 0.2s;

    ${props => props.active && css`
        background: #8a8a8a;
        border: 1px solid #8a8a8a;
        color: white;
    `}
    &:hover {
        background: #8a8a8a;
        border: 1px solid #8a8a8a;
        color: white;
    }
`