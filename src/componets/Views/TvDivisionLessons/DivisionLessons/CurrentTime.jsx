import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Time>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Time>
  );
};

export default Clock;

const Time = styled.div`
background-color: #FFE178;
font-family: "inter";
color: black;
font-weight: 400;
font-size: 20px;
padding-left: 10px;
padding-right: 10px;
padding-bottom: 4px;
padding-top: 4px;
border-radius: 20px;
margin-left: 8px;
margin-right: 8px;
max-height: 38.5px;
`;

