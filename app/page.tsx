import { OgMessages, OgMessagesSkeleton } from "@/components/og-messages";
import { OgWhatsapp, OgWhatsappSkeleton } from "@/components/og-whatsapp";
import { OgInstagram, OgInstagramSkeleton } from "@/components/og-instagram";
import { OG } from "@/types/og";
import Image from "next/image";
import { getDominantColor, getSubTextColor, getTextColor, normalizeTone } from "@/utils/colour";
import { loadImageBuffer } from "@/utils/image";

export default async function Home() {

  const dummyData: OG[] = [
    {
      name: "Notion",
      title: "The AI workspace that works for you.",
      description: "A tool that connects everyday work into one space. It gives you and your teams AI tools - search, writting, note-taking - inside an all-in-one, flexible workspace.",
      image: "/notion.png",
      link: "https://notion.so",
    },
    {
      name: "Cap",
      title: "Beautiful screen recordings, owned by you.",
      description: "Cap is the open-source alternative to Loom. Lightweight, powerful, and fast. Record and share in seconds.",
      image: "/cap.png",
      link: "https://cap.so",
      color: "#da532c",
    }
  ]

  const buf = await loadImageBuffer(dummyData[1].image);
  const dom = await getDominantColor(buf);
  const norm = await normalizeTone(dom);
  const text = await getTextColor(norm.r, norm.g, norm.b);
  const sub  = await getSubTextColor(norm, text);


  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] max-h-full my-24">
      <Image src="/logo.svg" alt="OGpreview" width={40} height={40} className="mb-4" />
      <h3 className="font-bold mb-24">OGpreview.dev</h3>
      <div>
        {dummyData.map((og) => (
          <div key={og.title} className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2 w-full">
            <OgMessages og={og} dominantColor={norm} textColor={text} subTextColor={sub} />
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
