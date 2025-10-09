import { OG } from "@/types/og";
import Link from "next/link";
import Image from "next/image";
import { cleanUrl } from "@/utils/url";

/**
 * OgInstagram
 * @param og - The og object
 * @returns The OgInstagram component
 */
export function OgInstagram({ og }: { og: OG }) {
  return (
    <Link href={og.link} target="_blank" rel="noopener noreferrer">
      <div className="relative flex flex-col rounded-2xl min-w-[14rem] max-w-[14rem] w-full">
        <Image
          src={og.image}
          alt={og.description}
          width={720}
          height={720}
          className="rounded-t-2xl"
        />
        <div className="flex flex-col py-2 px-3 gap-1.5 bg-[#25292f] rounded-b-2xl">
          <h3 className="text-white text-sm font-bold">
            {og.title} | {og.name}
          </h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#a1aab5"
            >
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
            </svg>
            <p className="text-[#a1aab5] text-xs font-[560]">
              {cleanUrl(og.link)}
            </p>
          </div>
        </div>

        <div className=" absolute top-0 bottom-0 my-auto -left-10 h-fit flex flex-col gap-1">
          {/* Info Icon */}
          <div className="bg-[#25292f] rounded-full p-1 h-[28px] w-[28px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20px"
              height="20px"
            >
              <path
                d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                fill="none"
                stroke="white"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M220 220h32v116"
              />
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M208 340h88"
              />
              <path
                fill="white"
                d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"
              />
            </svg>
          </div>

          {/* Send Icon */}
          <div className="bg-[#25292f] rounded-full p-1 flex items-center-safe justify-center-safe h-[28px] w-[28px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="15px"
              height="15px"
              fill="none"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="42"
              className="pr-[1px]"
            >
              <path d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}


export function OgInstagramSkeleton() {

    return (
        <div className="relative flex flex-col rounded-2xl min-w-[14rem] max-w-[14rem] w-full">
        <div className="bg-gray-300 rounded-t-2xl w-full h-32 animate-pulse"></div>
        <div className="flex flex-col py-2 px-3 gap-1.5 bg-[#25292f] rounded-b-2xl">
          <h3 className="text-white text-sm font-bold">
            Title | Name
          </h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#a1aab5"
            >
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
            </svg>
            <p className="text-[#a1aab5] text-xs font-[560]">
              website.com
            </p>
          </div>
        </div>

        <div className=" absolute top-0 bottom-0 my-auto -left-10 h-fit flex flex-col gap-1">
          {/* Info Icon */}
          <div className="bg-[#25292f] rounded-full p-1 h-[28px] w-[28px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20px"
              height="20px"
            >
              <path
                d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
                fill="none"
                stroke="white"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M220 220h32v116"
              />
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M208 340h88"
              />
              <path
                fill="white"
                d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"
              />
            </svg>
          </div>

          {/* Send Icon */}
          <div className="bg-[#25292f] rounded-full p-1 flex items-center-safe justify-center-safe h-[28px] w-[28px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="15px"
              height="15px"
              fill="none"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="42"
              className="pr-[1px]"
            >
              <path d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285" />
            </svg>
          </div>
        </div>
      </div>
    )
}