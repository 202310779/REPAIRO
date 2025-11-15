import JobCard from './JobCard';

export default function JobList({ jobs = [], onViewJob, onUpdateJob, emptyMessage = 'No jobs found' }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onView={onViewJob}
          onUpdate={onUpdateJob}
        />
      ))}
    </div>
  );
}