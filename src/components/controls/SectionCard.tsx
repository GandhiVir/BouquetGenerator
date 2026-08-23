export function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-xl bg-rose-50 p-2 text-rose-500">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
