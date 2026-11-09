const TRANSLATE_URL = process.env.LIBRETRANSLATE_URL || "http://localhost:5000";

export async function translateText(text: string, source = "id", target = "en") {
  if (!text.trim()) return text;
  const response = await fetch(`${TRANSLATE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source, target, format: "text" }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`LibreTranslate returned ${response.status}`);
  const data = await response.json() as { translatedText?: string };
  if (!data.translatedText) throw new Error("LibreTranslate returned no translated text");
  return data.translatedText;
}

export async function translateRichText(html: string) {
  const segments = html.split(/(<[^>]+>)/g);
  const translated = await Promise.all(segments.map((segment) => segment.startsWith("<") ? segment : translateText(segment)));
  return translated.join("");
}
