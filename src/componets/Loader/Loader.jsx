import React, { useEffect, useState } from "react";
import "./loader.css";

function Loader({
    progress = null,
    width = 100,
    height = 100,
    strokeWidth = 10,
}) {
    const [defaultProgress, setDefaultProgress] = useState(0);

    const duration = 100;

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            defaultProgress(defaultProgress + 1);
        }, duration);

        if (progress === 100) {
            defaultProgress(0);
        }

        return () => {
            clearTimeout(loadingTimeout);
        };
    });

    return (
        <div>
            {
                <ProgressBar
                    progress={progress}
                    strokeWidth={strokeWidth}
                    width={width}
                    height={height}
                />
            }
        </div>
    );
}

function ProgressBar({ progress, width, height, strokeWidth }) {
    const radius = Math.min(width, height) / 3;
    const circumference = 2 * Math.PI * radius;

    const size = {
        height: height,
        width: width,
    };

    const cx = size.width / 2;
    const cy = size.height / 2;

    return (
        <svg
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            className="progress-bar"
        >
            {/* stroke circle */}
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="#c4c4c4" // #414050
                strokeWidth={`${strokeWidth}px`} // indicatorWidth instead the 10
                strokeDasharray={circumference}
            />

            {/* progress circle */}
            <circle
                className="progress-circle"
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                transform={`rotate(-90)`}
                stroke="#eabc5d" // #414050
                strokeWidth={`${strokeWidth / 2}px`} // trackWidth instead the 5
                strokeDasharray={`${(progress * circumference) / 100} ${
                    2 * Math.PI * radius
                }`}
            />
        </svg>
    );
}

export default Loader;
