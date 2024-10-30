import React from "react";
import { SelectSearchProps } from "../../types";
declare function SelectSearch<T>({ options: initialOptions, value, onChange, onSearch, multiple, disabled, loading, searchPlaceholder, noOptionsMessage, loadingMessage, className, optionClassName, selectedClassName, fetchOptions, customFilter, maxSelected, }: SelectSearchProps<T>): React.JSX.Element;
export default SelectSearch;
