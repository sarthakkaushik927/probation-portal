import React from "react";

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <textarea
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border p-4"
      />
    </div>
  );
}