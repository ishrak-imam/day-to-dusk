"use client";

import { Button } from "@/ui/Button";
import { type FC } from "react";
import { signOut } from "next-auth/react";
import { useUser } from "@/hooks/userUser";
import { Typography } from "@/ui/Typography";

export const Header: FC = () => {
  const user = useUser();
  return (
    <header className="bg-white">
      <div className="flex justify-end items-center gap-x-3 p-5">
        <Typography color="text-emerald-700">{user.email}</Typography>
        <Button onPress={() => signOut()}>Sign out</Button>
      </div>
    </header>
  );
};
