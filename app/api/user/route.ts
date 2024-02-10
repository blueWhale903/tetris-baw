import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have 8 character"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, password } = userSchema.parse(body);

    const existUserByUsername = await db.user.findUnique({
      where: { username: name },
    });

    if (existUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "This Username has already registered",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username: name,
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      user: newUser,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 201 }
    );
  }
}
