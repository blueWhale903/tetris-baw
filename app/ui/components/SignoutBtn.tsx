"use client";

import { signOut } from "next-auth/react";

export default function SignoutBtn() {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="border-white border-2 text-white hover:bg-white hover:text-black absolute top-4 right-4 px-2 py-1 duration-300"
      >
        Sign out
      </button>
    </div>
  );
}
