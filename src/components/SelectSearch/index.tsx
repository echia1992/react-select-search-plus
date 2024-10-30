"use client"
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Option, SelectSearchProps } from "../../types";

function SelectSearch<T>({
  options: initialOptions = [],
  value = [],
  onChange,
  onSearch,
  multiple = false,
  disabled = false,
  loading = false,
  searchPlaceholder = "Type to search...",
  noOptionsMessage = "No options found",
  loadingMessage = "Loading...",
  className = "",
  optionClassName = "",
  selectedClassName = "",
  fetchOptions,
  customFilter,
  maxSelected,
}: SelectSearchProps<T>) {
  const [options, setOptions] = useState<Option<T>[]>(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>(value);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadOptions = async () => {
      if (fetchOptions) {
        try {
          const fetchedOptions = await fetchOptions();
          setOptions(fetchedOptions);
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions([]);
        }
      }
    };
    loadOptions();
  }, [fetchOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilter = useCallback(
    (option: Option<T>, term: string) => {
      if (customFilter) return customFilter(option, term);
      return option.label.toLowerCase().includes(term.toLowerCase());
    },
    [customFilter]
  );

  const filteredOptions = searchTerm
    ? options.filter((option) => handleFilter(option, searchTerm))
    : options;

  const handleSelect = (option: Option<T>) => {
    if (disabled) return;

    let newSelected: Option<T>[];
    if (multiple) {
      if (maxSelected && selectedOptions.length >= maxSelected) return;
      newSelected = selectedOptions.some(
        (selected) => selected.id === option.id
      )
        ? selectedOptions
        : [...selectedOptions, option];
    } else {
      newSelected = [option];
      setIsOpen(false);
    }

    setSelectedOptions(newSelected);
    onChange?.(newSelected);
    setSearchTerm("");
  };

  const handleRemove = (optionId: string | number) => {
    if (disabled) return;

    const newSelected = selectedOptions.filter(
      (option) => option.id !== optionId
    );
    setSelectedOptions(newSelected);
    onChange?.(newSelected);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch?.(term);
    setIsOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full font-sans ${className}`}
    >
      <div
        className={`relative border border-gray-300 rounded-md bg-white transition duration-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex flex-wrap gap-1 p-1 min-h-[2.5rem]">
          {selectedOptions.map((option) => (
            <span
              key={option.id}
              className={`inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm truncate ${selectedClassName}`}
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.id)}
                className="ml-1 p-0.5 bg-none border-none text-blue-800 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                disabled={disabled}
                aria-label={`Remove ${option.label}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            placeholder={searchPlaceholder}
            disabled={disabled}
            className="flex-1 min-w-[120px] border-none outline-none px-2 py-1 text-sm bg-transparent placeholder-gray-400 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <ul className="absolute top-full left-0 right-0 z-10 mt-1 p-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <li className="p-3 text-center text-gray-500 text-sm">
              <span className="inline-block w-4 h-4 mr-2 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
              {loadingMessage}
            </li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 ${
                  selectedOptions.some((selected) => selected.id === option.id)
                    ? "bg-blue-100 text-blue-800"
                    : ""
                } ${optionClassName}`}
                role="option"
                aria-selected={selectedOptions.some(
                  (selected) => selected.id === option.id
                )}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-3 text-center text-gray-500 text-sm">
              {noOptionsMessage}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SelectSearch;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { Option, SelectSearchProps } from "../../types";
// import styles from "./styles.module.css";

// function SelectSearch<T>({
//   options: initialOptions = [],
//   value = [],
//   onChange,
//   onSearch,
//   multiple = false,
//   disabled = false,
//   loading = false,
//   searchPlaceholder = "Type to search...",
//   noOptionsMessage = "No options found",
//   loadingMessage = "Loading...",
//   className = "",
//   optionClassName = "",
//   selectedClassName = "",
//   fetchOptions,
//   customFilter,
//   maxSelected,
// }: SelectSearchProps<T>) {
//   const [options, setOptions] = useState<Option<T>[]>(initialOptions);
//   const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>(value);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadOptions = async () => {
//       if (fetchOptions) {
//         try {
//           const fetchedOptions = await fetchOptions();
//           setOptions(fetchedOptions);
//         } catch (error) {
//           console.error("Error fetching options:", error);
//           setOptions([]);
//         }
//       }
//     };

//     loadOptions();
//   }, [fetchOptions]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFilter = useCallback(
//     (option: Option<T>, term: string) => {
//       if (customFilter) {
//         return customFilter(option, term);
//       }
//       return option.label.toLowerCase().includes(term.toLowerCase());
//     },
//     [customFilter]
//   );

//   const filteredOptions = searchTerm
//     ? options.filter((option) => handleFilter(option, searchTerm))
//     : options;

//   const handleSelect = (option: Option<T>) => {
//     if (disabled) return;

//     let newSelected: Option<T>[];
//     if (multiple) {
//       if (maxSelected && selectedOptions.length >= maxSelected) {
//         return;
//       }
//       newSelected = selectedOptions.some(
//         (selected) => selected.id === option.id
//       )
//         ? selectedOptions
//         : [...selectedOptions, option];
//     } else {
//       newSelected = [option];
//       setIsOpen(false);
//     }

//     setSelectedOptions(newSelected);
//     onChange?.(newSelected);
//     setSearchTerm("");
//   };

//   const handleRemove = (optionId: string | number) => {
//     if (disabled) return;

//     const newSelected = selectedOptions.filter(
//       (option) => option.id !== optionId
//     );
//     setSelectedOptions(newSelected);
//     onChange?.(newSelected);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     onSearch?.(term);
//     setIsOpen(true);
//   };

//   return (
//     <div ref={containerRef} className={`${styles.container} ${className}`}>
//       <div
//         className={`${styles.selectContainer} ${
//           disabled ? styles.disabled : ""
//         }`}
//       >
//         <div className={styles.selectedOptions}>
//           {selectedOptions.map((option) => (
//             <span
//               key={option.id}
//               className={`${styles.selectedOption} ${selectedClassName}`}
//             >
//               {option.label}
//               <button
//                 type="button"
//                 onClick={() => handleRemove(option.id)}
//                 className={styles.removeButton}
//                 disabled={disabled}
//                 aria-label={`Remove ${option.label}`}
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             onFocus={() => setIsOpen(true)}
//             placeholder={searchPlaceholder}
//             disabled={disabled}
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <ul className={styles.optionsList} role="listbox">
//           {loading ? (
//             <li className={styles.messageContainer}>
//               <span className={styles.loadingSpinner} />
//               {loadingMessage}
//             </li>
//           ) : filteredOptions.length > 0 ? (
//             filteredOptions.map((option) => (
//               <li
//                 key={option.id}
//                 onClick={() => handleSelect(option)}
//                 className={`${styles.optionItem} ${
//                   selectedOptions.some((selected) => selected.id === option.id)
//                     ? styles.selected
//                     : ""
//                 } ${optionClassName}`}
//                 role="option"
//                 aria-selected={selectedOptions.some(
//                   (selected) => selected.id === option.id
//                 )}
//               >
//                 {option.label}
//               </li>
//             ))
//           ) : (
//             <li className={styles.messageContainer}>{noOptionsMessage}</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SelectSearch;
