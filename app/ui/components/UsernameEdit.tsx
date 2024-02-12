"use client";

import { editUsername } from "@/lib/actions";
import { useState } from "react";

export default function UsernameEdit({ username }: { username: string }) {
  const [newUsername, dispatch] = useState(username);
  return (
    <form action={editUsername} className="flex flex-col gap-2">
      <input
        type="text"
        className="text-white bg-[#444] px-2 py-1"
        name="username"
        value={newUsername}
        onChange={(e) => {
          const value: string = e.target.value;
          dispatch((username) => (username = value));
        }}
      />
      <div className="bg-white text-black px-1 text-center">
        <button>Save</button>
      </div>
    </form>
  );
}
