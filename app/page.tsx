import { OgMessages, OgMessagesSkeleton } from "@/components/og-messages";
import { OgWhatsapp, OgWhatsappSkeleton } from "@/components/og-whatsapp";
import { OgInstagram, OgInstagramSkeleton } from "@/components/og-instagram";
import { OG } from "@/types/og";

export default function Home() {

  const dummyData: OG[] = [
    {
      name: "Notion",
      title: "The AI workspace that works for you.",
      description: "A tool that connects everyday work into one space. It gives you and your teams AI tools - search, writting, note-taking - inside an all-in-one, flexible workspace.",
      image: "/notion.png",
      link: "https://notion.so",
    },
  ]


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="font-bold mb-24">OGpreview.dev</h3>
      <div>
        {dummyData.map((og) => (
          <div key={og.title} className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
            <OgMessages og={og} />
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
