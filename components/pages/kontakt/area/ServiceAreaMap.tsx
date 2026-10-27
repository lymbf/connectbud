import type { Place } from "@/model/data/serviceArea";
import { cn } from "@/utils/cn";

type ServiceAreaMapProps = {
  center: Place;
  places: Place[];
  rings: number[];
  river: [number, number][];
  label: string;
  centerLabel: string;
  ringUnit: string;
  riverLabel: string;
  className?: string;
};

// układ współrzędnych rysunku: kwadrat 1000 × 1000, środek mapy (Warszawa) w punkcie 500, 500
const SIZE = 1000;
const MID = SIZE / 2;
const KM_PER_DEG_LAT = 111.2;

/** Rzut uproszczony: odległości w km od środka, przeliczone na punkty rysunku (wystarczająco dokładny dla ~70 km) */
function projector(center: Place, maxKm: number) {
  const kmPerDegLng = KM_PER_DEG_LAT * Math.cos((center.lat * Math.PI) / 180);
  const scale = (SIZE * 0.44) / maxKm;
  return (lat: number, lng: number) => ({
    x: MID + (lng - center.lng) * kmPerDegLng * scale,
    y: MID - (lat - center.lat) * KM_PER_DEG_LAT * scale,
    scale,
  });
}

/** Położenie w procentach – do podpisów w HTML (stały rozmiar tekstu niezależnie od wielkości mapy) */
const pct = (value: number) => `${(value / SIZE) * 100}%`;

/**
 * Schematyczna mapa obszaru działania: koła co 25 km, bieg Wisły, Warszawa i przykładowe miejscowości.
 * Bez zewnętrznych map (żadnych ciasteczek ani skryptów Google) – sam rysunek SVG.
 */
export function ServiceAreaMap({
  center,
  places,
  rings,
  river,
  label,
  centerLabel,
  ringUnit,
  riverLabel,
  className,
}: ServiceAreaMapProps) {
  const maxKm = Math.max(...rings);
  const project = projector(center, maxKm);
  const { scale } = project(center.lat, center.lng);

  const riverPoints = river.map(([lat, lng]) => project(lat, lng));
  const riverPath = riverPoints.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const riverLabelPoint = project(51.93, 21.27);

  return (
    <figure role="img" aria-label={label} className={cn("relative aspect-square w-full select-none", className)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <clipPath id="obszar-dzialania-kolo">
            <circle cx={MID} cy={MID} r={maxKm * scale} />
          </clipPath>
        </defs>
        {/* obszar działania */}
        <circle cx={MID} cy={MID} r={maxKm * scale} className="fill-accent/25 stroke-steel/60" strokeWidth={2} />
        {rings.slice(0, -1).map((km) => (
          <circle
            key={km}
            cx={MID}
            cy={MID}
            r={km * scale}
            fill="none"
            className="stroke-white/20"
            strokeWidth={1.5}
            strokeDasharray="6 10"
          />
        ))}
        {/* osie północ–południe i wschód–zachód */}
        <line x1={MID} y1={MID - maxKm * scale - 30} x2={MID} y2={MID + maxKm * scale + 30} className="stroke-white/10" strokeWidth={1.5} />
        <line x1={MID - maxKm * scale - 30} y1={MID} x2={MID + maxKm * scale + 30} y2={MID} className="stroke-white/10" strokeWidth={1.5} />

        <path
          d={riverPath}
          fill="none"
          clipPath="url(#obszar-dzialania-kolo)"
          className="stroke-steel/45"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {places.map((place) => {
          const point = project(place.lat, place.lng);
          return <circle key={place.name} cx={point.x} cy={point.y} r={6} className="fill-steel" />;
        })}

        <circle cx={MID} cy={MID} r={22} className="fill-white/15" />
        <circle cx={MID} cy={MID} r={10} className="fill-white" />
      </svg>

      {/* podpisy */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-[0.6875rem] leading-none sm:text-xs">
        <span className="absolute -translate-x-1/2 font-semibold tracking-[0.2em] text-steel" style={{ left: "50%", top: pct(MID - maxKm * scale - 52) }}>
          N
        </span>

        {rings.map((km) => (
          <span
            key={km}
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-dark px-1.5 py-0.5 text-[0.625rem] font-semibold text-steel tabular-nums sm:text-[0.6875rem]"
            // podpisy kół na osi północ–południe, poniżej środka
            style={{ left: "50%", top: pct(MID + km * scale) }}
          >
            {km} {ringUnit}
          </span>
        ))}

        <span
          className="absolute -translate-y-1/2 font-heading text-[0.75rem] text-steel/80 italic sm:text-[0.8125rem]"
          style={{ left: pct(riverLabelPoint.x + 18), top: pct(riverLabelPoint.y) }}
        >
          {riverLabel}
        </span>

        {places.map((place) => {
          const point = project(place.lat, place.lng);
          const onLeft = place.labelSide === "left";
          return (
            <span
              key={place.name}
              className={cn(
                "absolute -translate-y-1/2 whitespace-nowrap text-white/75",
                onLeft ? "-translate-x-full pr-2.5" : "pl-2.5",
                place.minor && "hidden sm:block",
              )}
              style={{ left: pct(point.x), top: pct(point.y) }}
            >
              {place.name}
            </span>
          );
        })}

        <span
          className="absolute -translate-x-1/2 -translate-y-full bg-dark/80 px-1.5 py-0.5 font-heading text-sm font-semibold text-white sm:text-base"
          style={{ left: "50%", top: pct(MID - 30) }}
        >
          {centerLabel}
        </span>
      </div>
    </figure>
  );
}
