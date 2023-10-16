import { Filter } from "@/types/filters";

import { ChangeEvent, memo } from "react";
import { JsxElement } from "typescript";

type Props = {
  heading: string;
  filters: Array<Filter>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterCheckboxGroup = memo<Props>((props: Props) => {
  return (
    <div className="pt-2">
      <h3 className="text-base font-semibold text-white capitalize">
        {props.heading}
      </h3>
      <div className="flex-1 pt-2">
        {props.filters.map((filter) => (
          <div key={filter.value} className="flex items-center space-x-2 py-1">
            <input
              type="checkbox"
              name={filter.label}
              id={filter.value}
              value={filter.value}
              onChange={props.onChange}
            />
            <label
              className="first-letter:capitalize text-neutral-300"
              htmlFor={filter.value}
            >
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FilterCheckboxGroup;
