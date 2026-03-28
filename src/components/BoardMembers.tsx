import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useRef, useState, useEffect } from 'react';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from 'react-icons/hi2';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  image: string;
  background: string;
  bio: string;
  linkedin: string;
  email: string;
  order: number;
  active: boolean;
}

function BoardMembers() {
  const swiperRef = useRef<any>(null);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const q = query(collection(db, "boardMembers"));
        const querySnapshot = await getDocs(q);
        const fetchedMembers = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as BoardMember))
          .filter(member => member.active === true)
          .sort((a, b) => a.order - b.order);
        
        setBoardMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching board members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardMembers();
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[62vh] flex items-center justify-center">
        <div className="text-lg">Loading board members...</div>
      </div>
    );
  }

  return (
    <div className='w-full overflow-hidden'>
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
          ur Amazing
          <br />Board Members{" "}
        </h1>
      </div>

      <div className='w-full h-[62vh]'>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          modules={[Navigation]}
          className="mySwiper h-[64vh]! flex! items-end!"
        >
          {boardMembers.map((member, index) => (
            <SwiperSlide
              key={member.id}
              style={{ backgroundColor: member.background }}
              className={`
                flex flex-col border-0! self-end! rounded-t-full overflow-hidden
                ${index % 2 === 0 ? 'h-[90%]!' : 'h-[75%]!'}
              `}
            >
              {/* TOP: Name and Role (30%) */}
              <div className='w-full h-[30%] flex flex-col items-center justify-center gap-1 shrink-0 text-black'>
                <div className="font-bold text-sm md:text-base">{member.name}</div>
                <div className="text-xs opacity-80">{member.role}</div>
              </div>

              {/* BOTTOM: Image (70%) */}
              <div className='w-full h-[70%] overflow-hidden'>
                <img
                  className='w-full h-full object-cover object-top'
                  src='images/dummy.jpg'
                  alt={member.name}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div className='mt-8 flex flex-row items-center gap-1 justify-center'>
        <div className="swiper-prev cursor-pointer" onClick={handlePrevSlide}>
          <HiMiniArrowDownLeft />
        </div>
        <div className="swiper-next cursor-pointer" onClick={handleNextSlide}>
          <HiMiniArrowUpRight />
        </div>
      </div>
    </div>
  );
}

export default BoardMembers;