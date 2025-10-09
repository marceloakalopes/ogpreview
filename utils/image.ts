import fs from "node:fs/promises";
import path from "node:path";

export async function loadImageBuffer(src: string): Promise<Buffer> {
  if (/^https?:\/\//i.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
  }
  // treat as file in /public
  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  return fs.readFile(filePath);
}
