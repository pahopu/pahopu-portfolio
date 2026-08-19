import { cn } from "@/lib/utils";

export const AlbumStar = ({
  size,
  className,
  style,
}: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={cn(
      "absolute pointer-events-none select-none hidden md:block",
      "text-[#FFE566] opacity-60 dark:opacity-[0.22]",
      "animate-float",
      className
    )}
    aria-hidden
    style={style}
  >
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
  </svg>
);
