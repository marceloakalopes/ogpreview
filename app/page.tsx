import { OgMessages, OgMessagesSkeleton } from "@/components/og/og-messages";
import { OgWhatsapp, OgWhatsappSkeleton } from "@/components/og/og-whatsapp";
import { OgInstagram, OgInstagramSkeleton } from "@/components/og/og-instagram";
import { OG } from "@/types/og";
import { getDominantColor, getSubTextColor, getTextColor, normalizeTone } from "@/utils/colour";
import { loadImageBuffer } from "@/utils/image";
import { Navbar } from "@/components/navbar";

export default async function Home() {

  const notion: OG = 
    {
      name: "Notion",
      title: "The AI workspace that works for you.",
      description: "A tool that connects everyday work into one space. It gives you and your teams AI tools - search, writting, note-taking - inside an all-in-one, flexible workspace.",
      image: "/notion.png",
      link: "https://notion.so",
    }

    const cap: OG = 
    {
      name: "Cap",
      title: "Beautiful screen recordings, owned by you.",
      description: "Cap is the open-source alternative to Loom. Lightweight, powerful, and fast. Record and share in seconds.",
      image: "/cap.png",
      link: "https://cap.so",
      color: "#da532c",
    }

    const sun: OG =
    {
      name: "Sun",
      title: "Sun is a new way to build AI-powered products.",
      description: "Sun is a new way to build AI-powered products.",
      image: "/sun.webp",
      link: "https://sun.com",
      color: "#000000",
    }

    const raw = await getDominantColor(await loadImageBuffer(sun.image));
    const normalized = normalizeTone(raw);
    const primary = getTextColor(normalized.r, normalized.g, normalized.b);
    const sub = getSubTextColor(normalized, primary);   
  


  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] max-h-full my-24">
      <Navbar />
      <div>
        {[sun].map((og) => (
          <div key={og.title} className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2 w-full">
            <OgMessages og={og} dominantColor={normalized} textColor={primary} subTextColor={sub} />
            <OgMessagesSkeleton />
            </div>
            <div className="flex gap-2 w-full">
            <OgWhatsapp og={og} />
            <OgWhatsappSkeleton />
            </div>
            <div className="flex gap-18 w-full">
            <OgInstagram og={og} />
            <OgInstagramSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
