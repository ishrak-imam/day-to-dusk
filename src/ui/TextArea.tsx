import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AriaTextFieldProps, useTextField } from "react-aria";
import { Intersection } from "@/utils/utility-types";

export type Props = Intersection<
  VariantProps<typeof styles> & {
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
  } & AriaTextFieldProps
>;

export function TextArea({ textSize, ...props }: Props) {
  const ref = React.useRef(null);
  const { inputProps, errorMessageProps } = useTextField(
    { ...props, "aria-label": props.name, inputElementType: "textarea" },
    ref,
  );

  return (
    <>
      <div className="relative">
        <textarea {...inputProps} className={styles({ textSize })} ref={ref} />
        {props.icon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 invisible md:visible">
            {props.icon}
          </div>
        )}
        {props.suffix}
      </div>
      {props.errorMessage && (
        <p
          {...errorMessageProps}
          className="block mt-0.5 ml-2 text-sm text-red-800"
          id="email-error"
        >
          <>{props.errorMessage}</>
        </p>
      )}
    </>
  );
}

export const styles = cva(
  "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700 sm:text-sm sm:leading-6",
  {
    variants: {
      textSize: {
        xs: "text-xs md:text-sm",
        sm: "text-sm md:text-base",
        md: "text-base md:text-lg",
        lg: "text-lg md:text-xl",
      },
    },
    defaultVariants: {
      textSize: "xs",
    },
  },
);
