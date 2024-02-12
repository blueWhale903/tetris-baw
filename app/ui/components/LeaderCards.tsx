import { getUsers } from "@/lib/actions";

export default async function Leadercards() {
  const users = await getUsers();
  return (
    <div className="flex flex-col gap-3">
      {users?.map((user) => (
        <div
          key={user.id}
          className="bg-white text-black flex justify-between w-[300px] px-2 py-1 rounded-md"
        >
          <p>{user.username}</p>
          <p>{user.bestScore}</p>
        </div>
      ))}
    </div>
  );
}
