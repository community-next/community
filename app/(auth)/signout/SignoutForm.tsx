"use client";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { Button } from "@community-next/design-system";

export function SignoutForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    await signOut({ redirect: true });
    location.href = "/";
    setIsLoading(false);
  }, []);

  return (
    <Button disabled={isLoading} onClick={handleSignOut} className="block">
      Sign out
    </Button>
  );
}
