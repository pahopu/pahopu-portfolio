import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Hero />
      {/* Các phần khác sẽ thêm sau: About, Projects... */}
      {/* <About /> */}
      {/* <Projects /> */}

      {/* Tạm thời để một khoảng trống lớn để test scroll */}
      <div className="h-screen"></div>
    </main>
  );
}
