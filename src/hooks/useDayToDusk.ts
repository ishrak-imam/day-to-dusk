import { useCallback, useState } from "react";
import { ReplicateParams } from "@/service/replicate";

export function useDayToDusk() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ isError: boolean; msg?: string }>({
    isError: false,
  });

  const [result, setResult] = useState<string>("");

  const applyEffect = useCallback((image: File, params: ReplicateParams) => {
    setIsLoading(true);
    uploadToFirebase(image)
      .then((data) => {
        const url = data.downloadURL;
        replicateImage(params, url)
          .then((replicateImage) => {
            setResult(replicateImage);
          })
          .catch(() => {
            setError({
              isError: true,
              msg: "Failed to replicate image, try again",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setError({ isError: true, msg: "Failed to upload image, try again" });
      });
  }, []);

  return {
    isLoading,
    applyEffect,
    result,
    error,
  };
}

async function uploadToFirebase(image: File) {
  const data = new FormData();
  data.set("file", image);

  const result = await fetch("/api/upload", {
    method: "POST",
    body: data,
  });

  return await result.json();
}

async function replicateImage(params: ReplicateParams, imageUrl: string) {
  const result = await fetch("api/replicate", {
    method: "POST",
    body: JSON.stringify({ params, imageUrl }),
  });

  return await result.json();
}
