"use client";

import Image from "next/image";
import Board from "./ui/game/board";
import { useTetris } from "./hooks/useTetris";
import { SHAPES } from "./ui/types";
import Score from "./ui/game/score";
import Level from "./ui/game/level";
import UpcomingBlock from "./ui/game/upcomingBlocks";
import { luckiest_guy } from "./ui/fonts";

function lineRequiredAtLevel(level: number) {
  let s = 0;
  for (let i = 1; i <= level; i++) {
    s += i;
  }

  return s * 5;
}

export default function Home() {
  const {
    board,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    level,
    lineCleared,
  } = useTetris();
  let prevLv = lineRequiredAtLevel(level - 1);
  let curLv = lineRequiredAtLevel(level);
  let percentage = (lineCleared - prevLv) / (curLv - prevLv);
  if (percentage >= 1) {
    percentage =
      (lineCleared - curLv) / (lineRequiredAtLevel(level + 1) - curLv);
  }

  return (
    <main
      className={`grid grid-cols-[auto_200px_400px_200px_auto] ${luckiest_guy.className}`}
    >
      <div className="flex flex-col justify-center gap-20 items-center col-start-2">
        <Score score={score} />
        <Level
          level={level}
          percentage={percentage}
          lineCleared={lineCleared}
        />
        <div className="h-[13px]">
          {isPlaying ? null : (
            <button
              className="text-2xl text-center text-white border-white border-2 px-2 py-1 hover:bg-white hover:text-black duration-200"
              onClick={startGame}
            >
              New Game
            </button>
          )}
        </div>
      </div>
      <div>
        <h1
          className={`text-3xl tracking-wider mt-[12px] text-center p-4 ${luckiest_guy.className}`}
        >
          TETRIS <span className="bg-white text-black pl-1 pr-1">BLACK</span> &
          WHITE
        </h1>
        <Board board={board} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <UpcomingBlock upcomingBlocks={upcomingBlocks} />
      </div>
    </main>
  );
}
