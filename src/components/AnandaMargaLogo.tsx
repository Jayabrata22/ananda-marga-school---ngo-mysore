import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AnandaMargaLogo: React.FC<LogoProps> = ({ className = 'w-10 h-10', size }) => {
  let dimensionsClass = className;
  if (size === 'sm') dimensionsClass = 'w-8 h-8';
  if (size === 'md') dimensionsClass = 'w-12 h-12';
  if (size === 'lg') dimensionsClass = 'w-16 h-16';
  if (size === 'xl') dimensionsClass = 'w-24 h-24';

  return (
    <svg
      viewBox="0 0 300 300"
      className={`${dimensionsClass} shrink-0 drop-shadow-xs transition-transform hover:scale-105`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Top Arc for ANANDA MARGA WELFARE SOCIETY */}
        <path
          id="amwsTopArc"
          d="M 36, 150 A 114, 114 0 1, 1 264, 150"
          fill="none"
        />
        {/* Outer Bottom Arc for SA'VIDYA YA' VIMUKTA YE */}
        <path
          id="amwsBottomArc"
          d="M 264, 150 A 114, 114 0 0, 1 36, 150"
          fill="none"
        />
      </defs>

      {/* Outer Red Ring */}
      <circle cx="150" cy="150" r="146" fill="none" stroke="#D90000" strokeWidth="4" />

      {/* Main Royal Blue Ring */}
      <circle cx="150" cy="150" r="122" fill="none" stroke="#0022C8" strokeWidth="44" />

      {/* Inner Red Ring */}
      <circle cx="150" cy="150" r="100" fill="#FFFFFF" stroke="#D90000" strokeWidth="3" />

      {/* Top Curved Text */}
      <text fill="#FFFFFF" fontSize="18.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="1px">
        <textPath href="#amwsTopArc" startOffset="50%" textAnchor="middle">
          ANANDA MARGA WELFARE SOCIETY
        </textPath>
      </text>

      {/* Bottom Curved Text */}
      <text fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.8px">
        <textPath href="#amwsBottomArc" startOffset="50%" textAnchor="middle">
          • SA'VIDYA YA' VIMUKTA YE •
        </textPath>
      </text>

      {/* Inner Blue Triangle */}
      <polygon
        points="150, 52  62, 204  238, 204"
        fill="none"
        stroke="#0022C8"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Text Inside Triangle (Top: ERAWS) */}
      <text
        x="150"
        y="110"
        fill="#0022C8"
        fontSize="24"
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
        letterSpacing="1px"
      >
        ERAWS
      </text>

      {/* Red Pratika / Swastika Symbol */}
      <g stroke="#D90000" strokeWidth="8" strokeLinecap="square" fill="none">
        {/* Vertical stem */}
        <line x1="150" y1="128" x2="150" y2="172" />
        {/* Horizontal stem */}
        <line x1="128" y1="150" x2="172" y2="150" />
        {/* Top arm going right */}
        <line x1="150" y1="128" x2="170" y2="128" />
        {/* Right arm going down */}
        <line x1="172" y1="150" x2="172" y2="170" />
        {/* Bottom arm going left */}
        <line x1="150" y1="172" x2="130" y2="172" />
        {/* Left arm going up */}
        <line x1="128" y1="150" x2="128" y2="130" />
      </g>

      {/* Text Inside Triangle (Bottom: ANANDA MARGA) */}
      <text
        x="150"
        y="194"
        fill="#0022C8"
        fontSize="17"
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
        letterSpacing="0.5px"
      >
        ANANDA MARGA
      </text>
    </svg>
  );
};
