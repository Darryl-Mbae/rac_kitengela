"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles in your global CSS or layout:
// import "swiper/css";
// import "swiper/css/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Story {
  id: string;
  /** Background color for the story slide */
  color: string;
  /** Content to show in the story (emoji, image URL, etc.) */
  content: string;
}

export interface Highlight {
  id: string;
  name: string;
  /** Thumbnail shown in the ring — emoji string or image URL */
  thumbnail: string;
  /** Ring gradient start color */
  color: string;
  stories: Story[];
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const HIGHLIGHTS: Highlight[] = [
  {
    id: "1",
    name: "Travel",
    thumbnail: "✈️",
    color: "#f09433",
    stories: [
      { id: "s1", color: "#2980b9", content: "✈️" },
      { id: "s2", color: "#1a6ea8", content: "🗺️" },
      { id: "s3", color: "#0d5a8e", content: "🌍" },
    ],
  },
  {
    id: "2",
    name: "Food",
    thumbnail: "🍜",
    color: "#e67e22",
    stories: [
      { id: "s1", color: "#e67e22", content: "🍜" },
      { id: "s2", color: "#d35400", content: "🍣" },
    ],
  },
  {
    id: "3",
    name: "Fitness",
    thumbnail: "💪",
    color: "#27ae60",
    stories: [
      { id: "s1", color: "#27ae60", content: "💪" },
      { id: "s2", color: "#1e8449", content: "🏋️" },
      { id: "s3", color: "#196f3d", content: "🧘" },
    ],
  },
  {
    id: "4",
    name: "Friends",
    thumbnail: "🥂",
    color: "#8e44ad",
    stories: [
      { id: "s1", color: "#8e44ad", content: "🥂" },
      { id: "s2", color: "#7d3c98", content: "🎉" },
    ],
  },
  {
    id: "5",
    name: "Art",
    thumbnail: "🎨",
    color: "#e74c3c",
    stories: [
      { id: "s1", color: "#e74c3c", content: "🎨" },
      { id: "s2", color: "#cb4335", content: "🖌️" },
      { id: "s3", color: "#b03a2e", content: "🖼️" },
    ],
  },
  {
    id: "6",
    name: "Music",
    thumbnail: "🎵",
    color: "#16a085",
    stories: [
      { id: "s1", color: "#16a085", content: "🎵" },
      { id: "s2", color: "#138d75", content: "🎸" },
    ],
  },
  {
    id: "7",
    name: "Pets",
    thumbnail: "🐾",
    color: "#d35400",
    stories: [
      { id: "s1", color: "#d35400", content: "🐾" },
      { id: "s2", color: "#ba4a00", content: "🐶" },
      { id: "s3", color: "#a04000", content: "🐱" },
    ],
  },
  {
    id: "8",
    name: "Home",
    thumbnail: "🏡",
    color: "#2c3e50",
    stories: [
      { id: "s1", color: "#2c3e50", content: "🏡" },
      { id: "s2", color: "#273746", content: "🛋️" },
    ],
  },
];

// ─── Story Viewer ─────────────────────────────────────────────────────────────

const STORY_DURATION_MS = 4000;

interface ViewerProps {
  highlights: Highlight[];
  startHighlightIndex: number;
  onClose: () => void;
}

function StoryViewer({ highlights, startHighlightIndex, onClose }: ViewerProps) {
  const [highlightIdx, setHighlightIdx] = useState(startHighlightIndex);
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentHighlight = highlights[highlightIdx];
  const currentStories = currentHighlight.stories;
  const totalStories = currentStories.length;

  const startTimer = () => {
    clearInterval(intervalRef.current!);
    setProgress(0);
    const step = 100 / (STORY_DURATION_MS / 50);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          clearInterval(intervalRef.current!);
          return 100;
        }
        return p + step;
      });
    }, 50);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightIdx, storyIdx]);

  // Auto-advance when progress hits 100
  useEffect(() => {
    if (progress >= 100) advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const advance = () => {
    if (storyIdx < totalStories - 1) {
      setStoryIdx((i) => i + 1);
    } else if (highlightIdx < highlights.length - 1) {
      setHighlightIdx((i) => i + 1);
      setStoryIdx(0);
    } else {
      onClose();
    }
  };

  const goBack = () => {
    if (storyIdx > 0) {
      setStoryIdx((i) => i - 1);
    } else if (highlightIdx > 0) {
      setHighlightIdx((i) => i - 1);
      setStoryIdx(0);
    }
  };

  const story = currentStories[storyIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Story Card */}
      <div
        className="relative w-[320px] h-[560px] rounded-2xl overflow-hidden flex flex-col select-none"
        style={{ background: story.color }}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {currentStories.map((_, i) => (
            <div key={i} className="h-[2px] flex-1 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-none"
                style={{
                  width:
                    i < storyIdx
                      ? "100%"
                      : i === storyIdx
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-3 right-3 flex items-center z-10">
          <div
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm font-semibold text-white"
            style={{ background: currentHighlight.color }}
          >
            {currentHighlight.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="ml-2 text-sm font-medium text-white">{currentHighlight.name}</span>
          <span className="ml-2 text-xs text-white/60">now</span>
          <button
            onClick={onClose}
            className="ml-auto text-white p-1"
            aria-label="Close stories"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Story content */}
        <div className="flex-1 flex items-center justify-center text-8xl">
          {story.content}
        </div>

        {/* Tap zones */}
        <div className="absolute inset-0 flex" style={{ top: 60 }}>
          <div className="flex-1 cursor-pointer" onClick={goBack} />
          <div className="flex-1 cursor-pointer" onClick={advance} />
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3">
          <div className="flex-1 bg-white/10 border border-white/25 rounded-full px-4 py-2 text-xs text-white/60 cursor-text">
            Reply to {currentHighlight.name}...
          </div>
          <button
            onClick={() => setLiked((l) => !l)}
            aria-label="Like"
            className="transition-transform active:scale-125"
          >
            {liked ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#e74c3c" stroke="#e74c3c" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Highlight Ring Item ───────────────────────────────────────────────────────

interface HighlightItemProps {
  highlight: Highlight;
  onClick: () => void;
}

function HighlightItem({ highlight, onClick }: HighlightItemProps) {
  const isEmoji = /\p{Emoji}/u.test(highlight.thumbnail);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
      aria-label={`View ${highlight.name} highlights`}
    >
      {/* Gradient ring */}
      <div
        className="w-[70px] h-[70px] rounded-full p-[2.5px]"
        style={{
          background: `linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)`,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden flex items-center justify-center text-2xl"
          style={{ background: highlight.color }}
        >
          {isEmoji ? (
            <span>{highlight.thumbnail}</span>
          ) : (
            <img
              src={highlight.thumbnail}
              alt={highlight.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <span className="text-[11px] text-gray-600 dark:text-gray-400 w-[70px] text-center truncate group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {highlight.name}
      </span>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface HighlightsProps {
  /** Pass your own highlights array or leave empty to use sample data */
  highlights?: Highlight[];
}

export default function Highlights({ highlights = HIGHLIGHTS }: HighlightsProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);

  const openViewer = (idx: number) => {
    setActiveHighlight(idx);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="w-full py-2 pl-3">

        {/* ── Desktop: all items in a scrollable row ── */}
<div className="hidden sm:flex w-full flex-row justify-end items-end gap-5 overflow-x-auto scrollbar-hide pb-1">          {highlights.map((h, i) => (
            <HighlightItem key={h.id} highlight={h} onClick={() => openViewer(i)} />
          ))}
        </div>

        {/* ── Mobile: SwiperJS swiper ── */}
        <div className="sm:hidden relative px-2">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            slidesPerView={4}
            spaceBetween={16}
            slidesPerGroup={2}
            className="!overflow-visible"
          >
            {highlights.map((h, i) => (
              <SwiperSlide key={h.id} className="!w-auto">
                <HighlightItem highlight={h} onClick={() => openViewer(i)} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav buttons */}
          {/* <button
            className="swiper-prev-btn absolute -left-3 top-1/2 -translate-y-3/4 z-10 w-7 h-7 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center shadow-sm disabled:opacity-30"
            aria-label="Previous highlights"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="swiper-next-btn absolute -right-3 top-1/2 -translate-y-3/4 z-10 w-7 h-7 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center shadow-sm disabled:opacity-30"
            aria-label="Next highlights"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Story Viewer */}
      {viewerOpen && (
        <StoryViewer
          highlights={highlights}
          startHighlightIndex={activeHighlight}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
}