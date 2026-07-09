import Image from "next/image";

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
};

const toInitials = (name: string) => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || "?";
};

export default function Avatar({ name, src, size = 176, className = "" }: AvatarProps) {
  const initials = toInitials(name);
  const showImage = Boolean(src);

  return (
    <div
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {showImage ? (
        <Image src={src as string} alt={name} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 text-3xl font-semibold text-slate-700 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
          {initials}
        </div>
      )}
    </div>
  );
}

