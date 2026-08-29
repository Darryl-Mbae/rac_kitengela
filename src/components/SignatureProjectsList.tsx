import { useRef, useState } from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";

type SignatureProject = {
  id: string;
  title: string;
  image: string;
  description: string;
  status: string;
  highlight: string;
};

export default function SignatureProjectsList({
  projects,
}: {
  projects: SignatureProject[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imageTop, setImageTop] = useState(0);

  function handleEnter(idx: number) {
    setHovered(idx);
    const row = rowRefs.current[idx];
    const container = containerRef.current;
    if (row && container) {
      const rowRect = row.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setImageTop(rowRect.top - containerRect.top + rowRect.height / 2);
    }
  }

  return (
    <div
      ref={containerRef}
      className="scroll-mt-40 relative w-full bg-white rounded-xl overflow-visible"
    >
      {projects.map((project, idx) => {
        const isHovered = hovered === idx;
        return (
          <div
            key={project.title}
            ref={(el) => {
              rowRefs.current[idx] = el;
            }}
            onMouseEnter={() => handleEnter(idx)}
            onMouseLeave={() => setHovered(null)}
            className={`relative grid grid-cols-1 lg:grid-cols-[30%_20%_1fr] items-center gap-4 px-8 py-10 border-b border-black/10 last:border-b-0 transition-colors duration-300 cursor-pointer ${
              isHovered ? "bg-primary" : "bg-transparent"
            }`}
          >
            <div>
              <h3
                className={`text-2xl lg:text-3xl font-display font-medium ${
                  isHovered ? "text-white" : "text-black"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`text-sm mt-1 transition-colors ${
                  isHovered ? "text-white/80" : "text-black/40"
                }`}
              >
                {project.status}
              </p>
            </div>

            <div
              className={`text-xl font-medium font-display lg:px-12 ${
                isHovered ? "text-white" : "text-black/80"
              }`}
            >
              {project.highlight}
            </div>

            <div className="flex items-center justify-between gap-4">
              <p
                className={`text-sm max-w-xs transition-colors ${
                  isHovered ? "text-white/90" : "text-black/50"
                }`}
              >
                {project.description}
              </p>
              <span
                className={`flex items-center gap-1 text-sm font-medium rounded-full px-4 py-2 border shrink-0 transition ${
                  isHovered
                    ? "bg-white text-primary border-white"
                    : "border-black/20 text-black/60"
                }`}
              >
                See Project <HiMiniArrowUpRight />
              </span>
            </div>
          </div>
        );
      })}

      {hovered !== null && (
        <div
          className="hidden lg:block pointer-events-none absolute z-20 left-[40%] w-48 h-56 rounded-xl overflow-hidden shadow-2xl transition-[top] duration-300 ease-out"
          style={{ top: imageTop, transform: "translate(-50%, -50%)" }}
        >
          <img
            src={projects[hovered].image}
            alt={projects[hovered].title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}