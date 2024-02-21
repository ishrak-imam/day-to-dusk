"use client";

import { useCallback, useEffect, useState } from "react";
import { Typography } from "@/ui/Typography";
import { TextInput } from "@/ui/TextInput";
import { ImageUpload } from "@/components/ImageUpload";
import { TextArea } from "@/ui/TextArea";
import { Button } from "@/ui/Button";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDayToDusk } from "@/hooks/useDayToDusk";
import { LoadingIndicator } from "@/ui/LoadingIndicator";

import type { ReplicateParams } from "@/service/replicate";

const schema = yup
  .object({
    prompt: yup.string().required("Prompt is required"),
    condition_scale: yup.number().required("Condition scale is required"),
    negative_prompt: yup.string().required("Negative prompt is required"),
    num_inference_steps: yup
      .number()
      .required("Number of decision step is required"),
  })
  .required();

export default function HomePage() {
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();
  const [imageUploadError, setImageUploadError] = useState<string>();

  const { applyEffect, isLoading, error, result } = useDayToDusk();

  useEffect(() => {
    let preview: string | undefined;
    if (image) {
      preview = URL.createObjectURL(image);
      setImagePreview(preview);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image]);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      prompt: "",
      condition_scale: 0.5,
      negative_prompt: "",
      num_inference_steps: 50,
    },
    resolver: yupResolver(schema),
  });

  const onReset = useCallback(() => {
    reset();
    setImage(undefined);
    setImagePreview(undefined);
    setImageUploadError("");
  }, [reset]);

  const condition_scale = watch("condition_scale");
  const num_inference_steps = watch("num_inference_steps");

  const onSubmit: SubmitHandler<ReplicateParams> = useCallback(
    async (formData) => {
      if (!image) {
        setImageUploadError("Please select an image");
      } else {
        applyEffect(image, formData);
      }
    },
    [image, applyEffect],
  );

  return (
    <div className="flex flex-col gap-x-5 mx-5 lg:mx-24 mt-10 w-full">
      <div className="flex flex-col">
        <div className="space-y-5">
          <div className="w-full md:w-1/3">
            {image ? (
              <div>
                <img alt="Day image" src={imagePreview} />
              </div>
            ) : (
              <ImageUpload onUpload={setImage} />
            )}
            <div className="ml-2">
              <Typography color="text-red-800">{imageUploadError}</Typography>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6 w-full"
          >
            <div className="w-full md:w-1/3">
              <Typography color="text-emerald-700">Prompt</Typography>
              <Controller
                name="prompt"
                control={control}
                render={({
                  field: { onChange, name, onBlur },
                  fieldState: { error },
                }) => (
                  <TextArea
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:w-1/3">
              <Typography color="text-emerald-700">Negative Prompt</Typography>
              <Controller
                name="negative_prompt"
                control={control}
                render={({
                  field: { onChange, name, onBlur },
                  fieldState: { error },
                }) => (
                  <TextArea
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:w-1/3">
              <Typography color="text-emerald-700">
                {`Number of decision steps – ${num_inference_steps}`}
              </Typography>
              <Controller
                name="num_inference_steps"
                control={control}
                render={({
                  field: { onChange, name, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    type="range"
                    name={name}
                    defaultValue={String(value)}
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:w-1/3">
              <Typography color="text-emerald-700">
                {`Conditioning scale for generalization – ${condition_scale}`}
              </Typography>
              <Controller
                name="condition_scale"
                control={control}
                render={({
                  field: { onChange, name, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    type="range"
                    name={name}
                    defaultValue={String(value * 100)}
                    onChange={(value) => {
                      onChange(Number(value) / 100);
                    }}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>

            <div className="w-full md:w-1/3 flex gap-x-2 justify-end">
              <Button
                variant="secondary"
                isDisabled={isLoading}
                onPress={onReset}
              >
                Reset
              </Button>
              <Button type="submit" isDisabled={isLoading}>
                Run
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-full md:w-1/3">
          <div className="mt-10">
            {isLoading ? (
              <div className="flex justify-center mt-20">
                <LoadingIndicator />
              </div>
            ) : result ? (
              <img alt="Dusk image" src={result} />
            ) : error.isError ? (
              <div className="flex justify-center mt-20">
                <Typography color="text-red-800">{error.msg}</Typography>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
