import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05060b] text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/40">
          <Image
            src="/matheesha_logo.png?v=4"
            alt="Matheesha Wijesekara"
            width={200}
            height={200}
            className="animate-logo-pulse h-48 w-48 object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-yellow-400">
          Loading
          <span className="flex items-center gap-1">
            <span className="animate-dot h-2 w-2 rounded-full bg-yellow-400" />
            <span className="animate-dot animate-dot-delay-1 h-2 w-2 rounded-full bg-yellow-400" />
            <span className="animate-dot animate-dot-delay-2 h-2 w-2 rounded-full bg-yellow-400" />
          </span>
        </div>
        <p className="text-center text-sm text-slate-300">
          Proud alumnus of Royal College, Colombo 7
        </p>
      </div>
    </div>
  );
}
