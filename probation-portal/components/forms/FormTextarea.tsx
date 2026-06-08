interface FormTextareaProps {
  label: string;
  placeholder?: string;
}

export default function FormTextarea({label,placeholder,}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <textarea
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-xl border p-4"
      />
    </div>
  );
}