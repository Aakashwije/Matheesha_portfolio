interface SponsorPackageCardProps {
  name: string;
  price: string;
  perks: string[];
  highlighted?: boolean;
}

export default function SponsorPackageCard({
  name,
  price,
  perks,
  highlighted = false,
}: Readonly<SponsorPackageCardProps>) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 shadow-lg shadow-black/30 ${
        highlighted
          ? "border-yellow-400 bg-yellow-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-yellow-400">
        {price}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <span className="text-yellow-400">●</span>
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
