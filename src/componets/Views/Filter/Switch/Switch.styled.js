import styled, { css } from "styled-components";

export const SwitchWrapper = styled.div`
    display: flex;
    height: 45px;
    align-items: center;
    padding: 5px;
    color: #1e1e1e;
    border-radius: 35px;
    font-size: 15px;
    cursor: pointer;
    width: fit-content;
    gap: 20px;

    ${(props) =>
        props.fixed &&
        css`
            @media screen and (max-width: 768px) {
                position: fixed;
                width: 100%;
                max-width: 100%;
                bottom: 0;
                margin: 0;
                left: 0;
                right: 0;
                padding-top: 5px;
                height: 55px;
                border-radius: 15px 15px 0 0;
                background: #fff;
                box-shadow: 0 0 10px 10px #f1f1f1;
                border: none;
                z-index: 100;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
            }
        `}
`;

export const Item = styled.div`
    width: 160px;
    padding: 3px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 99%;
    border-radius: 30px;
    background: #f2f2f2;
    ${(props) =>
        props.active &&
        css`
            color: #4b4b4b;
            font-weight: 500;
            background: #eabc5d;
            padding: 10px;
        `}
`;
