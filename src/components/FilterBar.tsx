interface FilterBarProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  resultCount: number;
}

export function FilterBar({ options, selected, onSelect, resultCount }: FilterBarProps) {
  return (
    <div className="filter-bar" aria-label="按项目名称筛选">
      <div className="filter-bar__controls">
        {options.map((option) => (
          <button key={option} type="button" aria-pressed={selected === option} onClick={() => onSelect(option)}>
            {option}
          </button>
        ))}
      </div>
      <output aria-live="polite">{resultCount} 个项目</output>
    </div>
  );
}
