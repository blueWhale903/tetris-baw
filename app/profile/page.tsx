import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Profile from "../ui/components/Profile";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) {
    return Error("Something went wrong!");
  }

  return (
    <main>
      <Profile username={user.username} bestScore={user.bestScore} />
    </main>
  );
}
