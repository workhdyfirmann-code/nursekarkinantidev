import { readFile } from "node:fs/promises";
import path from "node:path";

const contentTypes: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!/^[a-z0-9-]+\.(jpg|png|webp)$/.test(filename)) return new Response(null, { status: 404 });
  const contentType = contentTypes[filename.slice(filename.lastIndexOf(".") + 1)];
  try {
    const image = await readFile(path.join(process.cwd(), "public", "uploads", filename));
    return new Response(image, { headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404 });
    throw error;
  }
}
