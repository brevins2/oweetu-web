import Footer from '@/components/footer'
import Header1 from '@/components/header1'
import HeroSlider from '@/components/heroSlider'
import { GoGlobe } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { FaHatCowboy } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

import React from 'react'

import bgimage1 from "../assets/travel-scaled-bg.png";
import bgimage2 from "../assets/falls-scaled-bg.webp";

import rwanda from '@/assets/rwanda.jpg'
import uganda from '@/assets/uganda.jpg'
import kenya from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'

import tanzania from '@/assets/tanzania.jpg'

import safarisData from '@/utils/safarisData'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [currentReview, setCurrentReview] = React.useState(0);

    const reasons = [
        {
            icon: <FaHatCowboy color='#C57712' className='mx-auto' size={32} />,
            title: 'Expert Gorilla Trekking Guides',
            description: 'Travel with best, guides that will make your trip very enjoyable'
        },
        {
            icon: <GoGlobe color='#C57712' className='mx-auto' size={32} />,
            title: 'Authentic Ugandan Experience',
            description: 'An amazing experience, animals, culture & wildlife in Africa'
        },
        {
            icon: <MdOutlineVerified color='#C57712' className='mx-auto' size={32} />,
            title: 'Luxury & Comfort',
            description: 'Luxury, comfortable & affordable lodges & hotels for your stay'
        },
        {
            icon: <FaShieldAlt color='#C57712' className='mx-auto' size={32} />,
            title: 'Safe & Responsible Travel',
            description: 'Secure and peaceful travels, great security in the country'
        }
    ]

    const destinations = [
        {
            title: "Uganda",
            image: uganda,
            description: "Explorer Uganda's exceptional wildlife, savanna, water bodies and diverse culture",
            location: ""
        },
        {
            title: "Kenya",
            image: kenya,
            description: "The Masai Mara, national parks and rich savanna, Kenya's tourism stands out",
            location: ""
        },
        {
            title: "Tanzania",
            image: tz,
            description: "From the slopes of Kilimanjaro to the Simbas & beautiful coast, Tanzania is rich",
            location: ""
        },
        {
            title: "Rwanda",
            image: rwanda,
            description: "Trek the gorilla, chimpanzees & explore national parks in the heart of Rwanda",
            location: ""
        },
    ]

    const parks = [
        {
            link: 'https://www.queenelizabethnationalpark.com/',
            name: 'Queen Elizabeth National Park'
        },
        {
            link: 'https://www.murchisonfallsnationalpark.com/',
            name: 'Murchison Falls National Park'
        },
        {
            link: 'https://www.bwindiforestnationalpark.com/',
            name: 'Bwindi Impenetrable National Park'
        },
        {
            link: 'https://www.kideponationalpark.com/',
            name: 'Kidepo Valley National Park'
        },
        {
            link: 'https://www.kibaleforestnationalpark.com/',
            name: 'Kibale Forest National Park'
        },
        {
            link: 'https://www.mgahinganationalpark.org/',
            name: 'Mgahinga National Park'
        },
        {
            link: 'https://www.rwenzorimountainsnationalpark.com/',
            name: 'Rwenzori Mountains National Park'
        },
        {
            link: 'https://www.lakemburoparkuganda.com/',
            name: 'Lake Mbulo National Park'
        },
        {
            link: 'https://www.kibaleforestnationalpark.com/',
            name: 'Mount Elgon National Park'
        },
        {
            link: 'https://www.semulikinationalparkuganda.com/',
            name: 'Semuliki National Park'
        },
        {
            link: 'https://www.masaimara.travel/',
            name: 'Masai Mara National Reserve'
        },
    ]

    const reviews = [
        {
            text: "Oweetu Gorilla Holidays gave us an unforgettable experience in Uganda. The gorilla trek was life-changing.",
            name: "Sarah M.",
            country: "UK",
            hearts: 2
        },
        {
            text: "Everything was perfectly organized. The guides were professional and friendly.",
            name: "David K.",
            country: "Germany",
            hearts: 3
        },
        {
            text: "One of the best safari experiences I’ve ever had. Highly recommend!",
            name: "Linda R.",
            country: "USA",
            hearts: 2
        },
        {
            text: "Uganda is beautiful and this company made our trip very smooth.",
            name: "James P.",
            country: "Canada",
            hearts: 2
        },
        {
            text: "Great customer care and very comfortable lodges. Will come again.",
            name: "Anna T.",
            country: "Netherlands",
            hearts: 2
        }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview(prev => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header1 />
            <HeroSlider />
            <section className='mt-8 bg-white'>
                <div className='max-w-7xl text-center mx-auto my-10 px-4 md:px-0'>
                    <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>Why Travel With Oweetu Gorilla Holidays?</h2>

                    <div className='md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 py-2'>
                        {reasons.map((reason, idx) => (
                            <div key={idx} className='shadow-lg rounded-xl px-3 md:px-7 py-10 space-y-4'>
                                {reason.icon}
                                <span className='text-[#C57712] text-[16px] md:text-lg font-semibold'>{reason.title}</span>
                                <p className='text-sm mt-2 md:leading-7'>{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='relative' style={{ backgroundImage: `url(${bgimage1})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className='absolute inset-0 bg-black/20' />
                    <div className='max-w-7xl text-left mx-auto my-10 py-20 relative'>
                        <div className='grid grid-cols-1 md:grid-cols-5 justify-items-end w-full px-10 text-white'>
                            <div className='col-span-3' />
                            <div className='col-span-2 space-y-6'>
                                <h2 className='text-xl md:text-3xl font-bold'>Discover the Pearl of Africa</h2>
                                <p className='md:text-xl mt-2 leading-8 font-medium mb-10'>
                                    Uganda, known as the “Pearl of Africa” offers lush forests, Savannah plains,  crate lakes and rare wildlife. From gorilla trekking in Bwindi Impenetrable National Park to boot cruises along the Nile in Murchison Falls National Park, every journey is unforgettable. <br /><br />

                                    Diver culture, vibrant cities and warm hospitality make Uganda a must-visit destination for nature lovers and adventure seekers alike.
                                </p>
                                <Link to="/bookings" className="py-4 px-6 rounded font-bold hover:bg-[#b96b11] bg-[#cf7a18]">Start Planning Today</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto my-10 px-4 md:px-0'>
                    <h2 className='text-xl md:text-3xl text-[#070e06] text-center font-bold'>Our Experience Gallery</h2>
                    <p className="text-gray-500 md:text-lg text-center">Explore the beauty of Uganda through the lens of our unforgettable safaris</p>

                    <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 py-2'>
                        {safarisData.slice(0,3).map((experience, idx) => (
                            <div key={idx} className='shadow-lg rounded-xl px-7 py-10 h-80 text-white grid items-end relative' style={{ backgroundImage: `url(${experience.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                <div className='absolute inset-0 bg-black/30 rounded-xl hover:bg-black/50 transition' />
                                <div className='relative space-y-3'>
                                    <span className='text-xl font-semibold'>{experience.title}</span>
                                    <p className='text-lg leading-7 mb-8'>{experience.description.slice(0,30)}...</p>
                                    <Link to={experience.location} className="py-3 px-6 rounded font-bold hover:bg-[#8d500a] bg-[#cf7a18]">View Page</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='relative' style={{ backgroundImage: `url(${bgimage2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className='absolute inset-0 bg-black/10' />
                    <div className='max-w-7xl text-left mx-auto my-10 py-20 relative md:h-100'>
                        <div className='grid grid-cols-1 md:grid-cols-3 justify-items-end w-full px-6 md:px-0 text-white'>
                            <div className='col-span-1 space-y-6'>
                                <h2 className='text-xl md:text-3xl font-bold'>What Our Clients say</h2>
                                <div className='space-y-4 md:mb-10 transition-all duration-700'>
                                    <div className='flex gap-2'>
                                        {[0, 1, 2, 3, 4].map((_, i) => (
                                            <FaStar key={i} className='text-[#cf7a18] fill-[#cf7a18]' size={20} />
                                        ))}
                                    </div>

                                    <p className='text-lg mt-2 leading-7 font-medium'>
                                        “{reviews[currentReview].text}”
                                    </p>

                                    <span className="rounded font-bold text-[#cf7a18]">
                                        {reviews[currentReview].name}, {reviews[currentReview].country}
                                    </span>

                                    <div className='flex gap-2 mt-4'>
                                        {[...Array(reviews[currentReview].hearts)].map((_, i) => (
                                            <FaHeart key={i} className='text-[#aa049c] fill-[#aa049c]' size={20} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2' />
                        </div>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto my-10 px-4 md:px-0'>
                    <h2 className='text-xl md:text-3xl text-[#070e06] text-center font-bold'>Our Destinations</h2>
                    <p className="text-gray-500 md:text-lg text-center">Travel through East Africa to a destination of your choice</p>

                    <div className='mt-2 md:mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                        {destinations.map((destination, idx) => (
                            <div key={idx} className={`shadow-lg rounded-xl text-white grid ${idx % 2 > 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'}`}>
                                <img src={destination.image} alt={destination.title} className='h-56 w-full object-cover rounded-t-xl' />
                                <div className='p-3 pb-8 text-center'>
                                    <span className={`text-2xl md:text-3xl pb-2 md:pb-0 font-semibold ${idx % 2 === 0 ? 'text-[#b97635]' : 'text-[#374b28]'}`}>{destination.title}</span>
                                    <p className='text-lg leading-7 mb-6'>{destination.description}</p>
                                    <Link to={destination.location} className={`py-3 px-6 rounded font-bold ${idx % 2 === 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'}`}>View Page</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-[#f1f1f1] w-full py-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto my-10 items-center'>
                        <img src={tanzania} alt="lions" className='h-full md:h-115 w-full object-cover md:rounded' />
                        <div className='text-left space-y-2 px-4 md:px-0'>
                            <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>Top National Parks to visit</h2>

                            <div className='grid grid-cols-1 gap-3'>
                                {parks.map((park, idx) => (
                                    <a key={idx} href={park.link} target='_blank' className='flex gap-4 hover:text-[#e47e0b] hover:font-bold'>
                                        <FaCheckCircle size={19} className='text-green-500' />
                                        {park.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage
