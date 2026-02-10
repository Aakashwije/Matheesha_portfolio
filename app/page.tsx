import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Podium from "@/components/Podium";
import VideoShowcase from "@/components/VideoShowcase";
import Newspaper from "@/components/Newspaper";

export default function Home() {
  return (
    <div className="bg-[#05060b] text-white">
      <Hero />
      <Stats />
      <Podium />
      <VideoShowcase />
      <Newspaper />
    </div>
  );
}
