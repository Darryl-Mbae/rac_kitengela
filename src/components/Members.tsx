import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useMemo, useRef, useState } from 'react';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from 'react-icons/hi2';

function Members() {
    const swiperRef = useRef<any>(null);

    const boardMembers = [
        { name: "Alex Rivera", role: "CEO", image: "https://via.placeholder.com/400x800", background: "#FEB9CE" },
        { name: "Sarah Chen", role: "COO", image: "https://via.placeholder.com/400x800", background: "#CBD5D4" },
        { name: "Jordan Smith", role: "CTO", image: "https://via.placeholder.com/400x800", background: "#E4DBD2" },
        { name: "Taylor Reed", role: "Design", image: "https://via.placeholder.com/400x800", background: "#FFC931" },
        { name: "Alex Rivera", role: "CEO", image: "https://via.placeholder.com/400x800", background: "#FEB9CE" },
        { name: "Sarah Chen", role: "COO", image: "https://via.placeholder.com/400x800", background: "#CBD5D4" },
        { name: "Jordan Smith", role: "CTO", image: "https://via.placeholder.com/400x800", background: "#E4DBD2" },
        { name: "Taylor Reed", role: "Design", image: "https://via.placeholder.com/400x800", background: "#FFC931" },
        // Add as many as you need...
    ];

    const members = [
        { name: "Alex Rivera", linkedin: "", profession: "CEO", image: "https://via.placeholder.com/400x800" },
        { name: "Sarah Chen", linkedin: "", profession: "COO", image: "https://via.placeholder.com/400x800" },
        { name: "Jordan Smith", linkedin: "", profession: "CTO", image: "https://via.placeholder.com/400x800" },
        { name: "Taylor Reed", linkedin: "", profession: "Design", image: "https://via.placeholder.com/400x800" },
        { name: "Alex Rivera", linkedin: "", profession: "CEO", image: "https://via.placeholder.com/400x800" },
        { name: "Sarah Chen", linkedin: "", profession: "COO", image: "https://via.placeholder.com/400x800" },
        { name: "Jordan Smith", linkedin: "", profession: "CTO", image: "https://via.placeholder.com/400x800" },
        { name: "Taylor Reed", linkedin: "", profession: "Design", image: "https://via.placeholder.com/400x800" },
        { name: "Sarah Chen", linkedin: "", profession: "COO", image: "https://via.placeholder.com/400x800" },
        { name: "Jordan Smith", linkedin: "", profession: "CTO", image: "https://via.placeholder.com/400x800" },
        { name: "Taylor Reed", linkedin: "", profession: "Design", image: "https://via.placeholder.com/400x800" }, { name: "Sarah Chen", linkedin: "", profession: "COO", image: "https://via.placeholder.com/400x800" },
        { name: "Jordan Smith", linkedin: "", profession: "CTO", image: "https://via.placeholder.com/400x800" },
        { name: "Taylor Reed", linkedin: "", profession: "Design", image: "https://via.placeholder.com/400x800" },
        // Add as many as you need...
    ];


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

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    // Filtered & paginated members
    const filteredMembers = useMemo(() => {
        const filtered = members.filter(m =>
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.profession.toLowerCase().includes(search.toLowerCase())
        );
        const start = (currentPage - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [search, currentPage]);

    const totalPages = Math.ceil(
        members.filter(m =>
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.profession.toLowerCase().includes(search.toLowerCase())
        ).length / perPage
    );

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
                    <br />Borad Members{" "}
                </h1>
            </div>

            <div className='w-full h-[62vh]'>
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                    spaceBetween={0}
                    // Responsive breakpoints
                    breakpoints={{
                        // When window width is >= 640px (Tablets)
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        // When window width is >= 1024px (Desktop)
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
                    // pagination={{
                    //     clickable: true,
                    // }}
                    // modules={[Pagination]}
                    /* KEY CHANGE: 'items-end' forces the flex children (slides)
                to align to the bottom of the swiper-wrapper.
                */
                    className="mySwiper h-full! flex! items-end!"
                >
                    {boardMembers.map((member, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ backgroundColor: member.background }}
                            className={`
                         flex flex-col border-0! self-end! rounded-t-full overflow-hidden
                         /* Removed because it shrinks the available height for the 30/70 split */
                         ${index % 2 === 0 ? 'h-[90%]!' : 'h-[75%]!'}
                       `}
                        >
                            {/* TOP: Name and Role (30%) */}
                            <div className='w-full  h-[30%] flex flex-col items-center justify-center gap-1 shrink-0 text-black'>
                                <div className="font-bold text-sm md:text-base">{member.name}</div>
                                <div className="text-xs opacity-80">{member.role}</div>
                            </div>

                            {/* BOTTOM: Image (70%) */}
                            <div className='w-full  h-[70%] overflow-hidden'>
                                <img
                                    className='w-full h-full object-cover object-top' // Added h-full and object-cover
                                    src="images/dummy.jpg"
                                    alt={member.name}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='mt-6 flex flex-row items-center gap-1 justify-center'>
                <div className="swiper-prev cursor-pointer" onClick={handlePrevSlide}><HiMiniArrowDownLeft /></div>
                <div className="swiper-next cursor-pointer" onClick={handleNextSlide}><HiMiniArrowUpRight /></div>
            </div>

            <div className='w-full grid grid-cols-1 lg:grid-cols-[40%_60%]'>
                <div className='w-full'></div>
                <div className='w-full'>
                    <h1 className="px-5 lg:px-0 pt-15 text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 relative leading-tight">
                        <span className="relative inline-block">
                            H
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
                        ow does one<br />Become a member
                        <span className="block mt-2">
                            <svg width="200" height="22" viewBox="0 0 340 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.7009 9.74074C48.056 9.50278 52.3488 11.7633 54.89 16.5522C56.8138 20.2107 58.9817 20.8354 62.571 19.4969C71.7882 16.0614 81.0485 12.7449 90.3662 9.65151C96.1377 7.733 101.306 8.75916 105.542 13.8603C106.561 15.0798 109.045 15.8829 110.61 15.5558C118.649 13.8603 126.618 11.7187 134.615 9.75558C143.602 7.5545 152.561 5.16013 161.62 3.28624C167.205 2.12621 172.488 4.40163 175.92 8.65506C180.916 14.827 187.032 14.5295 193.206 13.1018C204.849 10.4248 216.292 6.88529 227.906 4.07446C233.85 2.64673 239.966 1.59077 246.054 1.24872C248.839 1.08512 252.084 2.51285 254.51 4.17853C259.65 7.68835 265.335 7.43552 270.748 6.82577C285.751 5.13034 300.754 3.21187 315.585 0.401038C323.725 -1.14566 330.344 2.08155 337.221 4.96675C338.585 5.54676 340.365 8.68481 339.934 9.54739C338.915 11.5849 336.905 13.5629 334.838 14.4255C333.086 15.1691 330.502 14.8419 328.635 14.0983C318.944 10.2166 309.555 13.8454 300.079 14.9906C288.421 16.3886 276.821 18.2922 265.149 19.3779C261.631 19.705 257.224 19.125 254.496 17.1024C247.03 11.57 239.493 13.3993 231.812 15.288C219.536 18.3071 207.319 21.5343 195.072 24.6575C184.979 27.2304 176.121 25.3713 168.483 17.4891C166.846 15.7937 163.199 14.827 160.902 15.3921C149.833 18.0542 138.893 21.3261 127.91 24.4195C120.516 26.4868 113.266 29.8776 105.369 26.7842C104.393 26.3975 103.201 26.2191 102.484 25.5349C94.7881 18.1584 87.2794 22.1738 79.6415 25.6837C74.3581 28.1078 69.046 30.532 63.5473 32.3017C56.6415 34.5326 51.3869 31.7664 46.3188 24.2262C44.5386 21.5641 42.9736 20.4784 39.9012 21.1179C30.8994 22.9621 23.1035 27.3493 16.0829 33.2238C9.72277 38.5629 4.85571 39.6188 0.807033 35.41C-0.111816 34.4582 -0.298432 31.0376 0.519919 30.2643C10.1822 21.0287 28.4443 10.5141 42.7296 9.75558L42.7009 9.74074Z" fill="#C1FF07" />
                            </svg>
                        </span>
                    </h1>
                    <div className='my-5 px-5 lg:px-0 w-full lg:w-[80%] text-xl border-b border-default'>
                        <div className='border-t border-default py-6 flex flex-row items-center justify-between'>
                            <div>Be an Active member for 8 months</div>
                            <div>01</div>
                        </div>
                        <div className='border-t border-default py-6 flex flex-row items-center justify-between'>
                            <div>Be an Active member for 8 months</div>
                            <div>01</div>
                        </div>
                        <div className='border-t border-default py-6 flex flex-row items-center justify-between'>
                            <div>Be an Active member for 8 months</div>
                            <div>01</div>
                        </div>
                        <div className='border-t border-default py-6 flex flex-row items-center justify-between'>
                            <div>Be an Active member for 8 months</div>
                            <div>01</div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="w-full mt-[10vh] lg:mt-[20vh] px-4">
                <div className='grid w-full grid-cols-1 lg:grid-cols-2'>
                    <h1 className=' relative'>
                        <span className="relative inline-block">
                            R
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
                        otaract Kitengela
                        <br />Club Members{" "}
                    </h1>
                    <div className='lg:hidden mt-2'>Our members are the heart of the Rotaract Club of Kitengela. A diverse group of passionate young leaders, they bring energy, creativity, and commitment to every project and activity.</div>
                </div>
            </div>

            <div className='px-4 w-full flex flex-row items-center justify-between'>
                <div className="flex flex-col lg:flex-row justify-between mt-8 w-full ">
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="bg-secondary rounded-[5px] px-4 py-4 mb-4 lg:mb-0 w-full lg:w-1/2"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                    <div className="flex gap-2 items-center">
                        <button
                            disabled={currentPage === 1}
                            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-50"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <HiMiniArrowDownLeft />
                        </button>
                        <span className='text-secondary'>
                            {Math.min(currentPage * perPage, members.filter(m =>
                                m.name.toLowerCase().includes(search.toLowerCase()) ||
                                m.profession.toLowerCase().includes(search.toLowerCase())
                            ).length)} out of {members.filter(m =>
                                m.name.toLowerCase().includes(search.toLowerCase()) ||
                                m.profession.toLowerCase().includes(search.toLowerCase())
                            ).length} members
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-50"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            <HiMiniArrowUpRight />
                        </button>
                    </div>
                </div>

            </div>
            <div id="members" className="w-full px-4 lg:px-0 mx-auto mt-10 rounded-lg relative">
                <div className="grid grid-cols-2 lg:grid-cols-[40%_40%_20%] gap-4 lg:px-6 py-6 border-b border-default cursor-pointer justify-between">
                    <div className="font-medium text-tertiary">Name</div>
                    <div className="text-secondary">Profession</div>
                    <div className="hidden lg:flex text-secondary">LinkedIn</div>
                </div>
                {filteredMembers.map((member, index) => (
                    <div
                        onClick={() => window.open('https://example.com/new-page', '_blank')}
                        key={index} className="grid grid-cols-2 lg:grid-cols-[40%_40%_20%] gap-4 lg:px-6 py-6 border-b border-default transition-all ease-in cursor-pointer hover:bg-black/5">
                        <div className="font-medium text-tertiary">{member.name}</div>
                        <div className="text-secondary flex items-end">{member.profession}</div>
                        <div className="hidden lg:flex">LinkedIn</div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Members;