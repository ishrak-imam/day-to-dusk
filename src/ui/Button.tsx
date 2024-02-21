import React from "react";
import { useButton, AriaButtonProps } from "react-aria";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import type { Intersection } from "@/utils/utility-types";

type Props = Intersection<
  VariantProps<typeof styles> &
    AriaButtonProps & {
      isLoading?: boolean;
      fullWidth?: boolean;
      icon?: React.ReactNode;
    }
>;

export function Button({
  variant,
  size = "sm",
  isLoading,
  fullWidth,
  icon,
  ...props
}: Props) {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);

  const extraClasses = cx([
    isLoading ? "cursor-progress" : "cursor-pointer",
    fullWidth ? "w-full" : "",
    buttonProps.disabled ? "cursor-not-allowed" : "",
  ]);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={styles({
        variant,
        size,
        className: extraClasses,
      })}
    >
      {isLoading ? (
        <LoadingIndicator
          size={size === "sm" ? "sm" : "md"}
          variant="secondary"
        />
      ) : null}
      {icon}
      {props.children}
    </button>
  );
}

export const styles = cva(
  "inline-flex items-center justify-center gap-x-2 font-medium shadow-sm focus:outline-none disabled:opacity-75",
  {
    variants: {
      variant: {
        primary: [
          "bg-emerald-600",
          "text-white",
          "hover:bg-emerald-500",
          "active:bg-emerald-600",
          "border-transparent",
          "rounded-md",
        ],
        secondary: [
          "text-emerald-700",
          "hover:bg-gray-300",
          "active:bg-gray-400",
          "active:text-white",
          "border-gray-400",
          "rounded-md",
        ],
        icon: ["text-white", "bg-transparent", "hover:bg-gray-400"],
      },
      size: {
        xs: ["text-xs", "py-1", "px-2"],
        sm: ["text-sm", "py-2", "px-3", "border-2"],
        lg: ["text-base", "py-3", "px-4", "border-2"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);
