import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Stare adresy z poprzedniej strony connectbud.pl (zaindeksowane w Google), których nowa strona nie ma.
   * permanent: true = kod 308 – Google traktuje go jak 301 i przenosi historię adresu.
   * Podstrony usług (/oferta/kompleksowe-remonty, /oferta/wykonczenia-pod-klucz, /oferta/remonty-lazienek)
   * mają te same adresy co wcześniej, więc nie potrzebują przekierowań.
   *
   * TODO: przed podmianą domeny porównać z pełną listą starych adresów z Search Console (albo site:connectbud.pl).
   */
  async redirects() {
    return [
      { source: "/o-nas", destination: "/onas", permanent: true },
      // nie ma osobnej strony z ofertą – lista usług jest na stronie głównej
      { source: "/oferta", destination: "/#oferta", permanent: true },
      // remonty z projektem to sekcja strony kompleksowych remontów
      { source: "/oferta/remonty-z-projektem", destination: "/oferta/kompleksowe-remonty#z-projektem", permanent: true },
      // usługi usunięte z oferty
      { source: "/oferta/budowa-domow", destination: "/", permanent: true },
      { source: "/oferta/cegla-i-kamien", destination: "/", permanent: true },
      // TODO: usunąć, jeśli cookies dostaną osobną podstronę zamiast rozdziału w polityce prywatności
      { source: "/polityka-cookies", destination: "/polityka-prywatnosci", permanent: true },
    ];
  },
};

export default nextConfig;
