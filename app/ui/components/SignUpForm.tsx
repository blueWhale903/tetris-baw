"use client";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { luckiest_guy } from "../fonts";
import Link from "next/link";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Username is required")
      .min(5, "Username must contain at least 5 characters")
      .max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

type FormFields = z.infer<typeof FormSchema>;

export default function SignUpForm() {
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
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response);
      } else if (response.status == 409) {
        setError("name", { message: "username has already taken" });
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
          WELCOME TO TETRIS B&W
        </h3>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="username"
          {...register("name")}
          className="p-2 bg-[#222] rounded-md"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
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
        <input
          type="password"
          id="confirmPassword"
          placeholder="retype password"
          {...register("confirmPassword")}
          className="p-2 bg-[#222] rounded-md"
        />
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword.message}</div>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-white text-black p-2 w-full rounded-md"
        >
          {isSubmitting ? "Loading" : "Sign up"}
        </button>
        <p>OR</p>
        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-[#666] p-2 w-full rounded-md"
        >
          <Link href="/signin">Sign in</Link>
        </button>
      </form>
    </div>
  );
}
