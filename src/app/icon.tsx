import { ImageResponse } from "next/og";

// --- CONFIGURATION ---
// Use Edge Runtime for faster dynamic image generation
export const runtime = "edge";

// Standard favicon dimensions (32x32px)
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// --- ICON GENERATOR ---
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse uses standard CSS-in-JS for styling
      <div
        style={{
          fontSize: 18,
          background: "#0f172a", // Background: Slate-900 (Matches Dark Mode Navbar)
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3b82f6", // Text: Blue-500 (Primary Brand Color)
          borderRadius: "6px", // Soft rounded corners
          fontWeight: 700, // Bold font
        }}
      >
        {/* Symbol: Code brackets representing "Developer" */}
        &lt;/&gt;
      </div>
    ),
    // Apply size configuration
    {
      ...size,
    }
  );
}
