import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Speech } from 'lucide-react';
import { useRef } from 'react';

import 'swiper/swiper-bundle.css';
import { FaQuoteRight } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from 'react-icons/hi2';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Mwangi",
    role: "Community Volunteer", // Rotaract role
    career: "Public Health Officer", // Professional career
    linkedin: "https://www.linkedin.com/in/sarahmwangi",
    content: "Joining Rotaract Club Kitengela has been life-changing. The projects we work on truly make a difference in our community, and I've grown so much as a leader.",
    rating: 5,
    image: "https://images.pexels.com/photos/1133742/pexels-photo-1133742.jpeg", // Rotaract photo
    careerImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" // Professional photo
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Past President",
    career: "Corporate Lawyer",
    linkedin: "https://www.linkedin.com/in/davidchieng",
    content: "The friendships and professional networks I've built through this club are invaluable. We're not just doing service - we're building the future of our community.",
    rating: 5,
    image: "/images/testimonials/david.jpg",
    careerImage: "/images/testimonials/david-career.jpg"
  },
  {
    id: 3,
    name: "Grace Wanjiku",
    role: "Project Coordinator",
    career: "Development Consultant",
    linkedin: "https://www.linkedin.com/in/gracewanjiku",
    content: "Every project feels meaningful here. From education initiatives to health campaigns, we're making real impact while developing our leadership skills.",
    rating: 5,
    image: "/images/testimonials/grace.jpg",
    careerImage: "/images/testimonials/grace-career.jpg"
  }
];

