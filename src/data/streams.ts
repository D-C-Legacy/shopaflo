import type { Stream } from "../types";

import { products } from "./products";
export const streams: Stream[] = [
  {
    id: "s1",
    sellerId: "vault",
    title: "Heat all night",
    viewers: "1.8K",
    image: products[0]!.image,
    productId: "jordan",
  },
  {
    id: "s2",
    sellerId: "studio",
    title: "Curated classics",
    viewers: "620",
    image: products[1]!.image,
    productId: "jacket",
  },
  {
    id: "s3",
    sellerId: "tech",
    title: "Sound check",
    viewers: "412",
    image: products[2]!.image,
    productId: "headphones",
  },
  {
    id: "s4",
    sellerId: "vault",
    title: "Friday night finds",
    viewers: "128",
    image: products[3]!.image,
    productId: "dunk",
    upcoming: true,
  },
];
