/*
 * Obszar działania – dane do schematycznej mapy na podstronie Kontakt.
 * Współrzędne są przybliżone (centra miejscowości); mapa przelicza je na odległość od centrum Warszawy.
 * Miejscowość z `minor: true` ma podpis tylko na większych ekranach (żeby podpisy się nie nakładały),
 * `labelSide: "left"` stawia podpis po lewej stronie kropki.
 */

export type Place = {
  name: string;
  lat: number;
  lng: number;
  minor?: boolean;
  labelSide?: "left" | "right";
};

/** Środek mapy – centrum Warszawy */
export const serviceAreaCenter: Place = { name: "Warszawa", lat: 52.2297, lng: 21.0122 };

/** Promienie kół na mapie (km). Ostatni to granica obszaru działania. */
export const serviceAreaRings = [25, 50, 70];

export const serviceAreaPlaces: Place[] = [
  { name: "Legionowo", lat: 52.4017, lng: 20.9266 },
  { name: "Nowy Dwór Maz.", lat: 52.43, lng: 20.7167, labelSide: "left" },
  { name: "Serock", lat: 52.5103, lng: 21.0686, minor: true },
  { name: "Pułtusk", lat: 52.7028, lng: 21.0828 },
  { name: "Wyszków", lat: 52.5925, lng: 21.4581 },
  { name: "Wołomin", lat: 52.34, lng: 21.2422 },
  { name: "Mińsk Maz.", lat: 52.1794, lng: 21.5717 },
  { name: "Otwock", lat: 52.1053, lng: 21.2614 },
  { name: "Garwolin", lat: 51.8975, lng: 21.6147 },
  { name: "Góra Kalwaria", lat: 51.9764, lng: 21.2153, minor: true },
  { name: "Piaseczno", lat: 52.0814, lng: 21.0236, labelSide: "left" },
  { name: "Grójec", lat: 51.8656, lng: 20.8675, labelSide: "left" },
  { name: "Warka", lat: 51.7833, lng: 21.1917, minor: true },
  { name: "Pruszków", lat: 52.1706, lng: 20.8119, labelSide: "left" },
  { name: "Grodzisk Maz.", lat: 52.1094, lng: 20.6253, minor: true, labelSide: "left" },
  { name: "Żyrardów", lat: 52.0489, lng: 20.4458, labelSide: "left" },
  { name: "Sochaczew", lat: 52.2294, lng: 20.2383, minor: true },
  { name: "Płońsk", lat: 52.6236, lng: 20.3753, labelSide: "left" },
];

/** Przybliżony bieg Wisły przez obszar mapy (z południowego wschodu na północny zachód) */
export const vistulaPath: [number, number][] = [
  [51.7, 21.45],
  [51.8, 21.32],
  [51.9, 21.27],
  [51.98, 21.255],
  [52.06, 21.215],
  [52.12, 21.19],
  [52.18, 21.11],
  [52.25, 21.035],
  [52.3, 20.975],
  [52.36, 20.885],
  [52.4, 20.8],
  [52.43, 20.71],
  [52.43, 20.6],
  [52.4, 20.35],
];