function Testimonial() {
  const swiperRef = useRef<any>(null);

  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

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



  return (
    <section className="py-8 md:py-16 px-4 mt-[3vh] md:mt-[5vh] lg:mt-[10vh]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col flex-start gap-3 items-center">
          <div className="flex items-center gap-2 mb-4 lg:mb-0">
            <Speech className="text-cranberry w-6 md:w-8 h-auto bg-secondary rounded-full p-2" />
            <span className="uppercase text-sm md:text-base">Testimonials</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 relative text-center leading-tight">
            <span className="relative inline-block">
              V
              <svg
                width="38"
                height="44"
                viewBox="0 0 68 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-3 -left-4 w-6 h-8 transform "
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
              </svg>
            </span>
            oices From <br />Our Community
            <span className="block mt-2">
              <svg width="200" height="22" viewBox="0 0 340 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M42.7009 9.74074C48.056 9.50278 52.3488 11.7633 54.89 16.5522C56.8138 20.2107 58.9817 20.8354 62.571 19.4969C71.7882 16.0614 81.0485 12.7449 90.3662 9.65151C96.1377 7.733 101.306 8.75916 105.542 13.8603C106.561 15.0798 109.045 15.8829 110.61 15.5558C118.649 13.8603 126.618 11.7187 134.615 9.75558C143.602 7.5545 152.561 5.16013 161.62 3.28624C167.205 2.12621 172.488 4.40163 175.92 8.65506C180.916 14.827 187.032 14.5295 193.206 13.1018C204.849 10.4248 216.292 6.88529 227.906 4.07446C233.85 2.64673 239.966 1.59077 246.054 1.24872C248.839 1.08512 252.084 2.51285 254.51 4.17853C259.65 7.68835 265.335 7.43552 270.748 6.82577C285.751 5.13034 300.754 3.21187 315.585 0.401038C323.725 -1.14566 330.344 2.08155 337.221 4.96675C338.585 5.54676 340.365 8.68481 339.934 9.54739C338.915 11.5849 336.905 13.5629 334.838 14.4255C333.086 15.1691 330.502 14.8419 328.635 14.0983C318.944 10.2166 309.555 13.8454 300.079 14.9906C288.421 16.3886 276.821 18.2922 265.149 19.3779C261.631 19.705 257.224 19.125 254.496 17.1024C247.03 11.57 239.493 13.3993 231.812 15.288C219.536 18.3071 207.319 21.5343 195.072 24.6575C184.979 27.2304 176.121 25.3713 168.483 17.4891C166.846 15.7937 163.199 14.827 160.902 15.3921C149.833 18.0542 138.893 21.3261 127.91 24.4195C120.516 26.4868 113.266 29.8776 105.369 26.7842C104.393 26.3975 103.201 26.2191 102.484 25.5349C94.7881 18.1584 87.2794 22.1738 79.6415 25.6837C74.3581 28.1078 69.046 30.532 63.5473 32.3017C56.6415 34.5326 51.3869 31.7664 46.3188 24.2262C44.5386 21.5641 42.9736 20.4784 39.9012 21.1179C30.8994 22.9621 23.1035 27.3493 16.0829 33.2238C9.72277 38.5629 4.85571 39.6188 0.807033 35.41C-0.111816 34.4582 -0.298432 31.0376 0.519919 30.2643C10.1822 21.0287 28.4443 10.5141 42.7296 9.75558L42.7009 9.74074Z" fill="#C1FF07" />
              </svg>
            </span>
          </h1>
          <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto text-center">
          </p>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-[15%_85%] gap-4'>
          <div className='w-full flex flex-row  items-center lg:items-start justify-center lg:justify-start gap-2 mb-4 lg:mb-0'>
            <div
              className='cursor-pointer bg-tertiary flex items-center justify-center rounded-full p-2 text-2xl lg:text-3xl hover:bg-cranberry hover:text-white transition-colors'
              onClick={handlePrevSlide}
            >
              <HiMiniArrowDownLeft />
            </div>
            <div
              className='cursor-pointer bg-tertiary flex items-center justify-center rounded-full p-2 text-2xl lg:text-3xl hover:bg-cranberry hover:text-white transition-colors'
              onClick={handleNextSlide}
            >
              <HiMiniArrowUpRight />
            </div>
          </div>
          <div className="relative w-full">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={pagination}
              loop={true}
              // autoplay={{
              //   delay: 5000,
              //   disableOnInteraction: false,
              // }}
              className="testimonial-swiper pb-12 h-[580px] lg:h-[440px]"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className='grid grid-cols-1 md:grid-cols-[35%_65%] gap-3 h-[400px]'>
                    <div className="relative h-[250px] md:h-full w-full rounded-3xl overflow-hidden">
                      <img
                        src={testimonial.careerImage}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className='h-full w-full'>
                      <div className='h-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-3'>
                        <div className='w-full h-full bg-secondary rounded-3xl p-6 md:p-10 flex flex-col justify-end min-h-[250px]'>
                          <FaQuoteRight className='scale-x-[-1] text-3xl md:text-4xl' />
                          <div className='font-bold text-lg md:text-2xl py-4 md:py-6 text-primary leading-tight'>{testimonial.content}</div>
                          <div className='text-secondary text-lg md:text-2xl'>- {testimonial.name}</div>
                        </div>
                        <div className='hidden lg:flex flex-col gap-2 w-full lg:w-[90%]'>
                          <div className='relative w-full h-[150px] lg:h-[55%] rounded-3xl overflow-hidden'>
                            {/* Image */}
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className='w-full h-full object-cover'
                            />

                            {/* Dark gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'></div>

                            {/* Name + Career */}
                            <div className='absolute bottom-4 left-4 text-white'>
                              <div className='font-semibold text-base lg:text-lg'>
                                {testimonial.name}
                              </div>
                              <div className='text-xs lg:text-sm text-gray-300'>
                                {testimonial.career}
                              </div>
                            </div>
                          </div>
                          <div className='w-full h-12 bg-tertiary rounded-3xl flex items-center justify-between pl-4'>
                            <span className='text-sm lg:text-base'>
                              Connect with {testimonial.name.split(" ")[0]}
                            </span>
                            <div className='mr-2 h-8 lg:h-9 aspect-square rounded-full bg-cranberry text-white flex items-center justify-center'>
                              <GoArrowUpRight className='text-sm lg:text-base' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Testimonials Slider */}

      </div>
    </section>
  )
}

export default Testimonial