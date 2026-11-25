import raw from "./images.json";

export interface ImgSlot {
  url: string;
  page: string;
  license: string;
  creator: string;
  title: string;
  w: number;
  h: number;
}

type Manifest = {
  hero: ImgSlot; gold: ImgSlot; diamond: ImgSlot; rings: ImgSlot; necklaces: ImgSlot;
  earrings: ImgSlot; bracelets: ImgSlot; aurelia: ImgSlot; eclat: ImgSlot; lumiere: ImgSlot;
  atelier: ImgSlot; craft: ImgSlot; campaign: ImgSlot; gallery: ImgSlot[];
};

export const IM = raw as unknown as Manifest;
export const COLL_KEYS = ["gold", "diamond", "rings", "necklaces", "earrings", "bracelets"] as const;
export type CollKey = (typeof COLL_KEYS)[number];
export const VITRINE: ReadonlySet<string> = new Set(["gold", "bracelets"]);
export const FEAT: ReadonlyArray<{ key: "aurelia" | "eclat" | "lumiere"; vitrine: boolean }> = [
  { key: "aurelia", vitrine: false },
  { key: "eclat", vitrine: true },
  { key: "lumiere", vitrine: true },
];
export const GAL_H = IM.gallery.slice(0, 3);
export const GAL_M = IM.gallery.slice(3);
