type FormSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function FormSelect({
  label,
  value,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border bg-background px-4 outline-none"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}