"use client";

import Link from "next/link";
import { luckiest_guy } from "../fonts";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "Profile", href: "/profile" },
  { name: "Play", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
];

export function Nav() {
  const pathName = usePathname();
  return (
    <div
      className={`${luckiest_guy.className} text-xl absolute bottom-0 w-full h-[42px] grid grid-cols-3 text-center bg-[#333] text-white`}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx("text-2xl m-auto w-full rounded-sm", {
            "bg-white text-black": pathName == link.href,
          })}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
