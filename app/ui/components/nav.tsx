"use client";

import Link from "next/link";
import { luckiest_guy } from "../fonts";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PlayIcon, UserCircleIcon, FireIcon } from "@heroicons/react/24/solid";

const links = [
  { name: "Profile", href: "/profile", icon: UserCircleIcon },
  { name: "Play", href: "/", icon: PlayIcon },
  { name: "Leaderboard", href: "/leaderboard", icon: FireIcon },
];

export function Nav() {
  const pathName = usePathname();
  return (
    <div
      className={`${luckiest_guy.className} text-xl absolute bottom-0 w-full h-[42px] grid grid-cols-3 text-center bg-[#333] text-white`}
    >
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex justify-center items-center text-2xl m-auto w-full rounded-sm",
              {
                "bg-white text-black": pathName == link.href,
              }
            )}
          >
            <LinkIcon className="h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
