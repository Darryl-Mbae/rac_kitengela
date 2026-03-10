import { useState } from 'react';
import SEO from './SEO';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight, HiMiniXMark} from "react-icons/hi2";

type Props = {}

const images = [
  "/images/photo1.jpg","/images/photo2.jpg","/images/photo3.jpg","/images/photo4.jpg",
  "/images/photo5.jpg","/images/photo6.jpg","/images/photo7.jpg","/images/photo8.jpg",
  "/images/photo9.jpg","/images/photo10.jpg","/images/photo11.jpg","/images/photo12.jpg","/images/photo13.jpg",
  "/images/photo14.jpg","/images/photo15.jpg","/images/photo16.jpg","/images/photo17.jpg"
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
            <svg width="38" height="44" viewBox="0 0 68 74" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80">
              {/* ... your SVG paths ... */}
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
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-full aspect-[${i%2===0? '1/0.8':'1/1.1'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                 style={{ backgroundImage: `url(${images[i]})` }}
                 onClick={() => openLightbox(i)} />
          ))}
        </div>

        {/* Column 2 */}
        <div className='w-full flex flex-col gap-1 lg:gap-3'>
          {[4,5,6,7].map(i => (
            <div key={i} className={`w-full aspect-[${i%2===0? '1/1.1':'1/0.8'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                 style={{ backgroundImage: `url(${images[i]})` }}
                 onClick={() => openLightbox(i)} />
          ))}
        </div>

        {/* Column 3 */}
        <div className='w-full flex flex-col gap-1 lg:gap-3'>
          {[8,9,10,11,12].map(i => (
            <div key={i} className='w-full aspect-[1/0.758] bg-cranberry bg-cover bg-center cursor-pointer'
                 style={{ backgroundImage: `url(${images[i]})` }}
                 onClick={() => openLightbox(i)} />
          ))}
        </div>

        {/* Column 4 */}
        <div className='w-full hidden lg:flex flex-col gap-3'>
          {[13,14,15,16].map(i => (
            <div key={i} className={`w-full aspect-[${i===16? '1/0.5':'1/1.1'}] bg-cranberry bg-cover bg-center cursor-pointer`}
                 style={{ backgroundImage: `url(${images[i]})` }}
                 onClick={() => openLightbox(i)} />
          ))}
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'>
          <button onClick={closeLightbox} className="cursor-pointer absolute top-5 right-5 text-white text-3xl">
            <HiMiniXMark/>
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