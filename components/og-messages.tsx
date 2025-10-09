"use client";

import { OG } from "@/types/og";
import Image from "next/image";
import Link from "next/link";
import { cleanUrl } from "@/utils/url";
import { truncateText } from "@/utils/text";

/**
 * OgMessages
 * @param og - The og object
 * @returns The OgMessages component
 */
export function OgMessages({
  og,
  dominantColor,
  textColor,
  subTextColor,
  theme = "light",
}: {
  og: OG;
  dominantColor: { r: number, g: number, b: number };
  textColor: "black" | "white";
  subTextColor: string;
  theme?: "light" | "dark";
}) {
  return (
    <Link target="_blank" rel="noopener noreferrer" href={og.link}>
      <div className="relative flex flex-col rounded-2xl min-w-[18rem] max-w-[18rem] w-full">
        <Image
          alt={og.description}
          src={og.image}
          width={720}
          height={720}
          className="rounded-t-2xl"
        />
        <div className="message-bubble">
          <h3 className={`text-${textColor} text-sm font-bold`}>{truncateText(og.title, 50)}</h3>
          <p className={`text-${subTextColor} font-[500] text-xs`}>{cleanUrl(og.link)}</p>
        </div>
        <style jsx>{`
          .message-bubble {
            z-index: -1;
            background-color: ${dominantColor ? `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})` : "#c6c5c4"};
            padding: 8px 12px;
            border-radius: 0 0 14px 14px;
            position: relative;
            word-wrap: break-word;
            line-height: 24px;
          }

          .message-bubble:before,
          .message-bubble:after {
            content: "";
            position: absolute;
            bottom: 0;
            height: 22px;
          }

          .message-bubble:before {
            right: -5px;
            width: 16px;
            z-index: 1;
            background-color: ${dominantColor ? `rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})` : "#c6c5c4"};
            border-bottom-left-radius: 14px 12px;
          }

          .message-bubble:after {
            right: -24px;
            width: 24px;
            z-index: 1;
            background-color: ${theme === "light" ? "#0a0a0a" : "#ffffff"};
            border-bottom-left-radius: 6px;
          }
        `}</style>
      </div>
    </Link>
  );
}

export function OgMessagesSkeleton({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col rounded-2xl min-w-[18rem] max-w-[18rem] w-full">
      <div className="bg-gray-300 rounded-t-2xl w-full h-38 animate-pulse"></div>
      <div className="bg-[#c6c5c4] px-3 py-2 rounded-b-2xl w-full h-12 flex flex-col gap-1">
        <div className="bg-gray-300 rounded-full w-3/4 h-4 animate-pulse"></div>
        <div className="bg-gray-300 rounded-full w-1/2 h-3 animate-pulse"></div>
      </div>
    </div>
  );
}
