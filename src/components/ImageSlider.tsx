import { useMemo, type CSSProperties } from "react";
import { galleryImages } from '../utils/images';

// Update chunking to handle objects
function chunkIntoColumns(images: typeof galleryImages) {
    const columns = [];
    let i = 0;
    let wantTwo = false;
    while (i < images.length) {
        const size = wantTwo ? 2 : 1;
        columns.push(images.slice(i, i + size));
        i += size;
        wantTwo = !wantTwo;
    }
    return columns;
}

export default function ImageSlider({ images = galleryImages, speed = 35 }: { images?: typeof galleryImages; speed?: number }) {
    const columns = useMemo(() => chunkIntoColumns(images), [images]);
    const track = useMemo(() => [...columns, ...columns], [columns]);

    return (
        <div className="mt-10 relative overflow-hidden py-10">
            {/* Styles and Fades remain the same */}
            <style>{`
                @keyframes slider-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .slider-track {
                    animation: slider-scroll var(--slider-duration, 35s) linear infinite;
                }
                .slider-track:hover { animation-play-state: paused; }
            `}</style>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 lg:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 lg:w-32" />

            <div
                className="slider-track flex w-max items-stretch gap-6 lg:gap-8"
                style={{ "--slider-duration": `${track.length * (60 / speed)}s` } as CSSProperties}
            >
                {track.map((col, colIdx) => (
                    <div
                        key={colIdx}
                        className="flex shrink-0 flex-col justify-center gap-6 lg:gap-8"
                        aria-hidden={colIdx >= columns.length}
                    >
                        {/* Map through the objects instead of strings */}
                        {col.map((img: typeof galleryImages[0]) => (
                            <div
                                key={img.id}
                                className="w-40 h-52 lg:w-56 lg:h-72 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt} // Using the alt property from your gallery object
                                    title={img.title} // Adding title for accessibility/tooltips
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}