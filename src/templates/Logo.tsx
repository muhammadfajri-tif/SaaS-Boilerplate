import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center gap-2 text-xl font-bold">
    <svg
      className="size-7"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
    >
      {/* Minimalist pen nib icon for blogging */}
      <g>
        {/* Pen body - elegant and simple */}
        <path
          d="M 16 4 L 10 16 L 16 14 L 22 16 Z"
          className="fill-gray-900 dark:fill-gray-100"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pen nib detail */}
        <path
          d="M 14 16 L 16 28 L 18 16"
          className="stroke-gray-900 dark:stroke-gray-100"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Center line detail */}
        <line
          x1="16"
          y1="8"
          x2="16"
          y2="14"
          className="stroke-white dark:stroke-gray-900"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Ink dot at bottom */}
        <circle
          cx="16"
          cy="28"
          r="1.2"
          className="fill-gray-900 dark:fill-gray-100"
        />
      </g>
    </svg>
    {!props.isTextHidden && (
      <span className="text-gray-900 dark:text-gray-100">
        {AppConfig.name}
      </span>
    )}
  </div>
);
