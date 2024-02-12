import { useState } from "react";
import { History } from "./History";
import UsernameEdit from "./UsernameEdit";
// fix page error
export default function Profile({
  username,
  bestScore,
  userId,
}: {
  username: string;
  bestScore: number;
  userId: string;
}) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center pt-[30px]">
      <h1 className="text-3xl">YOUR PROFILE</h1>
      <div className="flex flex-col gap-2">
        <span>Username: {username} </span>
        {/* <UsernameEdit username={username} /> */}
      </div>
      <div className="mt-4 text-center">
        <p>BEST SCORE</p>
        <h2 className="text-5xl">{bestScore}</h2>
      </div>
      <div className="mt-4">
        <History id={userId} />
      </div>
    </div>
  );
}
