import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Explore from "@/components/sections/Explore";
import Journal from "@/components/sections/Journal";
import Instagram from "@/components/sections/Instagram";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Philosophy />
      <Explore />
      <Journal />
      <div className="h-[140px]" />
      <Instagram />
    </main>
  );
}
