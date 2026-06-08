interface FormInputProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border bg-background px-4 outline-none"
      />
    </div>
  );
}