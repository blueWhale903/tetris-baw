import { Block, EmptyCell, SHAPES } from "../types";
import Cell from "./cell";

export default function UpcomingBlocks({
  upcomingBlocks,
}: {
  upcomingBlocks: Block[];
}) {
  return (
    <div>
      <p className="text-center text-2xl mb-2">NEXT</p>

      <div className="flex justify-center items-center gap-[30px] flex-col-reverse w-[150px] h-[340px] border-[1px]">
        {upcomingBlocks.map((block, blockIndex) => {
          const shape = SHAPES[block].shape.filter((row) =>
            row.some((cell) => cell)
          );
          return (
            <div key={blockIndex} className="">
              {shape.map((row, rowIndex) => {
                return (
                  <div key={rowIndex} className="flex">
                    {row.map((isSet, cellIndex) => {
                      const cellClass = isSet ? block : "hidden-cell";
                      const key = `${blockIndex}-${rowIndex}-${cellIndex}`;
                      return <Cell key={key} type={cellClass} />;
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
