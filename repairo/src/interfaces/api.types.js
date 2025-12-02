// ============================================
// TYPE DEFINITIONS (JSDoc)
// ============================================

/**
 * @typedef {Object} User
 * @property {string} _id - User unique identifier
 * @property {string} username - Username
 * @property {string} email - User email address
 * @property {string} password - Hashed password
 * @property {'customer' | 'technician' | 'admin'} role - User role
 * @property {'active' | 'inactive' | 'pending'} [status] - User status
 * @property {Date} createdAt - Account creation date
 * @property {Date} [updatedAt] - Last update date
 */

/**
 * @typedef {Object} RepairJob
 * @property {string} _id - Job unique identifier
 * @property {string} title - Job title
 * @property {string} description - Job description
 * @property {string} issueDescription - Issue description
 * @property {string} deviceType - Type of device
 * @property {'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'} status - Job status
 * @property {'low' | 'medium' | 'high' | 'urgent'} [priority] - Job priority
 * @property {number} [estimatedCost] - Estimated cost
 * @property {string} [technicianId] - Assigned technician ID
 * @property {string} [customerId] - Customer ID
 * @property {Date} createdAt - Job creation date
 * @property {Date} [updatedAt] - Last update date
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT authentication token
 * @property {User} user - Authenticated user data
 * @property {string} [message] - Optional message
 */

/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {T} [data] - Response data
 * @property {boolean} success - Whether request was successful
 * @property {string} [message] - Response message
 * @property {string} [error] - Error message if failed
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} total - Total jobs
 * @property {number} pending - Pending jobs
 * @property {number} inProgress - In progress jobs
 * @property {number} completed - Completed jobs
 */

// ============================================
// CONSTANTS
// ============================================

export const UserRole = {
  CUSTOMER: "customer",
  TECHNICIAN: "technician",
  ADMIN: "admin",
};

export const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
};

export const JobStatus = {
  PENDING: "pending",
  ASSIGNED: "assigned",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const formatStatus = (status) => {
  if (!status) return "";
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const isValidJobStatus = (status) => {
  return Object.values(JobStatus).includes(status);
};

export const isValidUserRole = (role) => {
  return Object.values(UserRole).includes(role);
};
