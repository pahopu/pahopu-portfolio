import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5B8FE8",
          borderRadius: "8px",
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
            fill="#C8E645"
            stroke="#C8E645"
            stroke-width="3"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
