"use client";

import { useState } from "react";
import { editUsername } from "@/lib/actions";
import { getSession } from "next-auth/react";

export default function Profile({
  username,
  bestScore,
}: {
  username: string | null;
  bestScore: number;
}) {
  if (!username) username = "none";
  const [username_state, dispatchUsername] = useState(username);
  return (
    <div className="flex flex-col gap-3 justify-center items-center pt-[30px]">
      <h1 className="text-3xl">YOUR PROFILE</h1>
      <div className="flex flex-col gap-2">
        <span>Username: </span>
        <form action={editUsername}>
          <input
            type="text"
            className="text-white bg-[#444] px-1"
            name="username"
            value={username_state}
            onChange={(e) => {
              const value = e.target.value;
              dispatchUsername(value);
            }}
          />
          <button>Save</button>
        </form>
      </div>
      <div className="mt-4">
        <p>BEST SCORE</p>
        <h2 className="text-5xl text-center">{bestScore}</h2>
      </div>
      <div className="mt-4">
        <h2>HISTORY</h2>
      </div>
    </div>
  );
}
