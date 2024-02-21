import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@/ui/Icons";
import { styles as textInputStyles } from "@/ui/TextInput";
import { cva, cx, type VariantProps } from "class-variance-authority";
import type { Intersection } from "@/utils/utility-types";

type Option =
  | string
  | {
      name: string;
    };

type Props<T extends Option> = Intersection<
  {
    options: T[];
    selected?: T;
    onChange: (option: T) => void;
    placeholder?: string;
    renderOption?: (option: T) => JSX.Element;
    renderSelected?: (selected: T) => JSX.Element;
    errorMessage?: string;
  } & VariantProps<typeof styles>
>;

export function Select<T extends Option>({
  placeholder = "Select an option",
  options,
  selected,
  onChange,
  variant,
  renderOption,
  renderSelected,
  errorMessage,
}: Props<T>) {
  const selectedOption =
    typeof selected === "string" ? selected : selected?.name;

  return (
    <div>
      <Listbox value={selected || ""} by="name" onChange={onChange}>
        {() => (
          <div className="relative">
            <Listbox.Button
              className={styles({
                variant,
                className: cx([
                  "bg-white flex items-center justify-between w-full",
                ]),
              })}
            >
              {
                <div className="ml-2">
                  {renderSelected && selected ? (
                    renderSelected(selected)
                  ) : typeof selected === "string" ? (
                    <span className="block truncate text-left">
                      {selectedOption}
                    </span>
                  ) : (
                    <span className="block truncate text-left">
                      {selected?.name || placeholder}
                    </span>
                  )}
                </div>
              }
              <ChevronDownIcon
                className="h-5 w-5 pointer-events-none mx-2"
                aria-hidden="true"
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={optionsStyles()}>
                {options.map((option, optionIndex) => (
                  <Listbox.Option
                    key={optionIndex}
                    className={({ active }) =>
                      cx([
                        "relative cursor-pointer select-none py-2 pl-4 pr-10",
                        active ? "bg-emerald-700 text-white" : "",
                      ])
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        {renderOption ? (
                          renderOption(option)
                        ) : (
                          <span
                            className={`block truncate ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {typeof option === "string" ? option : option.name}
                          </span>
                        )}
                        {selected ? (
                          <span
                            className={cx([
                              "absolute inset-y-0 right-0 flex items-center pr-3",
                              active ? "text-white" : "text-emerald-800",
                            ])}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>

      {errorMessage && (
        <p className="block mt-0.5 ml-2 text-sm text-red-800" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

const styles = cva("", {
  variants: {
    variant: {
      default: textInputStyles({
        className: "text-left",
      }),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const optionsStyles = cva(
  cx([
    "absolute",
    "z-10",
    "mt-1",
    "max-h-60",
    "w-full",
    "overflow-auto",
    "py-1",
    "text-base",
    "shadow-lg",
    "focus:outline-none",
    "sm:text-sm",
    "custom-scrollbar",
    "bg-gray-100",
    "divide-y",
    "divide-gray-200",
  ]),
  {
    variants: {
      variant: {
        default: ["bg-white"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
