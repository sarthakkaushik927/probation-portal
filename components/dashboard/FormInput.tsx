interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export default function FormInput({
  label,
  placeholder,
  type = "text",
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border px-4"
      />
    </div>
  );
}