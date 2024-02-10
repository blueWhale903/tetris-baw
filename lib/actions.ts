"use server";

import { getServerSession } from "next-auth";
import { db } from "./db";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getSession } from "next-auth/react";

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
      session.user.username = username;
    }
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

    const currentBestScore = user.bestScore;

    const data = {
      bestScore: Math.max(currentBestScore, score),
    };

    await db.user.update({
      where: { username: user.username },
      data: data,
    });
    console.log("update best score");
  } catch (error) {
    console.error(error);
  }
}
