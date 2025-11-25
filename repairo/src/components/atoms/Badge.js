import { JobStatus, UserStatus, formatStatus } from '@/interfaces/api.types';

export default function Badge({ children, status = 'default' }) {
  const statusStyles = {
    default: 'bg-gray-200 text-gray-800',
    [JobStatus.PENDING]: 'bg-yellow-200 text-yellow-800',
    [JobStatus.ASSIGNED]: 'bg-blue-200 text-blue-800',
    [JobStatus.IN_PROGRESS]: 'bg-purple-200 text-purple-800',
    [JobStatus.COMPLETED]: 'bg-green-200 text-green-800',
    [JobStatus.CANCELLED]: 'bg-red-200 text-red-800',
    [UserStatus.ACTIVE]: 'bg-green-200 text-green-800',
    [UserStatus.INACTIVE]: 'bg-gray-200 text-gray-800',
    [UserStatus.PENDING]: 'bg-yellow-200 text-yellow-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.default}`}>
      {formatStatus(children)}
    </span>
  );
}