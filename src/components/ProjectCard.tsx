
export interface Project {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status?: string;
  tags?: string[];
  location?: string;
  highlight?: string;
  startDate?: string;
  estimatedCompletion?: string | null;
  budget?: number;
  partners?: string[];
  details?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const isCompleted = project.status?.includes("Completed");

  return (
    <div className="border rounded-2xl cursor-pointer border-gray-200 p-4 transition-all hover:-translate-y-1 ease-in-out duration-200">
      {/* Image */}
      <div className="relative w-full aspect-[1/0.6] rounded-2xl overflow-hidden bg-[#f7f7f7]">
        <img
          src={project?.image || "https://via.placeholder.com/400x240"}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {isCompleted && (
          <span className="absolute top-3 right-3 text-xs font-medium bg-primary text-white px-3 py-1 rounded-full">
            {project.status}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="my-3 text-lg font-medium font-display">{project.title}</h3>

      {/* Description */}
      <p className="line-clamp-2 text-sm text-gray-600">{project.description}</p>

      {/* Tags/Hashtags */}
      {project.tags && project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{project.tags.length - 2} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;