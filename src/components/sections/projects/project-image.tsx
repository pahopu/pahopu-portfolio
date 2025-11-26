import Image from "next/image";

interface ProjectImageProps {
  id: string;
  title: string;
  image: string;
}

export const ProjectImage = ({ id, title, image }: ProjectImageProps) => {
  /* --- IMAGE LENS (Real Logo) --- */
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

  /* --- ERP SYSTEM (Abstract Gradient) --- */
  if (id === "erp") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br from-blue-900 to-slate-900">
        <div className="grid grid-cols-2 gap-2 opacity-50 rotate-12 scale-150 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125 mb-4">
          <div className="w-12 h-8 bg-white/20 rounded" />
          <div className="w-12 h-8 bg-white/20 rounded" />
          <div className="w-26 h-16 bg-white/20 rounded col-span-2" />
        </div>
        <h4 className="text-xl font-bold tracking-wider opacity-90">DVA ERP</h4>
      </div>
    );
  }

  /* --- MARIO (Game Gradient) --- */
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br from-red-600 to-orange-600">
      <h4 className="text-xl font-bold tracking-wider drop-shadow-md">
        MARIO BROS 3
      </h4>
    </div>
  );
};
