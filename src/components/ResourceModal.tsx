import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Resource {
  id: string;
  title: string;
  content: string;
  description?: string;
}

interface ResourceModalProps {
  isOpen: boolean;
  resource: Resource | null;
  onClose: () => void;
}

function ResourceModal({ isOpen, resource, onClose }: ResourceModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && resource && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A0A14]/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-modal-title"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(139,15,50,0.45)] ring-1 ring-black/5 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-primary px-7 py-6 flex justify-between items-start overflow-hidden">
              {/* subtle radial texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 85% 20%, white 0%, transparent 45%)",
                }}
              />

              <div className="relative flex-1 pr-4">
                <h2
                  id="resource-modal-title"
                  className="font-display text-[1.9rem] leading-tight font-bold text-white tracking-tight"
                >
                  {resource.title}
                </h2>
                {resource.description && (
                  <p className="font-sans text-[13px] text-white/75 mt-2 leading-relaxed max-w-md">
                    {resource.description}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="relative text-white/90 hover:text-white hover:bg-white/15 active:scale-95 p-2 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-7 py-6 bg-[#FDF7F8] scrollbar-thin scrollbar-thumb-[#C98BA0] scrollbar-track-transparent">
              <div className="font-sans prose prose-sm max-w-none text-[#3D2530]">
                {typeof resource.content === "string" ? (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {resource.content}
                  </p>
                ) : (
                  resource.content
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[#F0DCE2] px-6 py-4 flex justify-end">
              <button
                onClick={onClose}
                className="font-sans px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-[#731029] active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1238]/50 focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ResourceModal;