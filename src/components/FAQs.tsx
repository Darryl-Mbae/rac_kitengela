import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    image: string;
    order: number;
}

function FAQs() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const q = query(collection(db, "faqs"), orderBy("order", "asc"));
                const querySnapshot = await getDocs(q);
                const fetchedFAQs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as FAQ));
                
                setFaqs(fetchedFAQs);
                // Set first FAQ as active by default
                if (fetchedFAQs.length > 0) {
                    setActiveIndex(fetchedFAQs[0].id);
                }
            } catch (error) {
                console.error("Error fetching FAQs: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-secondary p-8 lg:p-10 rounded-2xl">
                <div className="flex items-center justify-center h-40">
                    <div className="text-lg">Loading FAQs...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-secondary p-8 lg:p-10 rounded-2xl">
            <div className="px-4 flex flex-col justify-between gap-4 lg:gap-0">
                <div >
                    <div className="flex flex-row items-center gap-3 mb-4">
                        <MessageCircle className="text-cranberry w-8 h-auto  bg-secondary rounded-full p-2" />
                        FAQS
                    </div>
                    <h1 className="lg:w-[60%] relative ">
                        Learn M
                        <span className="relative inline-block">
                            o
                            <svg
                                width="38"
                                height="44"
                                viewBox="0 0 68 74"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -top-3 -right-1 w-6 h-8 transform scale-x-[-1] -rotate-40"
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
                            </svg>
                        </span>
                        re About Our Amazing Club
                        <span className="-ml-1 lg:ml-2 absolute">
                            <svg width="246" height="287" viewBox="0 0 246 287" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-30 inline-block">
                                <g clipPath="url(#clip0_3_232)">
                                    <path d="M156.25 265.656C157.94 265.444 158.573 265.656 159.207 265.444C197.847 242.174 224.029 209.172 233.953 164.747C236.487 153.535 236.065 141.899 233.109 130.476C226.985 105.936 206.504 89.0121 181.377 87.5312C168.286 86.685 155.617 88.1659 144.215 95.3586C143.37 101.493 142.737 107.628 141.47 113.34C139.359 122.648 134.502 130.264 125.845 134.918C119.51 138.515 113.176 138.515 109.798 135.13C105.363 130.687 105.364 124.764 108.108 119.898C111.909 113.129 116.554 106.782 121.411 100.859C124.578 97.051 128.801 93.8777 132.602 90.7045C129.012 66.7994 106.419 56.645 79.3921 66.5878C78.5475 69.9726 77.7029 73.569 76.6472 76.9538C72.4242 89.4352 64.6117 98.9549 51.9427 103.397C47.0863 105.09 41.8075 105.724 37.5845 101.282C34.4173 97.8972 34.4173 91.9738 37.7957 86.0504C43.2856 76.7422 51.5204 70.1842 60.3887 64.4723C63.5559 62.5684 66.7232 60.6644 69.8904 58.972C65.6674 21.9508 32.517 -4.28131 0 10.5272C0.211149 7.77702 -1.29001e-05 5.44997 0.844584 4.18067C1.90033 2.69982 4.22297 1.85363 6.12332 1.43053C24.071 -1.95427 40.7518 0.161227 54.4765 13.2773C64.8228 23.0086 71.7908 34.8554 76.4361 48.3946C77.0695 50.2985 77.703 52.2024 78.5476 54.1064C78.5476 54.3179 78.9698 54.5295 79.8144 55.1641C81.7147 54.9526 84.0374 54.9526 86.36 54.5295C114.654 50.087 129.434 57.7027 142.526 84.1464C145.06 83.3002 148.016 82.454 150.761 81.3963C167.019 75.896 183.278 75.4729 199.747 80.9732C226.563 89.8583 243.877 112.917 245.778 142.111C246.833 157.977 244.089 173.209 238.388 188.017C224.452 223.769 201.648 251.905 167.441 270.31C165.752 271.368 163.852 272.214 162.163 273.272C161.951 273.483 161.74 273.906 161.107 275.176C168.286 276.868 175.043 276.233 181.8 275.81C188.345 275.599 195.102 274.964 202.281 274.541C201.648 280.041 198.691 282.157 195.102 283.426C190.879 284.695 186.656 286.388 182.433 286.599C171.031 287.023 159.418 287.234 147.804 286.599C138.725 285.965 136.191 281.099 140.203 273.695C148.86 258.04 157.728 242.386 166.597 226.731C168.075 224.192 169.975 222.077 172.298 219.115C176.31 223.769 174.62 227.154 173.142 230.327C167.23 241.751 161.951 253.175 156.25 265.656ZM43.919 94.9355C58.4883 93.0315 67.5677 83.7233 68.2012 70.6073C58.4883 76.9538 49.1978 82.6656 43.919 94.9355ZM115.288 127.726C127.745 124.764 133.658 116.302 132.391 103.397C124.367 110.167 117.399 116.514 115.288 127.726Z" fill="#C1FF07" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3_232">
                                        <rect width="346" height="387" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </h1>
                </div>

            </div>
            <div className="max-w-4xl mx-auto p-4 lg:p-6 pt-6 ">
                {faqs.map((faq, index) => {
                    const isOpen = activeIndex === faq.id;

                    return (
                        <div
                            key={faq.id}
                            className="border-b border-gray-200 py-6 transition-all duration-300"
                        >
                            {/* Header / Trigger */}
                            <button
                                onClick={() => setActiveIndex(isOpen ? null : faq.id)}
                                className="w-full flex items-start lg:items-center justify-between text-left group"
                            >
                                <div className="flex flex-col lg:flex-row  lg:items-center gap-4">

                                    <span className="text-xl font-medium text-gray-400">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h3 className="text-xl font-semibold text-primary">
                                        {faq.question}
                                    </h3>
                                </div>
                                <span className={`text-2xl transition-transform cursor-pointer ${isOpen ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>

                            {/* Expandable Content */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row gap-8 items-start ">
                                        {/* Text Content */}
                                        <p className="flex flex-end text-gray-600 leading-relaxed md:w-1/2">
                                            {faq.answer}
                                        </p>

                                        {/* Image Preview */}
                                        <div className="md:w-1/3 rounded-2xl overflow-hidden hover:rotate-2 transition-all ease-out py-2">
                                            <img
                                                src={faq.image}
                                                alt={faq.question}
                                                className="rounded-2xl w-full object-cover h-40 "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FAQs