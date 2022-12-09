import React from 'react';
import styled from "styled-components";

const NoLessonsTitle = ({children}) => {
    return (
        <Wrapper>{children}</Wrapper>
    );
};

const Wrapper = styled.div`
  font-size: 50px;
  margin-top: 100px;
  user-select: none;
  text-align: center;
  color: #c0c0c0;
  font-weight: bold;
`

export default NoLessonsTitle;