import { RedirectType, redirect } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "./userUser";

export function useCheckIfAuthenticated() {
  const user = useUser();
  useEffect(() => {
    if (user.isAuthenticated) {
      redirect("/", RedirectType.replace);
    }
  }, [user]);
}
