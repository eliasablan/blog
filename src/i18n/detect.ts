import type { Lang } from "./ui";

function pickLangFromAcceptLanguage(
  header: string | null,
  supported: readonly Lang[],
): Lang | null {
  if (!header) return null;
  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim().split("=")).find(([k]) => k === "q");
      const quality = q ? parseFloat(q[1]) : 1;
      return { tag: tag.toLowerCase(), quality: isNaN(quality) ? 1 : quality };
    })
    .sort((a, b) => b.quality - a.quality);
  for (const { tag } of candidates) {
    const primary = tag.split("-")[0];
    if (supported.includes(primary as Lang)) return primary as Lang;
  }
  return null;
}

export function detectLang(
  cookieLang: string | undefined,
  acceptLanguage: string | null,
  supported: readonly Lang[],
): Lang {
  const fromCookie = supported.includes(cookieLang as Lang)
    ? (cookieLang as Lang)
    : null;
  return (
    fromCookie ?? pickLangFromAcceptLanguage(acceptLanguage, supported) ?? "en"
  );
}
