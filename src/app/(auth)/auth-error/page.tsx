"use client";

import { Suspense } from "react";
import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Typography } from "@/ui/Typography";
import { useCheckIfAuthenticated } from "@/hooks/useCheckIfAuthenticated";

function ErrorMessageFallbackUI() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Typography align="center" variant="h1" color="text-emerald-700">
        Something went wrong
      </Typography>
    </div>
  );
}

function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") ?? "Something went wrong";

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Typography align="center" variant="h1" color="text-emerald-700">
        Sign in failed
      </Typography>

      <div className="mt-10">
        <Typography color="text-red-800">{error}</Typography>
      </div>

      <div className="mt-10">
        <Link href="/">
          <Typography color="text-emerald-700" variant="body1">
            Go to Homepage
          </Typography>
        </Link>
      </div>
    </div>
  );
}

const Page: NextPage = () => {
  useCheckIfAuthenticated();

  return (
    <Suspense fallback={<ErrorMessageFallbackUI />}>
      <ErrorMessage />
    </Suspense>
  );
};

export default Page;
