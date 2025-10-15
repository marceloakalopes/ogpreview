import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-12 left-1/2 -translate-x-1/2 flex items-center justify-between max-w-3xl w-full py-3 px-5 bg-white rounded-full">
      <div className="flex items-center justify-center gap-2 h-fit">
        <Image src="/logo-black.svg" alt="OGpreview" width={32} height={32} className="ml-3" />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link className="text-sm text-black" href="/">Blog</Link>
        <Link className="text-sm text-black" href="/">Github</Link>
        <Link className="text-sm text-black" href="/">Twitter</Link>
      </div>
      <div>
        <Link href="/">
          <button className="text-sm text-white font-semibold bg-black rounded-full px-4 py-2">Support</button>
        </Link>
      </div>
    </nav>
  );
}
