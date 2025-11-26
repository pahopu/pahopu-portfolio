import Image from "next/image";
import { cn } from "@/lib/utils"; // Import cn để xử lý class linh hoạt nếu cần

interface ProjectImageProps {
  id: string;
  title: string;
  image: string;
}

export const ProjectImage = ({ id, title, image }: ProjectImageProps) => {
  /* --- CASE 1: IMAGE LENS (AI / COMPUTER VISION STYLE) --- */
  if (id === "image-lens") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 overflow-hidden group">
        {/* 1. Background: Neural Network Dots */}
        <div
          className="absolute inset-0 opacity-20 
          bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] 
          bg-size-[20px_20px]"
        />

        {/* 2. Central Element: The Scanning Lens */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Viewfinder Corners */}
          <div className="absolute w-48 h-48 border border-cyan-500/30 rounded-lg">
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
          </div>

          {/* SVG: Abstract Eye / Aperture */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform duration-700 group-hover:scale-110"
          >
            {/* Outer Rotating Ring (Scanning) */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#22d3ee"
              strokeWidth="1"
              strokeDasharray="10 5"
              strokeOpacity="0.5"
              className="origin-center animate-[spin_10s_linear_infinite]"
            />

            {/* Inner Hexagon Aperture */}
            <path
              d="M50 20 L76 35 V65 L50 80 L24 65 V35 L50 20 Z"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="#8b5cf6"
              fillOpacity="0.1"
              className="group-hover:fill-cyan-500/10 transition-colors duration-500"
            />

            {/* Central Lens Node */}
            <circle
              cx="50"
              cy="50"
              r="8"
              fill="#22d3ee"
              className="animate-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              stroke="#22d3ee"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </svg>

          {/* Scanning Line Animation */}
          <div className="absolute w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-[scan_2s_ease-in-out_infinite] top-[30%]" />
        </div>

        {/* 3. Tech Badge Overlay */}
        <div className="absolute bottom-4 right-4 text-right z-20 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">
              CV Analysis
            </span>
          </div>
          <div className="text-xs font-bold text-slate-400 flex items-center gap-2 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Xception Model
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 2: ERP SYSTEM (ENTERPRISE ARCHITECTURE) --- */
  if (id === "erp") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 overflow-hidden group">
        {/* 1. Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* 2. Architecture Diagram (Wireframe Style) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg
            width="200"
            height="180"
            viewBox="0 0 200 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
          >
            {/* --- CENTRAL CORE (Shared Logic) --- */}
            {/* Hexagon Outline */}
            <path
              d="M100 60 L135 80 V120 L100 140 L65 120 V80 L100 60 Z"
              stroke="white"
              strokeWidth="1.5"
              fill="#1e293b"
              fillOpacity="0.8"
              className="group-hover:stroke-blue-400 transition-colors"
            />
            {/* Core Icon (Database symbol abstract) */}
            <ellipse
              cx="100"
              cy="100"
              rx="15"
              ry="6"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M85 100 V110 C85 115 115 115 115 110 V100"
              stroke="white"
              strokeWidth="1"
            />

            {/* --- SATELLITE NODES --- */}

            {/* Node 1: Admin (Top) */}
            <g className="animate-[pulse_3s_infinite]">
              <circle
                cx="100"
                cy="30"
                r="16"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="#0f172a"
              />
              <text
                x="100"
                y="34"
                fontSize="10"
                fill="#3b82f6"
                textAnchor="middle"
                fontWeight="bold"
              >
                ADM
              </text>
            </g>
            {/* Connection Line */}
            <line
              x1="100"
              y1="46"
              x2="100"
              y2="60"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Node 2: POS (Bottom Left) */}
            <g
              className="animate-[pulse_3s_infinite]"
              style={{ animationDelay: "1s" }}
            >
              <circle
                cx="40"
                cy="140"
                r="16"
                stroke="#14b8a6"
                strokeWidth="2"
                fill="#0f172a"
              />
              <text
                x="40"
                y="144"
                fontSize="10"
                fill="#14b8a6"
                textAnchor="middle"
                fontWeight="bold"
              >
                POS
              </text>
            </g>
            {/* Connection Line */}
            <line
              x1="53"
              y1="132"
              x2="65"
              y2="120"
              stroke="#14b8a6"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Node 3: CRM (Bottom Right) */}
            <g
              className="animate-[pulse_3s_infinite]"
              style={{ animationDelay: "2s" }}
            >
              <circle
                cx="160"
                cy="140"
                r="16"
                stroke="#8b5cf6"
                strokeWidth="2"
                fill="#0f172a"
              />
              <text
                x="160"
                y="144"
                fontSize="10"
                fill="#8b5cf6"
                textAnchor="middle"
                fontWeight="bold"
              >
                CRM
              </text>
            </g>
            {/* Connection Line */}
            <line
              x1="147"
              y1="132"
              x2="135"
              y2="120"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Data Flow Particles (Optional animation) */}
            <circle
              r="2"
              fill="white"
              className="animate-[ping_2s_linear_infinite]"
            >
              <animateMotion
                path="M100 46 V60"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* 3. Badge Overlay */}
        <div className="absolute bottom-4 right-4 text-right z-20">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            System Architecture
          </div>
          <div className="text-xs font-bold text-slate-400 flex items-center gap-2 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Monorepo Design
          </div>
        </div>
      </div>
    );
  }

  /* --- CASE 3: MARIO CLONE (ENGINE / DEBUG VIEW) --- */
  if (id === "mario") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 overflow-hidden group">
        {/* 1. Background Grid (Coordinate System) */}
        <div
          className="absolute inset-0 opacity-20 
          bg-[linear-gradient(to_right,#3b82f640_1px,transparent_1px),linear-gradient(to_bottom,#3b82f640_1px,transparent_1px)] 
          bg-size-[24px_24px]"
        />

        {/* 2. Abstract Game Elements (Wireframes / Hitboxes) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg
            width="200"
            height="160"
            viewBox="0 0 200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
          >
            {/* Static Geometry: Ground */}
            <rect
              x="0"
              y="130"
              width="200"
              height="30"
              stroke="#334155"
              strokeWidth="2"
              fill="#1e293b"
              fillOpacity="0.5"
            />
            <path
              d="M0 130 L200 130"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4 2"
              strokeOpacity="0.5"
            />

            {/* Static Geometry: Pipe */}
            <rect
              x="140"
              y="90"
              width="40"
              height="40"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="#1e293b"
              fillOpacity="0.8"
            />
            <rect
              x="136"
              y="70"
              width="48"
              height="20"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="#1e293b"
              fillOpacity="0.8"
            />

            {/* Dynamic Object: Mario Hitbox */}
            <g className="animate-bounce" style={{ animationDuration: "2s" }}>
              <rect
                x="40"
                y="80"
                width="30"
                height="30"
                stroke="#f97316"
                strokeWidth="2"
                fill="#f97316"
                fillOpacity="0.1"
              />
              <path
                d="M55 95 L85 65"
                stroke="#f97316"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <circle cx="55" cy="95" r="2" fill="#f97316" />
            </g>

            {/* Interactive Object: Question Block */}
            <rect
              x="80"
              y="40"
              width="30"
              height="30"
              stroke="#eab308"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="transparent"
            />
            <text
              x="89"
              y="62"
              fill="#eab308"
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ?
            </text>

            {/* SVG Definitions */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* 3. Tech Badge Overlay */}
        <div className="absolute bottom-4 right-4 text-right z-20 flex flex-col items-end gap-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Engine Preview
          </div>
          <div className="text-xs font-bold text-slate-400 flex items-center gap-2 justify-end">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            DirectX 10
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
