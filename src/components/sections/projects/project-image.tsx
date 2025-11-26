import Image from "next/image";

interface ProjectImageProps {
  id: string;
  title: string;
  image: string;
}

export const ProjectImage = ({ id, title, image }: ProjectImageProps) => {
  /* --- CASE 1: IMAGE LENS (AI SEARCH) --- */
  if (id === "image-lens") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Logo Image */}
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className="object-contain relative z-10 drop-shadow-md transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    );
  }

  /* --- CASE 2: ERP SYSTEM (ENTERPRISE APP) --- */
  if (id === "erp") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* SVG Logo: Connected Hexagon Architecture */}
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Admin Module (Blue) */}
            <path
              d="M50 5 L90 28 V50 L50 50 L50 5 Z"
              fill="#3b82f6"
              fillOpacity="0.9"
            />
            <path
              d="M50 5 L10 28 V50 L50 50 L50 5 Z"
              fill="#2563eb"
              fillOpacity="0.9"
            />

            {/* POS Module (Teal) */}
            <path
              d="M10 28 L50 50 V95 L10 72 V28 Z"
              fill="#14b8a6"
              fillOpacity="0.9"
            />

            {/* CRM Module (Violet) */}
            <path
              d="M90 28 L50 50 V95 L90 72 V28 Z"
              fill="#8b5cf6"
              fillOpacity="0.9"
            />

            {/* Connection Lines (Integration) */}
            <path
              d="M50 50 L50 5"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
            <path
              d="M50 50 L10 72"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
            <path
              d="M50 50 L90 72"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.2"
            />
          </svg>
        </div>

        {/* Text Overlay */}
        <h4 className="mt-4 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-white z-10 uppercase">
          DIVA ERP
        </h4>
        <p className="text-xs text-blue-200/60 tracking-wider z-10 font-medium">
          OMNICHANNEL SYSTEM
        </p>
      </div>
    );
  }

  /* --- CASE 3: MARIO CLONE (GAME ENGINE / DEBUG VIEW) --- */
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
            {/* Static Geometry: Ground (Dark Blue) */}
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

            {/* Static Geometry: Pipe (Dark Blue) */}
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

            {/* Dynamic Object: Mario Hitbox (Orange - Animated) */}
            <g className="animate-bounce" style={{ animationDuration: "2s" }}>
              {/* AABB Bounding Box */}
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

              {/* Velocity Vector */}
              <path
                d="M55 95 L85 65"
                stroke="#f97316"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />

              {/* Center Pivot */}
              <circle cx="55" cy="95" r="2" fill="#f97316" />
            </g>

            {/* Interactive Object: Question Block (Yellow Dashed) */}
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
        <div className="absolute bottom-4 right-4 text-right z-20">
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

  /* --- DEFAULT CASE: STANDARD IMAGE --- */
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
