import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const allowedTypes: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export async function saveUploadedImage(value: FormDataEntryValue | null, prefix: string) {
  if (!(value instanceof File) || value.size === 0) return null;
  const extension = allowedTypes[value.type];
  if (!extension) throw new Error("Image must be JPEG, PNG, or WebP");
  if (value.size > 5 * 1024 * 1024) throw new Error("Image must be 5 MB or smaller");
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  const filename = `${prefix}-${randomUUID()}.${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await value.arrayBuffer()));
  return `/uploads/${filename}`;
}
