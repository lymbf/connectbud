import type { MetadataRoute } from "next";

import { company } from "@/model/data/company";

/** /robots.txt – cała strona dostępna dla wyszukiwarek, z adresem mapy strony. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
