import { Logo } from "./Logo";

type Props = {
  name: string;
  category: string;
  region: string;
  phone?: string;
  handle: string;
  yearsActive?: number;
  verified?: boolean;
  rating?: number;
  totalJobs?: number;
  bio?: string;
  highlights?: string[];
  thumbnails?: string[];
  side?: "front" | "back";
};

const fullUrl = (handle: string) => `https://trustfolio.com/w/${handle}`;
const qrFor = (handle: string, size = 200) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    fullUrl(handle)
  )}&margin=4`;

export function BusinessCard(props: Props) {
  if (props.side === "back") return <CardBack {...props} />;
  return <CardFront {...props} />;
}

function CardFront({
  name,
  category,
  region,
  phone,
  handle,
  yearsActive,
  verified,
  rating,
  totalJobs,
}: Props) {
  return (
    <div
      className="relative aspect-[1.75/1] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-zinc-900"
      style={{
        background:
          "radial-gradient(circle at 85% 15%, rgba(16,185,129,0.18) 0%, transparent 45%), linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 50%, #0a0a0a 100%)",
      }}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute right-5 top-5 flex items-center gap-1.5 text-zinc-400">
        <Logo size={11} />
        <span className="text-[11px] font-semibold tracking-wider">trustfolio</span>
      </div>

      <div className="relative flex h-full p-6 pl-7">
        <div className="flex flex-1 flex-col justify-between pr-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
              {category}
              {yearsActive !== undefined && (
                <>
                  <span className="mx-1.5 text-zinc-600">·</span>
                  {yearsActive}년차
                </>
              )}
            </p>
            <h3 className="mt-2 text-[28px] font-bold leading-none tracking-tight text-white md:text-3xl">
              {name}
            </h3>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.5 5L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z" />
                  </svg>
                  Verified
                </span>
              )}
              {rating !== undefined && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-100 ring-1 ring-inset ring-white/10">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                    <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                  </svg>
                  {rating.toFixed(1)}
                </span>
              )}
              {totalJobs !== undefined && (
                <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-100 ring-1 ring-inset ring-white/10">
                  시공 {totalJobs}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-zinc-300">
            <p className="flex items-center gap-1.5">
              <Pin /> {region}
            </p>
            {phone && (
              <p className="flex items-center gap-1.5">
                <Phone /> {phone}
              </p>
            )}
            <p className="mt-2 font-mono text-[10px] text-zinc-400">
              trustfolio.com/w/{handle}
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-end">
          <div className="rounded-lg bg-white p-1.5 shadow-lg ring-1 ring-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrFor(handle, 220)}
              alt={`${name} QR`}
              className="h-[88px] w-[88px] md:h-[100px] md:w-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({
  name,
  category,
  handle,
  bio,
  highlights,
  thumbnails,
  rating,
  totalJobs,
  yearsActive,
}: Props) {
  return (
    <div className="relative aspect-[1.75/1] w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200">
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />

      <div className="flex h-full flex-col p-6 pr-7">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-900">
            {name} <span className="text-zinc-400">/</span>{" "}
            <span className="text-emerald-600">{category}</span>
          </p>
          <div className="flex items-center gap-1.5 text-zinc-700">
            <Logo size={11} />
            <span className="text-[11px] font-semibold tracking-wider">trustfolio</span>
          </div>
        </div>

        {bio && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-700">
            {bio}
          </p>
        )}

        {(thumbnails?.length ?? 0) > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {thumbnails!.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-md bg-zinc-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {(highlights?.length ?? 0) > 0 && !thumbnails?.length && (
          <ul className="mt-3 flex-1 space-y-1.5">
            {highlights!.slice(0, 3).map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] leading-snug text-zinc-700"
              >
                <svg
                  className="mt-0.5 flex-shrink-0 text-emerald-600"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-3 text-[10px]">
            {rating !== undefined && (
              <Stat value={rating.toFixed(1)} label="평점" />
            )}
            {totalJobs !== undefined && (
              <Stat value={`${totalJobs}`} label="시공" />
            )}
            {yearsActive !== undefined && (
              <Stat value={`${yearsActive}년`} label="경력" />
            )}
          </div>
          <p className="font-mono text-[10px] text-zinc-500">
            trustfolio.com/w/{handle}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-base font-bold leading-none tracking-tight text-zinc-900">
        {value}
      </p>
      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function Pin() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 text-emerald-400"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function Phone() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 text-emerald-400"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
