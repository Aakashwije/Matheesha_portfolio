interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: Readonly<StatCardProps>) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/30 backdrop-blur">
      <p className="text-3xl font-semibold text-yellow-400 md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
    </div>
  );
}
