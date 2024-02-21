import React from "react";
import { Fragment } from "react";
import { Combobox as UICombobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@/ui/Icons";
import { styles as textInputStyles } from "@/ui/TextInput";
import { Checkbox } from "@/ui/Checkbox";
import { optionsStyles } from "@/ui/Select";

type Option =
  | string
  | {
      name: string;
    };

type Props<T extends Option> = {
  options: T[];
  selected?: T[];
  onChange: (option: T[]) => void;
  placeholder?: string;
  renderOption?: (option: T[]) => JSX.Element;
  disabled?: boolean;
  max?: number;
  min?: number;
  errorMessage?: string;
};

export function MultiCombobox<T extends Option>({
  options,
  selected,
  onChange,
  placeholder,
  renderOption,
  disabled,
  max,
  min,
  errorMessage,
}: Props<T>) {
  return (
    <div className="top-16">
      <UICombobox
        value={selected || []}
        onChange={onChange}
        disabled={disabled}
        multiple
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden mt-1">
            <UICombobox.Input
              placeholder={placeholder}
              className={textInputStyles()}
              displayValue={() => (selected ? selected.join(", ") : "")}
              autoComplete="off"
            />
            <UICombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
            </UICombobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UICombobox.Options className={optionsStyles()}>
              {options.map((option, index) => {
                const name = typeof option === "string" ? option : option.name;

                const isNotSelected = !selected?.some((selectedOption) => {
                  const selectedName =
                    typeof selectedOption === "string"
                      ? selectedOption
                      : selectedOption.name;
                  return selectedName === name;
                });

                const disabled =
                  (isNotSelected && selected?.length === max) ||
                  (!isNotSelected && selected?.length === min);

                return (
                  <UICombobox.Option
                    key={`${name}-${index}`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-10 ${
                        active ? "bg-emerald-700 text-white" : ""
                      }`
                    }
                    value={option}
                    disabled={disabled}
                  >
                    {({ selected }) => (
                      <>
                        {renderOption ? (
                          renderOption([option])
                        ) : (
                          <span
                            className={`block truncate ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {name}
                          </span>
                        )}
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Checkbox
                            isSelected={selected}
                            aria-label="Selected"
                          />
                        </span>
                      </>
                    )}
                  </UICombobox.Option>
                );
              })}
            </UICombobox.Options>
          </Transition>
        </div>
      </UICombobox>

      {errorMessage && (
        <p className="block mt-0.5 ml-2 text-sm text-red-800" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
