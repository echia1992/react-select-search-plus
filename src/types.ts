export interface Option<T = any> {
  id: string | number;
  label: string;
  value: T;
}
export interface SelectSearchProps<T = any> {
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
