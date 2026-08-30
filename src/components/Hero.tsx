import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { preloadImages } from "../utils/imagePreloader";

interface HeroProps {
    title?: React.ReactNode;
    showBadge?: boolean;
    backgroundImage?: string;
    overlayImage?: string;
    mobileBackgroundImage?: string;
    mobileOverlayImage?: string;
    spanColor?: string;
    mobileImagePosition?: string;
}

export default function Hero({ 
    title = (
        <>
            Create <span className="text-[#F7C948]">Lasting </span>Impact
        </>
    ),
    showBadge = true,
    backgroundImage = "/images/IMG3.jpg",
    overlayImage = "/images/IMG3-nobg.png",
    mobileBackgroundImage,
    mobileOverlayImage,
    spanColor = "#F7C948",
    mobileImagePosition = "object-[-380px_0px]"
}: HeroProps) {
    const { ref, isInView } = useInView({ threshold: 0.3 });
    
    // Use mobile images if provided, otherwise fall back to desktop images
    const mobileBg = mobileBackgroundImage || backgroundImage;
    const mobileOverlay = mobileOverlayImage || overlayImage;

    // Preload images on component mount to prevent loading delays
    useEffect(() => {
        const imagesToPreload = [backgroundImage, overlayImage, mobileBg, mobileOverlay].filter(
            (img) => img !== undefined
        );
        preloadImages(imagesToPreload);
    }, [backgroundImage, overlayImage, mobileBg, mobileOverlay]);

    return (
        <div className="bg-[#f8fafc] mt-[-11vh] relative flex min-h-[105vh] md:min-h-[103vh] w-full items-center max-w-screen overflow-x-hidden overflow-hidden rounded-b-4xl">
            {/* Background */}
            <img
                src={backgroundImage}
                alt="Rotaract Club of Kitengela"
                className="absolute inset-0 hidden h-full w-full rounded-b-4xl object-cover object-center md:block"
            />
            <img
                src={overlayImage}
                alt="Rotaract Club of Kitengela"
                className="z-40 absolute inset-0 hidden h-full w-full rounded-b-4xl object-cover object-center md:block"
            />

            <img
                src={mobileBg}
                alt="Rotaract Club of Kitengela mobile"
                className={`absolute inset-0 block h-full w-full rounded-b-4xl object-cover ${mobileImagePosition} md:hidden`}
            />
            <img
                src={mobileOverlay}
                alt="Rotaract Club of Kitengela mobile"
                className={`z-40 absolute inset-0 block h-full w-full rounded-b-4xl object-cover ${mobileImagePosition} md:hidden`}
            />

            {/* Overlay */}
            <div className="z-10 absolute inset-0 bg-black/25" />

            {/* Decorative Blur */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7C948]/10 blur-[140px]" />

            {/* Content */}
            <div className="relative -mt-90 mx-auto flex flex-col w-full max-w-7xl items-center justify-center px-6 lg:px-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                    }
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="z-20 max-w-5xl text-left md:text-center"
                >
                    {/* Badge */}
                    {showBadge && (
                        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-xl">
                            <div className="mr-3 h-2 w-2 rounded-full bg-[#F7C948]" />
                            <span className="text-xs uppercase text-white">
                                Rotaract Club of Kitengela
                            </span>
                        </div>
                    )}

                    {/* Heading */}
                    <h1 className="font-display mt-2 text-7xl leading-[0.95] tracking-tight text-white sm:text-6xl md:text-[7.5rem]">
                        {typeof title === 'string' ? (
                            title
                        ) : (
                            <span>
                                {React.Children.toArray(title).map((child, idx) => {
                                    if (React.isValidElement(child) && child.type === 'span') {
                                        return React.cloneElement(child as React.ReactElement<any>, {
                                            key: idx,
                                            style: { color: spanColor } as React.CSSProperties
                                        });
                                    }
                                    return child;
                                })}
                            </span>
                        )}
                    </h1>
                </motion.div>
            </div>

        </div>

    );
}