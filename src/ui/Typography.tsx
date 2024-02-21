import React from "react";
import { cva, type VariantProps, cx } from "class-variance-authority";
import type { Intersection } from "@/utils/utility-types";
import { TextColor } from "@/ui/types";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";

type Props = Intersection<
  VariantProps<typeof styles> & {
    children: React.ReactNode;
    as?: TextElement;
    color?: TextColor;
    truncate?: boolean;
  }
>;

export function Typography({
  children,
  variant,
  fontWeight,
  align,
  fontFamily,
  color,
  as,
  truncate,
}: Props) {
  const Component = as || getComponentFromVariant(variant);

  const classes = cx([
    color,
    color ? "transition-colors ease-in-out delay-300" : "",
    truncate ? "truncate" : "",
  ]);

  return (
    <Component
      className={styles({
        className: classes,
        variant,
        fontWeight,
        fontFamily,
        align,
      })}
    >
      {children}
    </Component>
  );
}

function getComponentFromVariant(
  variant: VariantProps<typeof styles>["variant"],
): TextElement {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "body1":
    case "body2":
    case "body3":
      return "p";
    default:
      return "span";
  }
}

const styles = cva("", {
  variants: {
    variant: {
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      h4: "text-base md:text-lg",
      body1: "text-sm md:text-base",
      body2: "text-xs md:text-sm",
      body3: "text-xs",
    },
    fontWeight: {
      normal: "font-normal",
      bold: "font-bold",
      medium: "font-medium",
    },
    fontFamily: {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    },
    align: {
      center: "text-center",
      right: "text-right",
      left: "text-left",
      justify: "text-justify",
      start: "text-start",
      end: "text-end",
    },
  },
  defaultVariants: {
    variant: "body2",
    fontWeight: "normal",
    align: "left",
  },
});
