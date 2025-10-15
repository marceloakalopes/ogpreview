"use client";

import { OG } from "@/types/og";
import Image from "next/image";
import Link from "next/link";
import { cleanUrl } from "@/utils/url";
import { CheckCheck } from 'lucide-react'
import { truncateText } from "@/utils/text";

/**
 * OgWhatsapp
 * @param og - The og object
 * @returns The OgMessages component
 */
export function OgWhatsapp({
  og,
  theme = "light",
}: {
  og: OG;
  theme?: "light" | "dark";
}) {
  return (
    <Link target="_blank" rel="noopener noreferrer" href={og.link}>
      <div className="relative flex flex-col rounded-xl max-w-[18rem] w-full border-4 border-[#154d37] bg-[#154d37]">
        <Image
          alt={og.description}
          src={og.image}
          width={720}
          height={720}
          className="rounded-t-lg"
        />
        <div className="flex flex-col p-2 gap-1.5 bg-[#113e2d] rounded-b-lg">
          <h3 className="text-white text-xs font-bold">{og.title} | {og.name}</h3>
          <p className="text-[#8a9d96] font-[560] text-xs max-h-[64px] overflow-hidden">{truncateText(og.description, 180)}</p>
            <p className="text-[#8a9d96] font-[560] text-xs">{cleanUrl(og.link)}</p>
        </div>
        <div className="px-2 py-0.5">
            <p className="text-[#21be63] font-[560] text-sm underline hover:no-underline truncate max-w-[10rem]" >
                {og.link}
            </p>

        </div>
        <div className="absolute right-1 bottom-0 flex items-center gap-1">
                <span className="text-[11px] text-[#8a9d96] font-[560]">{ new Date().toLocaleString( "en-US", { hour: "2-digit", minute: "2-digit" } ) }</span>
                <CheckCheck className="w-4 h-4 text-[#8a9d96]" />
            </div>
      </div>
    </Link>
  );
}

/**
 * OgWhatsappSkeleton
 * @param theme - The theme of the skeleton
 * @returns The OgWhatsappSkeleton component
 */
export function OgWhatsappSkeleton({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  return (
    <div className="relative flex flex-col rounded-xl max-w-[18rem] w-full border-4 border-[#154d37] bg-[#154d37] h-fit">
        <div className="bg-gray-300 rounded-t-lg w-full h-38 animate-pulse"></div>
        <div className="flex flex-col p-2 gap-1.5 bg-[#113e2d] rounded-b-lg">
          <h3 className="text-white text-xs font-bold">Title | Name</h3>
          <p className="text-[#8a9d96] font-[560] text-xs max-h-[64px] overflow-hidden">Description</p>
            <p className="text-[#8a9d96] font-[560] text-xs">website.com</p>
        </div>
        <div className="px-2 py-0.5">
            <p className="text-[#21be63] font-[560] text-sm underline hover:no-underline truncate max-w-[10rem]" >
                https://website.com
            </p>

        </div>
        <div className="absolute right-1 bottom-0 flex items-center gap-1">
                <span className="text-[11px] text-[#8a9d96] font-[560]">{ new Date().toLocaleString( "en-US", { hour: "2-digit", minute: "2-digit" } ) }</span>
                <CheckCheck className="w-4 h-4 text-[#8a9d96]" />
            </div>
      </div>
  );
}