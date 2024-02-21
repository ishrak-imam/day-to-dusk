import { useSession } from "next-auth/react";

type User = {
  name: string;
  email: string;
  isAuthenticated: boolean;
};

export function useUser(): User {
  const { data: session } = useSession();

  return {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    isAuthenticated: !!session,
  };
}
