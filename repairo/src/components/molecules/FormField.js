import Input from '../atoms/Input';

export default function FormField({ 
  label, 
  error, 
  required = false,
  ...inputProps 
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input required={required} {...inputProps} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}