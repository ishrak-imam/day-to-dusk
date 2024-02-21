import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

type Props = VariantProps<typeof styles>;

export function LoadingIndicator({ size, variant }: Props) {
  return (
    <div
      className={styles({ variant, size })}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

const styles = cva(
  "animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full",
  {
    variants: {
      variant: {
        primary: "text-emerald-700",
        secondary: "text-white",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
