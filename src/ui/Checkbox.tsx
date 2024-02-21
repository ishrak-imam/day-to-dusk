import type { AriaCheckboxProps } from "@react-types/checkbox";
import React, { useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { cx } from "class-variance-authority";
import { Intersection } from "@/utils/utility-types";

type Props = Intersection<AriaCheckboxProps>;

export function Checkbox(props: Props) {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const checkboxClassName = cx(
    state.isSelected
      ? "bg-emerald-800 group-active:bg-emerald-500"
      : "bg-white",
    "text-white",
    "border-2",
    "rounded",
    props.isDisabled
      ? "border-emerald-700"
      : isFocusVisible || state.isSelected
        ? "border-emerald-700 group-active:border-emerald-700"
        : "border-emerald-700 group-active:border-gray-600",
    "w-5",
    "h-5",
    "flex",
    "flex-shrink-0",
    "justify-center",
    "items-center",
    "mr-2",
    isFocusVisible ? "shadow-outline" : "",
    "transition",
    "ease-in-out",
    "duration-150",
  );

  const labelClassName = cx(
    props.isDisabled ? "text-gray-300" : "text-white",
    "select-none",
  );

  return (
    <label className="flex items-center group">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: "all 400ms",
            }}
          />
        </svg>
      </div>
      <span className={labelClassName}>{props.children}</span>
    </label>
  );
}
