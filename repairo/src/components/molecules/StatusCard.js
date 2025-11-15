import Badge from '../atoms/Badge';

export default function StatusCard({ label, value, status }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {status && <Badge status={status}>{status}</Badge>}
      </div>
    </div>
  );
}