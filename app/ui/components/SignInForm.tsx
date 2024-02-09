"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { luckiest_guy } from "../fonts";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must contain at least 5 characters")
    .max(100),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

type FormFields = z.infer<typeof FormSchema>;

export default function SignInForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const signInData = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      if (signInData?.ok) {
        console.log("sign in successfully!");
        router.push("/profile");
      } else {
        setError("root", {
          message: "Username or Password are Incorrect!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 justify-center items-center text-white bg-[#333] border-white border-2 px-10 py-12 rounded-md"
      >
        <h3
          className={`${luckiest_guy.className} text-xl text-center text-white`}
        >
          WELCOME BACK
        </h3>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="username"
          {...register("username")}
          className="p-2 bg-[#222] rounded-md"
        />
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}
        <input
          type="password"
          id="password"
          placeholder="password"
          {...register("password")}
          className="p-2 bg-[#222] rounded-md"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-white text-black p-2 w-full rounded-md"
        >
          {isSubmitting ? "Loading" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
