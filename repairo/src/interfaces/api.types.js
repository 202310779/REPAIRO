
export const UserRole = {
  CUSTOMER: 'customer',
  TECHNICIAN: 'technician',
  ADMIN: 'admin'
};

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};

export const JobStatus = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const formatStatus = (status) => {
  if (!status) return '';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const isValidJobStatus = (status) => {
  return Object.values(JobStatus).includes(status);
};

export const isValidUserRole = (role) => {
  return Object.values(UserRole).includes(role);
};