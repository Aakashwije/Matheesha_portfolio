interface MediaCardProps {
  title: string;
  outlet: string;
  date: string;
  summary: string;
}

export default function MediaCard({
  title,
  outlet,
  date,
  summary,
}: Readonly<MediaCardProps>) {
  return (
  <div className="hover-card reveal-soft h-full rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-yellow-400">
        <span>{outlet}</span>
        <span>{date}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{summary}</p>
    </div>
  );
}
