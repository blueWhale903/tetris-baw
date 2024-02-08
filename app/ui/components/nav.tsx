'use client'

import Link from "next/link";
import { luckiest_guy } from "../fonts";
import { usePathname } from "next/navigation";

export function Nav() {
  return (
    <div
      className={`${luckiest_guy.className} text-xl absolute bottom-0 w-full h-[42px] grid grid-cols-3 text-center bg-white text-black`}
    >
      <div className="m-auto">
        <Link href="/profile">Profile</Link>
      </div>
      <div className="text-3xl border-r-2 border-l-2 border-black">
        <Link href="/">Play</Link>
      </div>
      <div className="m-auto">
        <Link href="/leaderboard">Leader board</Link>
      </div>
    </div>
  );
}
