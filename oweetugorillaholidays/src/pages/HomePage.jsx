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

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import bgimage1 from "../assets/travel-scaled-bg.png";
import bgimage2 from "../assets/falls-scaled-bg.webp";

import rwanda from '@/assets/rwanda.jpg'
import uganda from '@/assets/uganda.jpg'
import kenya from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'

import tanzania from '@/assets/lion-family.jpeg'
import { Link } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';

const base_url = import.meta.env.VITE_API_URL

const HomePage = () => {
    const [currentReview, setCurrentReview] = React.useState(0);
    const [safaris, setSafaris] = React.useState([])

    const getSafaris = async () => {
        try {
            const respo = await axiosInstance.get('safaris');
            setSafaris(respo.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSafaris();
    }, [])

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const fadeInLeft = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

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

    const SectionObserver = ({ children, variants, className = "" }) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "-50px 0px"
        });

        return (
            <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
                {children}
            </motion.div>
        );
    };

    return (
        <div>
            <Header1 />
            <HeroSlider />

            <section className='mt-8 bg-white'>
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl text-center mx-auto px-4 md:px-0 py-8 md:py-16'>
                        <motion.h2 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='text-xl md:text-2xl text-[#070e06] font-medium'>
                            Why Travel With Oweetu Gorilla Holidays?
                        </motion.h2>

                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='mt-2 md:mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                            {reasons.map((reason, idx) => (
                                <motion.div key={idx} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }} className='shadow-xl rounded-xl px-3 md:px-7 py-10 space-y-4 bg-gray-50 w-[95%] mx-auto md:mx-0 md:w-full cursor-pointer'>
                                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                                        {reason.icon}
                                    </motion.div>
                                    <span className='text-[#C57712] text-[16px] md:text-lg font-semibold'>{reason.title}</span>
                                    <p className='text-sm mt-2 md:leading-7'>{reason.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                <motion.div className='relative' style={{ backgroundImage: `url(${bgimage1})`, backgroundSize: "cover", backgroundPosition: "center" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <div className='absolute inset-0 bg-black/20' />
                    <div className='max-w-7xl text-left mx-auto py-20 relative grid grid-cols-1 md:grid-cols-5 justify-items-end text-white'>
                        <div className='col-span-3' />
                        <div className='col-span-2'>
                            <SectionObserver variants={fadeInRight}>
                                <h2 className='text-xl md:text-2xl font-bold'>Discover the Pearl of Africa</h2>
                                <p className='md:text-lg mt-2 leading-8 font-normal mb-10'>
                                    Uganda, known as the "Pearl of Africa" offers lush forests, Savannah plains, crate lakes and rare wildlife. From gorilla trekking in Bwindi Impenetrable National Park to boot cruises along the Nile in Murchison Falls National Park, every journey is unforgettable. <br /><br />

                                    Diver culture, vibrant cities and warm hospitality make Uganda a must-visit destination for nature lovers and adventure seekers alike.
                                </p>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/bookings" className="py-4 px-6 rounded font-bold hover:bg-[#b96b11] bg-[#cf7a18] inline-block">Start Planning Today</Link>
                                </motion.div>
                            </SectionObserver>
                        </div>
                    </div>
                </motion.div>

                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl mx-auto py-6 md:py-16 px-4 md:px-0'>
                        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className='text-xl md:text-2xl text-[#070e06] text-center font-bold'>
                            Our Experience Gallery
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-gray-500 md:text-lg text-center">
                            Explore the beauty of Uganda through the lens of our unforgettable safaris
                        </motion.p>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 py-2'>
                            {safaris.length > 0 ? safaris.slice(0, 3).map((experience, idx) => (
                                <motion.div key={idx} variants={cardVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }} className='shadow-lg rounded-xl px-7 py-10 h-80 text-white grid items-end relative cursor-pointer overflow-hidden' style={{ backgroundImage: `url(${base_url+experience.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                    <div className='absolute inset-0 bg-black/30 rounded-xl hover:bg-black/50 transition duration-300' />
                                    <div className='relative space-y-3'>
                                        <span className='text-xl font-semibold'>{experience.title}</span>
                                        <p className='text-lg leading-7 mb-8'>{experience.description.slice(0, 30)}...</p>
                                        <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                                            <Link to={experience.location} className="py-3 px-6 rounded font-bold hover:bg-[#8d500a] bg-[#cf7a18] inline-block">View Page</Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )): <h4 className='italic text-gray-500'>Safari packages loading</h4>}
                        </motion.div>
                    </div>
                </SectionObserver>

                <motion.div className='relative' style={{ backgroundImage: `url(${bgimage2})`, backgroundSize: "cover", backgroundPosition: "center" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <div className='absolute inset-0 bg-black/10' />
                    <div className='max-w-7xl text-left mx-auto my-10 py-20 relative md:min-h-100'>
                        <div className='grid grid-cols-1 md:grid-cols-3 justify-items-end w-full px-6 md:px-0 text-white'>
                            <SectionObserver variants={fadeInLeft}>
                                <div className='col-span-1 space-y-6'>
                                    <h2 className='text-xl md:text-3xl font-bold'>What Our Clients say</h2>
                                    <motion.div className='space-y-4 md:mb-10' key={currentReview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <div className='flex gap-2'>
                                            {[0, 1, 2, 3, 4].map((_, i) => (
                                                <FaStar key={i} className='text-[#cf7a18] fill-[#cf7a18]' size={20} />
                                            ))}
                                        </div>

                                        <p className='text-lg mt-2 leading-7 font-medium'>
                                            "{reviews[currentReview].text}"
                                        </p>

                                        <span className="rounded font-bold text-[#cf7a18]">
                                            {reviews[currentReview].name}, {reviews[currentReview].country}
                                        </span>

                                        <div className='flex gap-2 mt-4'>
                                            {[...Array(reviews[currentReview].hearts)].map((_, i) => (
                                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}>
                                                    <FaHeart className='text-[#aa049c] fill-[#aa049c]' size={20} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </SectionObserver>
                            <div className='col-span-2' />
                        </div>
                    </div>
                </motion.div>

                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl mx-auto py-6 md:py-16 px-4 md:px-0'>
                        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className='text-xl md:text-2xl text-[#070e06] text-center font-bold'>
                            Our Destinations
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-gray-500 md:text-lg text-center">
                            Travel through East Africa to a destination of your choice
                        </motion.p>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mt-2 md:mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                            {destinations.map((destination, idx) => (
                                <motion.div key={idx} variants={cardVariants} whileHover={{ y: -10 }} className={`shadow-lg rounded-xl text-white grid ${idx % 2 > 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'} cursor-pointer overflow-hidden`}>
                                    <motion.img src={destination.image} alt={destination.title} className='h-56 w-full object-cover rounded-t-xl' whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                                    <div className='p-3 pb-8 text-center'>
                                        <span className={`text-2xl md:text-3xl pb-2 md:pb-0 font-semibold ${idx % 2 === 0 ? 'text-[#b97635]' : 'text-[#374b28]'}`}>{destination.title}</span>
                                        <p className='text-lg leading-7 mb-6'>{destination.description}</p>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link to={destination.location} className={`py-3 px-6 rounded font-bold inline-block ${idx % 2 === 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'}`}>View Page</Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                <motion.div className='bg-[#e0e0e0] w-full py-10' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto my-10 items-center'>
                        <motion.div className='relative h-full md:h-125 overflow-hidden rounded-lg' whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                            <div className='absolute inset-0 bg-black/20' />
                            <img src={tanzania} alt="lions" className='h-full w-full object-cover md:rounded' />
                        </motion.div>
                        <SectionObserver variants={fadeInRight}>
                            <div className='text-left space-y-2 px-4 md:px-0'>
                                <h2 className='text-xl md:text-2xl text-[#070e06] font-bold'>Top National Parks to visit</h2>

                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='grid grid-cols-1 gap-3 mt-6'>
                                    {parks.map((park, idx) => (
                                        <motion.a key={idx} href={park.link} target='_blank' variants={cardVariants} whileHover={{ x: 10, color: "#e47e0b" }} className='flex gap-4 hover:text-[#e47e0b] hover:font-bold text-[15px] cursor-pointer transition-all duration-300'>
                                            <FaCheckCircle size={17} className='text-green-500' />
                                            {park.name}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>
                        </SectionObserver>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage