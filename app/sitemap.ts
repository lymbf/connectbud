import type { MetadataRoute } from "next";

import { company } from "@/model/data/company";
import { serviceNav } from "@/model/data/navigation";

/**
 * Mapa strony (/sitemap.xml) – wszystkie publiczne strony, w tym podstrony usług.
 * TODO: dopisać politykę prywatności, gdy powstanie jej podstrona.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...serviceNav.map((service) => service.href), "/realizacje", "/onas", "/kontakt"];

  return paths.map((path) => ({
    url: path === "/" ? company.url : `${company.url}${path}`,
  }));
}
