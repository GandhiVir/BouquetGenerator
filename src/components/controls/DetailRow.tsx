export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-stone-500">{label}</dt>
      <dd className="font-medium capitalize text-stone-900">{value}</dd>
    </div>
  );
}
