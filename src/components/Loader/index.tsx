import React from 'react';
import './style.scss';

function Loader() {
  return (
    <svg className="mainLoader">
      <g>
        <path d="M 25,50 A 1,1 0 0 1 25,0" />
      </g>
      <g>
        <path d="M 25,50 A 1,1 0 0 0 25,0" />
      </g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-stop1)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-stop2)" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Loader;
