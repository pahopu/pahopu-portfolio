import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "pahopu — Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#040D21",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: "absolute", top: -120, right: -80,
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,143,232,0.18) 0%, transparent 65%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: 160,
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,230,69,0.10) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Moon */}
        <div style={{ position: "absolute", top: 52, right: 240, display: "flex" }}>
          <svg viewBox="0 0 100 100" width="90" height="90">
            <circle cx="50" cy="50" r="38" fill="#FFE566" opacity="0.88" />
            <circle cx="67" cy="37" r="31" fill="#040D21" />
          </svg>
        </div>

        {/* Star decorations */}
        <svg style={{ position: "absolute", top: 44, right: 120 }} viewBox="0 0 24 24" width="44" height="44">
          <path d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
            fill="#FFE566" stroke="#FFE566" strokeWidth="2.5" strokeLinejoin="round" opacity="0.65" />
        </svg>
        <svg style={{ position: "absolute", top: 180, right: 80 }} viewBox="0 0 24 24" width="26" height="26">
          <path d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
            fill="#C8E645" stroke="#C8E645" strokeWidth="2.5" strokeLinejoin="round" opacity="0.55" />
        </svg>
        <svg style={{ position: "absolute", bottom: 140, right: 160 }} viewBox="0 0 24 24" width="34" height="34">
          <path d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
            fill="#5B8FE8" stroke="#5B8FE8" strokeWidth="2.5" strokeLinejoin="round" opacity="0.45" />
        </svg>
        <svg style={{ position: "absolute", top: 290, right: 340 }} viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
            fill="#F5B8CC" stroke="#F5B8CC" strokeWidth="2.5" strokeLinejoin="round" opacity="0.4" />
        </svg>

        {/* Main content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          flex: 1,
        }}>
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
            <div style={{
              width: "54px", height: "54px", borderRadius: "50%",
              background: "#1B2E6E",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 2px rgba(91,143,232,0.3)",
            }}>
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M12 2L14.39 8.26L21 9.27L16.5 13.97L17.78 21L12 17.77L6.22 21L7.5 13.97L3 9.27L9.61 8.26Z"
                  fill="#FFE566" stroke="#FFE566" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: "#ffffff", fontSize: 34, fontWeight: 800, letterSpacing: "-0.5px" }}>
              pahopu
            </span>
          </div>

          {/* Main headline */}
          <div style={{
            color: "#ffffff",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "28px",
            display: "flex",
            flexDirection: "column",
          }}>
            <span>Front-End</span>
            <span style={{ color: "#C8E645" }}>Developer</span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
            <div style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "99px", padding: "8px 22px",
              color: "rgba(255,255,255,0.72)", fontSize: 20, display: "flex",
            }}>Vue 3 &amp; React</div>
            <div style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "99px", padding: "8px 22px",
              color: "rgba(255,255,255,0.72)", fontSize: 20, display: "flex",
            }}>2+ Years</div>
            <div style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "99px", padding: "8px 22px",
              color: "rgba(255,255,255,0.72)", fontSize: 20, display: "flex",
            }}>ERP &amp; Healthcare</div>
          </div>

          {/* Status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "rgba(200,230,69,0.10)",
            border: "1px solid rgba(200,230,69,0.30)",
            borderRadius: "99px",
            padding: "10px 24px",
            alignSelf: "flex-start",
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C8E645", display: "flex" }} />
            <span style={{ color: "#C8E645", fontSize: 20, fontWeight: 600 }}>
              Currently employed · Open to connect
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
