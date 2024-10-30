# React Select Search Plus

A flexible and customizable select component with search functionality for React applications.

## Features

- 🔍 Search functionality with customizable filtering
- ✨ Single and multiple selection modes
- 🎨 Fully customizable styling
- 🔄 Async data loading support
- 🎯 TypeScript support
- ⌨️ Keyboard navigation
- 🎭 Custom option rendering
- 📱 Mobile-friendly

## Installation

```bash
npm install react-select-search-plus
# or
yarn add react-select-search-plus
```

## Basic Usage

```tsx
import { SelectSearch } from 'react-select-search-plus';

const options = [
  { id: 1, label: 'Option 1', value: 'value1' },
  { id: 2, label: 'Option 2', value: 'value2' },
  { id: 3, label: 'Option 3', value: 'value3' },
];

function MyComponent() {
  const handleChange = (selected) => {
    console.log('Selected options:', selected);
  };

  return (
    <SelectSearch
      options={options}
      onChange={handleChange}
      multiple
      searchPlaceholder="Search options..."
    />
  );
}
```

## Advanced Usage

### Async Data Loading

### if you are using typescript do not use any clear your response interface

```tsx
function AsyncExample() {
  const fetchOptions = async () => {
    const response = await fetch('https://api.example.com/options');
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      label: item.name,
      value: item
    }));
  };

  return (
    <SelectSearch
      fetchOptions={fetchOptions}
      loading={true}
      loadingMessage="Fetching options..."
    />
  );
}
```

### Custom Filtering

```tsx
function CustomFilterExample() {
  const customFilter = (option, searchTerm) => {
    // Custom filtering logic
    return option.label.toLowerCase().startsWith(searchTerm.toLowerCase());
  };

  return (
    <SelectSearch
      options={options}
      customFilter={customFilter}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | `[]` | Array of options to display |
| `value` | `Option[]` | `[]` | Currently selected options |
| `onChange` | `(selected: Option[]) => void` | - | Callback when selection changes |
| `onSearch` | `(searchTerm: string) => void` | - | Callback when search input changes |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disable the component |
| `loading` | `boolean` | `false` | Show loading state |
| `searchPlaceholder` | `string` | `"Type to search..."` | Placeholder text for search input |
| `noOptionsMessage` | `string` | `"No options found"` | Message when no options match search |
| `loadingMessage` | `string` | `"Loading..."` | Message during loading state |
| `className` | `string` | `""` | Additional CSS class for container |
| `optionClassName` | `string` | `""` | Additional CSS class for options |
| `selectedClassName` | `string` | `""` | Additional CSS class for selected options |
| `fetchOptions` | `() => Promise<Option[]>` | - | Async function to fetch options |
| `customFilter` | `(option: Option, searchTerm: string) => boolean` | - | Custom filter function |
| `maxSelected` | `number` | - | Maximum number of selections allowed |

## Styling

The component comes with basic styling that you can extend or override using CSS classes. Each element has a specific class name that you can target:

```css
  .this .comment is styles with .taildwindcss you can style with any css class 
```

## TypeScript Usage

The component is fully typed and supports generic types for option values:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserSelect() {
  return (
    <SelectSearch<User>
      options={[
        {
          id: 1,
          label: 'John Doe',
          value: { id: 1, name: 'John Doe', email: 'john@example.com' }
        }
      ]}
      onChange={(selected) => {
        // selected[0].value will be typed as User
        console.log(selected[0].value.email);
      }}
    />
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change. i remain Anthony JR👌🤣❤️

## License

ISC License - see the LICENSE file for details.