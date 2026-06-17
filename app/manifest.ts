import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DineDash — Pay First. Eat Fast. Get Money Back.",
    short_name: "DineDash",
    description:
      "DineDash rewards diners for eating quickly with automatic refunds up to 30%. Restaurants get faster table turnover with zero extra staff.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBF5",
    theme_color: "#16A34A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
