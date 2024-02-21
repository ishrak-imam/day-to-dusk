import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export type ReplicateParams = {
  prompt: string;
  condition_scale: number;
  negative_prompt: string;
  num_inference_steps: number;
};

export function dayToDusk(params: ReplicateParams, image: string) {
  return replicate.run(
    "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b",
    {
      input: {
        seed: 0,
        image,
        ...params,
      },
    },
  );
}
