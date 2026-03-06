
import { GoArrowUpRight } from 'react-icons/go';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

type Props = {}

function JoinUs({ }: Props) {
  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[38%_62%] grid-rows-[auto_1fr] lg:grid-rows-1 h-auto lg:h-[450px] gap-3 my-20">
      <div className="mx-auto w-[85%] py-8 lg:py-10 flex flex-col relative">
        {/* content determines height */}
        <h1 className='pb-6 relative'>
        <span className="relative inline-block">
                            S
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
          tart Your Journey
          <br />With Us{" "}
        </h1>
        <p><strong>Friendship. Service. Growth.</strong> Rotaract is a community of young leaders committed to uplifting others while growing together. Join us as we serve, connect, and create meaningful impact.</p>


        <button className='cool-button'>Join Us</button>
        {/* Pagination moved to left side at bottom */}
        <div className="cursor-pointer px-6 joinus-pagination-container absolute bottom-8 left-8"></div>
      </div>

      <div className="w-full h-full">
        <div className="relative w-full h-full">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{
              ...pagination,
              el: '.joinus-pagination-container',
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
              },
            }}
            className="joinus-swiper h-full"
          >
            {/* Slide 1 */}
            <SwiperSlide className='h-64 overflow-hidden rounded-xl'>
              <div className="relative w-full h-ful">
                <div className="absolute top-2 right-2 text-white h-10 w-10 rounded-full flex items-center justify-center bg-cranberry">
                  <GoArrowUpRight />
                </div>
                <img
                  src="https://images.pexels.com/photos/6231809/pexels-photo-6231809.jpeg"
                  alt="Slide Image"
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay only on bottom part */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Text positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end  text-white px-4 pb-4">
                  <div>
                    <h2 className="text-xl font-medium!">Create Meaningful Community Impact.</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className='w-full h-64 flex flex-col gap-2'>
              <div className="w-full bg-lime rounded-xl text-black flex items-center justify-center px-6 py-8 text-3xl font-semibold">
                <p className='text-black!'>
                  Join a{" "}
                  <span className="font-cursive text-cranberry text-4xl!">
                    Supportive
                  </span>{"  "}
                  circle of like-minded young leaders
                </p>
              </div>
              <div className='w-full relative h-[70%] overflow-hidden rounded-xl'>
                <img
                  src="https://images.pexels.com/photos/6591153/pexels-photo-6591153.jpeg"
                  alt="Slide Image"
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay only on bottom part */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Text positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center text-white px-4 pb-4">
                  <div>
                    <h2 className="text-xl font-medium!">Develop Your Leadership Potential and more</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className='h-64 overflow-hidden rounded-xl'>
              <div className="relative w-full h-ful">
                <div className="absolute top-2 right-2 text-white h-10 w-10 rounded-full flex items-center justify-center bg-cranberry">
                  <GoArrowUpRight />
                </div>
                <img
                  src="https://images.pexels.com/photos/6231809/pexels-photo-6231809.jpeg"
                  alt="Slide Image"
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay only on bottom part */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Text positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end  text-white px-4 pb-4">
                  <div>
                    <h2 className="text-xl font-medium!">Expand Your Professional Network.</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className='w-fullh-64 flex flex-col gap-2'>
              <div className='w-full relative h-[70%] overflow-hidden rounded-xl'>
                <img
                  src="https://images.pexels.com/photos/6591153/pexels-photo-6591153.jpeg"
                  alt="Slide Image"
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay only on bottom part */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Text positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center text-white px-4 pb-4">
                  <div>
                    <h2 className="text-xl font-medium!">Grow in Confidence and Character</h2>
                  </div>
                </div>
              </div>
              <div className="w-full bg-lime rounded-xl text-black flex items-center justify-center px-6 py-8 text-3xl font-semibold">
                <p className='text-black!'>
                  Connect, grow, and {" "}
                  <span className="font-cursive text-cranberry text-4xl!">
                    Create
                  </span>{"  "}
                  meaningful change.                </p>
              </div>

            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default JoinUs