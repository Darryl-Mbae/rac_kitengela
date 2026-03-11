import { useState } from 'react';
import SEO from './SEO';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight, HiMiniXMark } from "react-icons/hi2";

type Props = {}

const images = [
    "/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg", "/images/photo4.jpg",
    "/images/photo5.jpg", "/images/photo6.jpg", "/images/photo7.jpg", "/images/photo8.jpg",
    "/images/photo9.jpg", "/images/photo10.jpg", "/images/photo11.jpg", "/images/photo12.jpg", "/images/photo13.jpg",
    "/images/photo14.jpg", "/images/photo15.jpg", "/images/photo16.jpg", "/images/photo17.jpg"
];

function Gallery({ }: Props) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    };

    const prevImage = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <SEO
                title="Gallery"
                description="Explore our photo gallery at RAC Kitengela showcasing events, projects, and memories made by our members."
                keywords="RAC Kitengela gallery, photos, community events, projects, leadership"
                image="/images/og-events.jpg"
            />

            <div className='flex justify-between mt-10'>
                <h1 className=' relative pl-4'>
                    <span className="relative inline-block">
                        O
                        <svg
                            width="38"
                            height="44"
                            viewBox="0 0 68 74"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80"
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
                        </svg>
                    </span>
                    ur Spectacular
                    <br />Gallery
                </h1>
            </div>

            {/* GRID */}
            <div className='my-10 grid grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-3 min-h-screen'>

                {/* Column 1 */}
                <div className='w-full flex flex-col gap-1 lg:gap-3'>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className={`w-full aspect-[${i % 2 === 0 ? '1/0.8' : '1/1.1'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                            style={{ backgroundImage: `url(${images[i]})` }}
                            onClick={() => openLightbox(i)} />
                    ))}
                </div>

                {/* Column 2 */}
                <div className='w-full flex flex-col gap-1 lg:gap-3'>
                    {[4, 5, 6, 7].map(i => (
                        <div key={i} className={`w-full aspect-[${i % 2 === 0 ? '1/1.1' : '1/0.8'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                            style={{ backgroundImage: `url(${images[i]})` }}
                            onClick={() => openLightbox(i)} />
                    ))}
                </div>

                {/* Column 3 */}
                <div className='w-full flex flex-col gap-1 lg:gap-3'>
                    {[8, 9, 10, 11, 12].map(i => (
                        <div key={i} className='w-full aspect-[1/0.758] bg-cranberry bg-cover bg-center cursor-pointer'
                            style={{ backgroundImage: `url(${images[i]})` }}
                            onClick={() => openLightbox(i)} />
                    ))}
                </div>

                {/* Column 4 */}
                <div className='w-full hidden lg:flex flex-col gap-3'>
                    {[13, 14, 15, 16].map(i => (
                        <div key={i} className={`w-full aspect-[${i === 16 ? '1/0.5' : '1/1.1'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                            style={{ backgroundImage: `url(${images[i]})` }}
                            onClick={() => openLightbox(i)} />
                    ))}
                </div>

            </div>

            {/* LIGHTBOX */}
            {lightboxIndex !== null && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'>
                    <button onClick={closeLightbox} className="cursor-pointer absolute top-5 right-5 text-white text-3xl">
                        <HiMiniXMark />
                    </button>
                    <button onClick={prevImage} className="cursor-pointer absolute left-5 text-white text-3xl">
                        <HiMiniArrowDownLeft />
                    </button>
                    <img src={images[lightboxIndex]} className="max-h-[90%] max-w-[90%] object-contain" />
                    <button onClick={nextImage} className="cursor-pointer absolute right-5 text-white text-3xl">
                        <HiMiniArrowUpRight />
                    </button>
                </div>
            )}

        </div>
    )
}

export default Gallery;