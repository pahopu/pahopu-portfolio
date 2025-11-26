import Image from "next/image";

interface ProjectImageProps {
  id: string;
  title: string;
  image: string;
}

export const ProjectImage = ({ id, title, image }: ProjectImageProps) => {
  /* --- CASE 1: IMAGE LENS --- */
  if (id === "image-lens") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]" />
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

  /* --- CASE 2: ERP SYSTEM --- */
  if (id === "erp") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* SVG Logo: Connected Hexagon */}
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Admin Block (Blue) */}
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

            {/* POS Block (Teal) */}
            <path
              d="M10 28 L50 50 V95 L10 72 V28 Z"
              fill="#14b8a6"
              fillOpacity="0.9"
            />

            {/* CRM Block (Violet) */}
            <path
              d="M90 28 L50 50 V95 L90 72 V28 Z"
              fill="#8b5cf6"
              fillOpacity="0.9"
            />

            {/* Connection Lines */}
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

        <h4 className="mt-4 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-white z-10 uppercase">
          DIVA ERP
        </h4>
        <p className="text-xs text-blue-200/60 tracking-wider z-10 font-medium">
          OMNICHANNEL SYSTEM
        </p>
      </div>
    );
  }

  /* --- CASE 3: MARIO --- */
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br from-red-600 to-orange-600">
      <h4 className="text-xl font-bold tracking-wider drop-shadow-md">
        MARIO BROS 3
      </h4>
    </div>
  );
};
