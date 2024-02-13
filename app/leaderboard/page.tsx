import { getUsers } from "@/lib/actions";
import Leadercards from "../ui/components/LeaderCards";
import { luckiest_guy } from "../ui/fonts";
export default async function Page() {
  const users = await getUsers();
  return (
    <main className="flex flex-col items-center">
      <h1 className={`text-[42px] ${luckiest_guy.className} my-3`}>
        LeaderBoard
      </h1>
      <Leadercards users={users} />
    </main>
  );
}
