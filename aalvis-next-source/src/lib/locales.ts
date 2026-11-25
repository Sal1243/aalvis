export const LOCALES = ["en", "fr", "de", "es", "it", "pt", "nl"] as const;
export type LocaleCode = (typeof LOCALES)[number];

export const NATIVE: Record<LocaleCode, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
};
