import type { Lang } from "./ui";

const cvUrls = {
  es: "https://661udz75j1.ufs.sh/f/FCpxdU1lxaGLcPmSXeRXsAEdoGpN9iBFwnl4Tghjy7VfQOaz",
  en: "https://661udz75j1.ufs.sh/f/FCpxdU1lxaGL4fcyVMrJZzS9UV6XO5eHj1msfWC7BFMwbtTk",
} as const satisfies Record<Lang, string>;

/** Download URL of the CV PDF in the given language. */
export function cvUrl(lang: Lang): string {
  return cvUrls[lang];
}
