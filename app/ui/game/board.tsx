import Cell from "./cell";
import { BoardShape, EmptyCell } from "../types";

export default function Board({board}: {board: BoardShape}) {
  return (
    <main>
      <div className="flex flex-col items-center w-fit m-auto border-white border-[1px]">
        {board?.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row?.map((cell, colIndex) => (
              <Cell key={`${colIndex}`} type={cell} />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
