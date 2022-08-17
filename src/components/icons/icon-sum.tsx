import React from 'react';

const IconSum: React.FC<React.SVGAttributes<Record<string, unknown>>> = ({className, width}) => {
  return (
    <svg
      className={className}
      width={width}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12H4M12 20V12V20ZM12 12V4V12ZM12 12H20H12Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default IconSum;
