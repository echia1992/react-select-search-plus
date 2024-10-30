import React from 'react';

interface Option$1<T = any> {
    id: string | number;
    label: string;
    value: T;
}
interface SelectSearchProps$1<T = any> {
    options?: Option$1<T>[];
    value?: Option$1<T>[];
    onChange?: (selectedOptions: Option$1<T>[]) => void;
    onSearch?: (searchTerm: string) => void;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
    searchPlaceholder?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    className?: string;
    optionClassName?: string;
    selectedClassName?: string;
    fetchOptions?: () => Promise<Option$1<T>[]>;
    customFilter?: (option: Option$1<T>, searchTerm: string) => boolean;
    maxSelected?: number;
}

declare function SelectSearch<T>({ options: initialOptions, value, onChange, onSearch, multiple, disabled, loading, searchPlaceholder, noOptionsMessage, loadingMessage, className, optionClassName, selectedClassName, fetchOptions, customFilter, maxSelected, }: SelectSearchProps$1<T>): React.JSX.Element;

interface Option<T = any> {
    id: string | number;
    label: string;
    value: T;
}
interface SelectSearchProps<T = any> {
    options?: Option<T>[];
    value?: Option<T>[];
    onChange?: (selectedOptions: Option<T>[]) => void;
    onSearch?: (searchTerm: string) => void;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
    searchPlaceholder?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    className?: string;
    optionClassName?: string;
    selectedClassName?: string;
    fetchOptions?: () => Promise<Option<T>[]>;
    customFilter?: (option: Option<T>, searchTerm: string) => boolean;
    maxSelected?: number;
}

export { type Option, SelectSearch, type SelectSearchProps };
