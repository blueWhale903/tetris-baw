"use client";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  name: z
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
        name: data.name,
        password: data.password,
        redirect: false,
      });
      if (signInData?.ok) {
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
    <div className="m-auto bg-[#333] w-fit p-5">
      <h3 className="h-3 text-center">SIGN IN</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 justify-center items-center text-black"
      >
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="username"
          {...register("name")}
          className="p-2"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <input
          type="password"
          id="password"
          placeholder="password"
          {...register("password")}
          className="p-2"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-white p-2"
        >
          {isSubmitting ? "Loading" : "Sign in"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
