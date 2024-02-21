"use client";

import { useCallback } from "react";
import { Button } from "@/ui/Button";
import { TextInput } from "@/ui/TextInput";
import { Typography } from "@/ui/Typography";
import type { NextPage } from "next";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signIn } from "next-auth/react";
import { useCheckIfAuthenticated } from "@/hooks/useCheckIfAuthenticated";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Signin: NextPage = function SignIn() {
  useCheckIfAuthenticated();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(({ email, password }) => {
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center mx-5 lg:mx-24">
      <div className="flex flex-col items-center w-full mt-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col items-center w-full space-y-10"
        >
          <div className="w-full md:w-1/3">
            <Typography color="text-emerald-700">Email</Typography>
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, name, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  name={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  autoComplete="email"
                />
              )}
            />
          </div>

          <div className="w-full md:w-1/3">
            <Typography color="text-emerald-700">Password</Typography>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, name, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  type="password"
                  autoComplete="current-password"
                  name={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <div className="w-full md:w-1/3">
            <Button
              fullWidth
              type="submit"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
