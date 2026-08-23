export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-stone-100">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-stone-500">{label}</p>
    </div>
  );
}
