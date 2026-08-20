import Image from "next/image";

interface ProjectImageProps {
  id: string;
  title: string;
  image: string;
}

export const ProjectImage = ({ id, title, image }: ProjectImageProps) => {
  /* --- CASE 1: IMAGE LENS (AI / COMPUTER VISION) --- */
  if (id === "image-lens") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden group"
        style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #2A4A9A 50%, #5B8FE8 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(rgba(197,216,245,1)_1px,transparent_1px)] bg-size-[22px_22px]" />
        <div className="absolute w-44 h-44 rounded-full blur-3xl bg-[#FFE566]/6 pointer-events-none" />

        <svg
          width="170" height="145" viewBox="0 0 170 145" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-700 group-hover:scale-105"
        >
          {/* Eye lids */}
          <path
            d="M12 72 C46 22 124 22 158 72 C124 122 46 122 12 72 Z"
            stroke="#C5D8F5" strokeWidth="1.5" fill="rgba(197,216,245,0.04)" strokeOpacity="0.35"
          />
          {/* Iris outer ring */}
          <circle cx="85" cy="72" r="30" stroke="#7BAEF0" strokeWidth="1.5"
            fill="rgba(91,143,232,0.08)"
            className="group-hover:stroke-[#5B8FE8] transition-colors duration-500"
          />
          {/* Iris radial lines */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={85 + 20 * Math.cos(r)} y1={72 + 20 * Math.sin(r)}
                x2={85 + 30 * Math.cos(r)} y2={72 + 30 * Math.sin(r)}
                stroke="#7BAEF0" strokeWidth="0.7" strokeOpacity="0.35"
              />
            );
          })}
          {/* Iris inner ring */}
          <circle cx="85" cy="72" r="20" stroke="#C8E645" strokeWidth="1.5"
            fill="rgba(200,230,69,0.05)"
          />
          {/* Pupil */}
          <circle cx="85" cy="72" r="10" fill="#0D1B4B" />
          {/* Star in pupil */}
          <path
            d="M85 65.5L86.7 70.7H92.1L87.7 73.8L89.4 79L85 75.9L80.6 79L82.3 73.8L77.9 70.7H83.3Z"
            fill="#FFE566"
          />
          {/* Outer slow-spin dashed ring */}
          <circle
            cx="85" cy="72" r="43"
            stroke="#FFE566" strokeWidth="0.8"
            strokeDasharray="7 12" strokeOpacity="0.2"
            style={{ transformOrigin: "85px 72px", animation: "spin 20s linear infinite" }}
          />
          {/* Highlight reflection */}
          <ellipse cx="72" cy="60" rx="5" ry="3" fill="white" fillOpacity="0.12" />
        </svg>

        <div className="absolute bottom-3 right-4 text-right z-10">
          <div className="text-[10px] font-mono text-[#C5D8F5]/55 uppercase tracking-widest">Computer Vision</div>
          <div className="text-xs font-bold text-white/65 flex items-center gap-1.5 justify-end mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E645] animate-pulse" />
            Xception Model
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 2: ERP SYSTEM (CONSTELLATION OF MODULES) --- */
  if (id === "erp") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1B2E6E] overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,rgba(200,230,69,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,230,69,0.2)_1px,transparent_1px)] bg-size-[28px_28px]" />

        <svg
          width="200" height="178" viewBox="0 0 200 178" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Dashed bezier connections */}
          <path d="M100 92 C100 72 100 52 100 36" stroke="#C8E645" strokeWidth="1" strokeDasharray="4 5" strokeOpacity="0.35" />
          <path d="M100 92 C78 102 56 122 44 145" stroke="#FFE566" strokeWidth="1" strokeDasharray="4 5" strokeOpacity="0.35" />
          <path d="M100 92 C122 102 144 122 156 145" stroke="#F5B8CC" strokeWidth="1" strokeDasharray="4 5" strokeOpacity="0.35" />

          {/* Center core glow ring */}
          <circle cx="100" cy="92" r="30" fill="none" stroke="#C8E645" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="100" cy="92" r="22" fill="#1B2E6E" stroke="#C8E645" strokeWidth="1.5" />
          {/* Core icon: stacked lines = monorepo */}
          <rect x="92" y="85" width="16" height="2.5" rx="1.25" fill="#C8E645" />
          <rect x="92" y="90.5" width="16" height="2.5" rx="1.25" fill="#C8E645" />
          <rect x="92" y="96" width="16" height="2.5" rx="1.25" fill="#C8E645" />

          {/* ADM node — top, float */}
          <g className="animate-float" style={{ animationDuration: "3.5s" }}>
            <circle cx="100" cy="26" r="16" fill="none" stroke="#C8E645" strokeWidth="0.5" strokeOpacity="0.2" />
            <circle cx="100" cy="26" r="13" fill="#1B2E6E" stroke="#C8E645" strokeWidth="1.5" />
            <text x="100" y="30" fontSize="8" fill="#C8E645" textAnchor="middle" fontWeight="bold" letterSpacing="0.3">ADM</text>
          </g>

          {/* POS node — bottom-left, float */}
          <g className="animate-float" style={{ animationDuration: "4.2s", animationDelay: "1s" }}>
            <circle cx="40" cy="152" r="16" fill="none" stroke="#FFE566" strokeWidth="0.5" strokeOpacity="0.2" />
            <circle cx="40" cy="152" r="13" fill="#1B2E6E" stroke="#FFE566" strokeWidth="1.5" />
            <text x="40" y="156" fontSize="8" fill="#FFE566" textAnchor="middle" fontWeight="bold" letterSpacing="0.3">POS</text>
          </g>

          {/* CRM node — bottom-right, float */}
          <g className="animate-float" style={{ animationDuration: "3.8s", animationDelay: "0.6s" }}>
            <circle cx="160" cy="152" r="16" fill="none" stroke="#F5B8CC" strokeWidth="0.5" strokeOpacity="0.2" />
            <circle cx="160" cy="152" r="13" fill="#1B2E6E" stroke="#F5B8CC" strokeWidth="1.5" />
            <text x="160" y="156" fontSize="8" fill="#F5B8CC" textAnchor="middle" fontWeight="bold" letterSpacing="0.3">CRM</text>
          </g>

          {/* Traveling particle */}
          <circle r="2" fill="#C8E645" opacity="0.7">
            <animateMotion path="M100 92 C100 72 100 52 100 36" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>

        <div className="absolute bottom-3 right-4 text-right z-10">
          <div className="text-[10px] font-mono text-[#C5D8F5]/55 uppercase tracking-widest">System Architecture</div>
          <div className="text-xs font-bold text-[#C5D8F5]/75 flex items-center gap-1.5 justify-end mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E645]" />Monorepo Design
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 3: MARIO CLONE (SOFT GAME WORLD) --- */
  if (id === "mario") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden group"
        style={{ background: "linear-gradient(180deg, #7BAEF0 0%, #5B8FE8 50%, #4A7FD4 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(white_2px,transparent_2px)] bg-size-[32px_32px]" />

        <svg
          width="200" height="160" viewBox="0 0 200 160" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* Background cloud L */}
          <ellipse cx="42" cy="44" rx="30" ry="14" fill="white" fillOpacity="0.14" />
          <ellipse cx="28" cy="39" rx="17" ry="12" fill="white" fillOpacity="0.14" />
          <ellipse cx="55" cy="39" rx="18" ry="11" fill="white" fillOpacity="0.14" />

          {/* Background cloud R */}
          <ellipse cx="155" cy="34" rx="24" ry="11" fill="white" fillOpacity="0.10" />
          <ellipse cx="142" cy="30" rx="14" ry="10" fill="white" fillOpacity="0.10" />
          <ellipse cx="167" cy="30" rx="15" ry="9" fill="white" fillOpacity="0.10" />

          {/* Stars */}
          <path d="M162 66 L163.3 70L167.5 70L164.2 72.5L165.5 76.5L162 74L158.5 76.5L159.8 72.5L156.5 70L160.7 70Z"
            fill="#FFE566" fillOpacity="0.7" />
          <path d="M26 77 L27 80.5L30.8 80.5L27.8 82.7L28.8 86.2L26 84.2L23.2 86.2L24.2 82.7L21.2 80.5L25 80.5Z"
            fill="#FFE566" fillOpacity="0.55" />

          {/* Ground */}
          <rect x="0" y="130" width="200" height="30" fill="#FFE566" fillOpacity="0.2" />
          <rect x="0" y="130" width="200" height="2.5" fill="#FFE566" fillOpacity="0.35" />

          {/* Floating platform */}
          <g className="animate-float" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>
            <rect x="112" y="82" width="54" height="11" rx="5.5"
              fill="#FFE566" fillOpacity="0.22" stroke="#FFE566" strokeWidth="1" strokeOpacity="0.45" />
          </g>

          {/* Question block */}
          <g className="animate-float" style={{ animationDuration: "2.8s", animationDelay: "1s" }}>
            <rect x="76" y="50" width="26" height="26" rx="6"
              fill="#FFE566" fillOpacity="0.2" stroke="#FFE566" strokeWidth="1.5" strokeOpacity="0.55" />
            <text x="89" y="68" fill="#FFE566" fontSize="14" fontFamily="monospace"
              fontWeight="bold" textAnchor="middle" fillOpacity="0.75">?</text>
          </g>

          {/* Mario silhouette — bouncing */}
          <g className="animate-bounce" style={{ animationDuration: "2.5s" }}>
            {/* Hat */}
            <rect x="28" y="83" width="20" height="7" rx="3" fill="#1B2E6E" fillOpacity="0.75" />
            {/* Head */}
            <rect x="30" y="88" width="16" height="13" rx="4" fill="#FF8C42" fillOpacity="0.85" />
            {/* Eye */}
            <circle cx="34" cy="93" r="1.5" fill="#1B2E6E" />
            {/* Body */}
            <rect x="28" y="100" width="20" height="15" rx="3" fill="#FF8C42" fillOpacity="0.85" />
            {/* Overalls */}
            <rect x="30" y="104" width="6" height="9" rx="1.5" fill="#5B8FE8" fillOpacity="0.9" />
            <rect x="40" y="104" width="6" height="9" rx="1.5" fill="#5B8FE8" fillOpacity="0.9" />
          </g>
        </svg>

        <div className="absolute bottom-3 right-4 text-right z-10">
          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Game Engine</div>
          <div className="text-xs font-bold text-white/70 flex items-center gap-1.5 justify-end mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#FF8C42] animate-pulse" />DirectX 10
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 4: CARELINK (HEALTHCARE NETWORK + HEARTBEAT) --- */
  if (id === "carelink") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden group"
        style={{ background: "linear-gradient(135deg, #1B2E6E 0%, #3A6BC8 60%, #5B8FE8 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(197,216,245,1)_1px,transparent_1px)] bg-size-[24px_24px]" />

        <svg
          width="200" height="170" viewBox="0 0 200 170" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          {/* EKG / heartbeat line */}
          <path
            d="M10 85 L36 85 L44 62 L52 106 L60 72 L68 92 L76 85 L192 85"
            stroke="#FFE566" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            fill="none" strokeOpacity="0.65"
            className="animate-pulse" style={{ animationDuration: "2s" }}
          />

          {/* Connection arcs */}
          <path d="M62 40 Q100 16 138 40" stroke="#C5D8F5" strokeWidth="1" strokeDasharray="4 5"
            fill="none" strokeOpacity="0.35" />
          <path d="M62 40 Q55 90 72 132" stroke="#C5D8F5" strokeWidth="1" strokeDasharray="4 5"
            fill="none" strokeOpacity="0.35" />
          <path d="M138 40 Q145 90 128 132" stroke="#C5D8F5" strokeWidth="1" strokeDasharray="4 5"
            fill="none" strokeOpacity="0.35" />

          {/* Admin node */}
          <g className="animate-float" style={{ animationDuration: "3.5s" }}>
            <circle cx="62" cy="35" r="18" fill="none" stroke="#C8E645" strokeWidth="0.5" strokeOpacity="0.18" />
            <circle cx="62" cy="35" r="14" fill="#1B2E6E" stroke="#C8E645" strokeWidth="1.5" />
            <text x="62" y="39.5" fontSize="7.5" fill="#C8E645" textAnchor="middle" fontWeight="bold">Admin</text>
          </g>

          {/* Doctor node */}
          <g className="animate-float" style={{ animationDuration: "4s", animationDelay: "0.7s" }}>
            <circle cx="138" cy="35" r="18" fill="none" stroke="#FFE566" strokeWidth="0.5" strokeOpacity="0.18" />
            <circle cx="138" cy="35" r="14" fill="#1B2E6E" stroke="#FFE566" strokeWidth="1.5" />
            <text x="138" y="39.5" fontSize="7.5" fill="#FFE566" textAnchor="middle" fontWeight="bold">Doctor</text>
          </g>

          {/* Provider node */}
          <g className="animate-float" style={{ animationDuration: "3.2s", animationDelay: "1.3s" }}>
            <circle cx="100" cy="140" r="18" fill="none" stroke="#F5B8CC" strokeWidth="0.5" strokeOpacity="0.18" />
            <circle cx="100" cy="140" r="14" fill="#1B2E6E" stroke="#F5B8CC" strokeWidth="1.5" />
            <text x="100" y="144.5" fontSize="6.5" fill="#F5B8CC" textAnchor="middle" fontWeight="bold">Provider</text>
          </g>
        </svg>

        <div className="absolute bottom-3 right-4 text-right z-10">
          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Healthcare</div>
          <div className="text-xs font-bold text-white/70 flex items-center gap-1.5 justify-end mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B8CC] animate-pulse" />Vue 3
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 5: UNI-VOICE (SIGNAL RIPPLES / HAZARD MAP) --- */
  if (id === "uni-voice") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1B2E6E] overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(200,230,69,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,230,69,0.3)_1px,transparent_1px)] bg-size-[28px_28px]" />

        {/* Expanding ripple rings */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#C8E645]/25"
            style={{
              width: "72px", height: "72px",
              animation: "ripple-out 3s ease-out infinite",
              animationDelay: `${i * 0.75}s`,
            }}
          />
        ))}

        {/* Center glow */}
        <div className="absolute w-20 h-20 rounded-full bg-[#C8E645]/6 blur-2xl pointer-events-none" />

        <svg
          width="180" height="160" viewBox="0 0 180 160" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-500 group-hover:scale-105"
        >
          {/* Static reference rings */}
          <circle cx="90" cy="80" r="58" stroke="#C8E645" strokeWidth="0.8"
            strokeDasharray="5 9" strokeOpacity="0.18" />
          <circle cx="90" cy="80" r="36" stroke="#C8E645" strokeWidth="0.8" strokeOpacity="0.13" />

          {/* Map pin */}
          <path
            d="M90 48 C79 48 70 57 70 68 C70 82 90 97 90 97 C90 97 110 82 110 68 C110 57 101 48 90 48 Z"
            fill="#C8E645" fillOpacity="0.18" stroke="#C8E645" strokeWidth="1.5"
          />
          <circle cx="90" cy="67" r="7" fill="#C8E645" />

          {/* Signal dots */}
          <circle cx="52" cy="55" r="3" fill="#FFE566" opacity="0.7"
            className="animate-pulse" style={{ animationDelay: "0.3s" }} />
          <circle cx="130" cy="64" r="2.5" fill="#F5B8CC" opacity="0.7"
            className="animate-pulse" style={{ animationDelay: "0.9s" }} />
          <circle cx="62" cy="112" r="2" fill="#FFE566" opacity="0.6"
            className="animate-pulse" style={{ animationDelay: "1.4s" }} />
          <circle cx="122" cy="108" r="2.5" fill="#C8E645" opacity="0.5"
            className="animate-pulse" style={{ animationDelay: "0.6s" }} />
        </svg>

        <div className="absolute bottom-3 right-4 text-right z-10">
          <div className="text-[10px] font-mono text-white/45 uppercase tracking-widest">Disaster Response</div>
          <div className="text-xs font-bold text-[#C8E645]/70 flex items-center gap-1.5 justify-end mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E645]" />AWS
          </div>
        </div>
      </div>
    );
  }

  /* --- DEFAULT CASE --- */
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
};
