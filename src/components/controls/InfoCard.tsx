export function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-stone-100">
      <div className="flex items-center gap-2 text-stone-500">
        {icon}
        <p className="text-sm">{title}</p>
      </div>
      <p className="mt-3 text-xl font-semibold capitalize text-stone-900">
        {value}
      </p>
    </div>
  );
}
