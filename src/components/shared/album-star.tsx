import { cn } from "@/lib/utils";

// Floating background star — yellow (main) or blue-tinted (dim accent, like hero's small accent stars)
export const AlbumStar = ({
  size,
  className,
  style,
  dim = false,
}: {
  size: number;
  className?: string;
  style?: React.CSSProperties;
  dim?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={cn(
      "absolute pointer-events-none select-none hidden md:block animate-float",
      dim
        ? "text-[#C5D8F5] dark:text-white/60 opacity-50 dark:opacity-[0.28]"
        : "text-[#FFE566] dark:text-[#FFF0B0] opacity-55 dark:opacity-40",
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

// Large decorative star for card watermarks — used as an absolute-positioned corner accent
export const StarDeco = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("pointer-events-none select-none", className)} aria-hidden>
    <path
      d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
      fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"
    />
  </svg>
);
