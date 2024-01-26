export const CornerDownLeft: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clip-path="url(#clip0_2319_784)">
      <path
        d="M7 8L2 13L7 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 2V9C18 10.0609 17.5786 11.0783 16.8284 11.8284C16.0783 12.5786 15.0609 13 14 13H2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2319_784">
        <rect width="20" height="20" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);

export const Share: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5.33594 16V26.6667C5.33594 27.3739 5.61689 28.0522 6.11699 28.5523C6.61708 29.0524 7.29536 29.3333 8.0026 29.3333H24.0026C24.7098 29.3333 25.3881 29.0524 25.8882 28.5523C26.3883 28.0522 26.6693 27.3739 26.6693 26.6667V16"
      strokeWidth="3"
      stroke-color="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3268 7.99837L15.9935 2.66504L10.6602 7.99837"
      strokeWidth="3"
      stroke-color="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2.66504V19.9984"
      strokeWidth="3"
      stroke-color="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.1413 16.7695L5.09346 8.31215C4.65924 7.79109 5.02976 7 5.70803 7L18.9586 7C19.6369 7 20.0074 7.79108 19.5732 8.31215L12.5254 16.7695C12.4254 16.8895 12.2412 16.8895 12.1413 16.7695Z"
      fill="currentColor"
    />
  </svg>
);
