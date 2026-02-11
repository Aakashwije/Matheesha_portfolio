import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05060b] text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-full border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40">
          <Image
            src="/matheesha_logo.png"
            alt="Matheesha Wijesekara"
            width={160}
            height={160}
            className="animate-logo-pulse h-40 w-40 object-contain"
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
      </div>
    </div>
  );
}
