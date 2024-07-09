import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";


function CircularLoader(props) {
    const [progress, setProgress] = useState(0);
    const speedInMS = 7;

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(progress <= 100 ? (progress + 1) : (0))
        }, speedInMS);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <CircularProgressbar {...props} styles={buildStyles({
            pathColor: "#eabc5d",
            pathTransitionDuration: 0
        })} value={progress} />
    )
}

export default CircularLoader;