import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "pahopu - Software Engineer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #1e293b 0%, transparent 50%)",
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1e293b",
              borderRadius: "50px",
              padding: "10px 25px",
              marginBottom: "40px",
              border: "1px solid #334155",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              style={{
                color: "#38bdf8",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              PORTFOLIO 2025
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              marginBottom: "20px",
              textShadow: "0 0 40px rgba(56, 189, 248, 0.3)",
            }}
          >
            pahopu
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#94a3b8",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Software Engineer & Front-End Specialist
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "50px",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {[
              "Next.js 15",
              "TypeScript",
              "Tailwind v4",
              "System Architecture",
            ].map((tech, i) => (
              <div
                key={i}
                style={{
                  color: "#64748b",
                  fontSize: 20,
                  fontWeight: 600,
                  border: "1px solid #334155",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
