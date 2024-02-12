"use server";

import { fetchHistoryByUserId } from "@/lib/actions";

export async function History({ id }: { id: string }) {
  const history = await fetchHistoryByUserId(id);
  return (
    <div className=" p-[12px] flex flex-col gap-2">
      <h1 className="text-2xl text-center">HISTORY</h1>
      {history?.map((item) => (
        <div
          key={item.id}
          className="flex gap-5 w-[400px] bg-white text-black px-4 py-2 items-center justify-center border-l-4 border-[#999999]"
        >
          <p>LV{item.level}</p>
          <span className="w-2">|</span>
          <p className="w-[50%]">{item.score}</p>
          <p>{item.date.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
