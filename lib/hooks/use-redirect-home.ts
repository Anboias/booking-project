import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectHome = (trigger: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!trigger) {
      return;
    }

    router.push("/");
  }, [trigger, router]);
};
