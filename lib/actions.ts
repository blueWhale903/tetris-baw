"use server";

import { getServerSession } from "next-auth";
import { db } from "./db";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

const editname = z.object({
  username: z.string(),
});

export async function editUsername(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    console.log("session", session);
    if (!session) {
      return;
    }

    const { username } = editname.parse({
      username: formData.get("username"),
    });

    if (!username) {
      return;
    }
    const isValidUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (isValidUsername) {
      console.log("username has already taken");
    } else {
      await db.user.update({
        where: { username: session.user.username },
        data: {
          username: username,
        },
      });
    }
    revalidatePath("/profile");
  } catch (error) {
    console.error(error);
  }
}

export async function updateBestScore(score: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("session not found");
      return;
    }

    const user = await db.user.findUnique({
      where: { username: session.user.username },
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    const currentBestScore = user.bestScore;

    const data = {
      bestScore: Math.max(currentBestScore, score),
    };

    await db.user.update({
      where: { username: user.username },
      data: data,
    });
    revalidatePath("/leaderboard");
    console.log("update best score");
  } catch (error) {
    console.error(error);
  }
}

export async function CreateHistory(score: number, level: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("session not found");
      return;
    }

    const user = await db.user.findUnique({
      where: { username: session.user.username },
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    const newHistory = await db.history.create({
      data: {
        score: score,
        level: level,
        username: user.username,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/profile");

    console.log("create history");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchHistoryByUserId(id: string) {
  noStore();
  const history = await db.history.findMany({
    where: { userId: id },
    orderBy: {
      date: "desc",
    },
    take: 7,
  });

  if (!history) return [];

  return history;
}

export async function fetchUserByUsername(username: string) {
  noStore();
  const user = await db.user.findUnique({
    where: { username: username },
  });

  if (!user) throw Error("User not found");

  return user;
}

export async function getUsers() {
  noStore();
  const users = await db.user.findMany({
    orderBy: { bestScore: "desc" },
    take: 10,
  });

  return users;
}
