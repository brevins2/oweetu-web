import Footer from '@/components/footer'
import Header1 from '@/components/header1'
import HeroSlider from '@/components/heroSlider'
import { GoGlobe } from "react-icons/go";
import { FaHeart, FaLeaf, FaUsers, FaAward, FaCamera, FaPhoneAlt } from "react-icons/fa";
import { FaHatCowboy } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

    // Reduced animations - only entry animations, no continuous effects
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    }

    const reasons = [
        {
            icon: <FaHatCowboy size={36} />,
            title: 'Expert Gorilla Trekking Guides',
            description: 'Certified local guides with over a decade of experience in primate trekking and wildlife safaris',
            linear: 'from-amber-50 to-orange-50'
        },
        {
            icon: <GoGlobe size={36} />,
            title: 'Authentic Ugandan Experience',
            description: 'Immerse yourself in rich culture, diverse wildlife, and breathtaking landscapes of the Pearl of Africa',
            linear: 'from-emerald-50 to-teal-50'
        },
        {
            icon: <MdOutlineVerified size={36} />,
            title: 'Luxury & Comfort',
            description: 'Hand-picked eco-lodges and premium accommodations that blend luxury with nature',
            linear: 'from-blue-50 to-indigo-50'
        },
        {
            icon: <FaShieldAlt size={36} />,
            title: 'Safe & Responsible Travel',
            description: 'Secure and peaceful travels with comprehensive safety protocols and 24/7 support',
            linear: 'from-purple-50 to-pink-50'
        }
    ]

    const stats = [
        { value: '10+', label: 'Years Experience', icon: <FaAward /> },
        { value: '5,000+', label: 'Happy Travelers', icon: <FaUsers /> },
        { value: '50+', label: 'Safari Packages', icon: <GoGlobe /> },
        { value: '24/7', label: 'Customer Support', icon: <TbClock24 /> },
    ]

    const destinations = [
        {
            title: "Uganda",
            image: uganda,
            description: "Explore Uganda's exceptional wildlife, savanna plains, and the mighty Nile River",
            highlights: ["Gorilla Trekking", "Source of the Nile", "Queen Elizabeth Park"]
        },
        {
            title: "Kenya",
            image: kenya,
            description: "Witness the Great Migration in Masai Mara and experience Kenya's iconic savanna landscapes",
            highlights: ["Masai Mara", "Great Migration", "Amboseli"]
        },
        {
            title: "Tanzania",
            image: tz,
            description: "From the slopes of Kilimanjaro to the Serengeti plains, Tanzania offers unparalleled adventure",
            highlights: ["Serengeti", "Ngorongoro", "Kilimanjaro"]
        },
        {
            title: "Rwanda",
            image: rwanda,
            description: "Trek mountain gorillas in Volcanoes National Park and explore the land of a thousand hills",
            highlights: ["Gorilla Trekking", "Nyungwe Forest", "Kigali City"]
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
            text: "An absolutely life-changing experience! The gorilla trek in Bwindi was surreal, and the entire trip was flawlessly organized. Oweetu exceeded all our expectations.",
            name: "Sarah Mitchell",
            country: "United Kingdom",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            text: "Professional guides, comfortable lodges, and seamless logistics. The wildlife viewing was spectacular - saw the Big Five and more! Highly recommend Oweetu.",
            name: "David Chen",
            country: "Germany",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            text: "From the first email to the final drop-off, everything was perfect. The team's attention to detail and passion for Uganda's wildlife made our safari unforgettable.",
            name: "Linda Rodriguez",
            country: "USA",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        {
            text: "Best decision we made! The value for money is incredible. Our guide was knowledgeable and went above and beyond to ensure we had the best experience.",
            name: "James Peterson",
            country: "Canada",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/4.jpg"
        }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview(prev => (prev + 1) % reviews.length);
        }, 6000);
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
        <div className="bg-white">
            <Header1 />
            <HeroSlider />

            {/* Stats Section - Commented out as in original */}
            {/* <motion.div className="bg-linear-to-r from-[#070e06] to-[#1a2a14] py-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center text-white"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-3xl mb-2 flex justify-center text-[#C57712]">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div> */}

            <section className='bg-white'>
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl text-center mx-auto px-4 md:px-0 py-12 md:py-20'>
                        <div>
                            <span className="text-[#C57712] text-sm md:text-base font-semibold tracking-wide uppercase">Why Choose Us</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mt-2 mb-4'>
                                Create Memories That Last a Lifetime
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                We're passionate about creating authentic African safari experiences that exceed expectations
                            </p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-4 gap-6'>
                            {reasons.map((reason, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariants}
                                    className={`group relative rounded-2xl p-6 md:p-8 bg-linear-to-br ${reason.linear} shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden`}
                                >
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-md">
                                            <div className="text-[#C57712]">
                                                {reason.icon}
                                            </div>
                                        </div>
                                        <h3 className='text-[#070e06] text-lg font-bold mb-3'>{reason.title}</h3>
                                        <p className='text-gray-600 text-sm leading-relaxed'>{reason.description}</p>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C57712] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                {/* Discover the Pearl of Africa Section - Entry animation only, no parallax continuous effect */}
                <motion.div
                    className='relative overflow-hidden'
                    style={{ backgroundImage: `url(${bgimage1})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className='absolute inset-0 bg-linear-to-r from-black/80 to-black/40' />
                    <div className='max-w-7xl mx-auto py-20 md:py-28 relative px-4 md:px-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                            <SectionObserver variants={fadeInLeft}>
                                <div className='text-white'>
                                    <span className="text-[#C57712] text-sm font-semibold tracking-wide uppercase">Discover</span>
                                    <h2 className='text-3xl md:text-4xl font-bold mt-2 mb-4'>The Pearl of Africa</h2>
                                    <p className='text-gray-200 text-lg leading-relaxed mb-6'>
                                        Uganda, known as the <span className="text-[#C57712] font-semibold">"Pearl of Africa"</span> offers lush forests, savannah plains, crater lakes, and rare wildlife.
                                        From gorilla trekking in Bwindi Impenetrable National Park to boat cruises along the Nile in Murchison Falls National Park,
                                        every journey is unforgettable.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        {["Gorilla Trekking", "Wildlife Safaris", "Bird Watching", "Cultural Tours"].map((item, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <Link to="/bookings" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-[#C57712] to-[#e0962c] text-white hover:shadow-lg transition-shadow duration-300">
                                            Start Planning Today
                                            <FaLeaf className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </SectionObserver>
                            <SectionObserver variants={fadeInRight}>
                                <div className="grid grid-cols-2 gap-4">
                                    {[uganda, kenya, tz, rwanda].slice(0, 4).map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
                                        >
                                            <img src={img} alt="Uganda safari" className="w-full h-32 md:h-40 object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </SectionObserver>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Safaris Section - Entry animation only */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-0'>
                        <div className="text-center mb-10">
                            <span className="text-[#C57712] text-sm font-semibold tracking-wide uppercase">Featured Adventures</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mt-2 mb-4'>
                                Our Most Popular Safaris
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                Carefully curated safari experiences that showcase the best of East Africa
                            </p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {safaris.length > 0 ? safaris.slice(0, 3).map((safari, idx) => (
                                <motion.div key={idx} variants={cardVariants} className='group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
                                    <div className='relative h-80 overflow-hidden'>
                                        <img
                                            src={base_url + safari.image}
                                            alt={safari.title}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                        />
                                        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent' />
                                        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                                            <h3 className='text-xl font-bold mb-2'>{safari.title}</h3>
                                            <p className='text-sm text-gray-200 mb-4'>{safari.description.slice(0, 80)}...</p>
                                            <div>
                                                <Link to={`/safaris/${safari.id}`} className="inline-flex items-center gap-2 text-[#C57712] font-semibold hover:text-[#e0962c] transition-colors">
                                                    Discover Safari →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-3 text-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C57712] mx-auto"></div>
                                    <p className="mt-4 text-gray-500">Loading amazing safaris...</p>
                                </div>
                            )}
                        </motion.div>

                        <div className="text-center mt-10">
                            <Link to="/safaris" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold border-2 border-[#C57712] text-[#C57712] hover:bg-[#C57712] hover:text-white transition-colors duration-300">
                                View All Safaris
                                <GoGlobe size={18} />
                            </Link>
                        </div>
                    </div>
                </SectionObserver>

                {/* Testimonials Section - Entry animation only, no motion on hover */}
                <motion.div
                    className='relative py-20 bg-linear-to-br from-gray-50 to-white'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className='max-w-7xl mx-auto px-4'>
                        <div className="text-center mb-6">
                            <span className="text-[#C57712] text-sm font-semibold tracking-wide uppercase">Testimonials</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mt-2 mb-1'>
                                What Our Travelers Say
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                Real experiences from guests who explored Africa with us
                            </p>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentReview}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 uppercase flex items-center justify-center font-bold text-2xl">
                                            <span>{reviews[currentReview].name[0]}{reviews[currentReview].name.split(' ')[1]?.[0] || ''}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{reviews[currentReview].name}</h4>
                                            <p className="text-sm text-gray-500">{reviews[currentReview].country}</p>
                                            <div className="flex gap-1 mt-1">
                                                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                                                    <FaStar key={i} className="text-[#C57712] text-sm" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
                                            <path d="M10 8c-4.4 0-8 3.6-8 8v8h8v-8H4c0-3.3 2.7-6 6-6V8zm16 0c-4.4 0-8 3.6-8 8v8h8v-8h-6c0-3.3 2.7-6 6-6V8z" />
                                        </svg>
                                        <p className="text-gray-700 text-lg leading-relaxed pl-6">
                                            "{reviews[currentReview].text}"
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dots Navigation */}
                            <div className="flex justify-center gap-2 mt-6">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentReview(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentReview === idx ? 'w-6 bg-[#C57712]' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Destinations Section - Entry animation only */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-0'>
                        <div className="text-center mb-10">
                            <span className="text-[#C57712] text-sm font-semibold tracking-wide uppercase">Explore</span>
                            <h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mt-2 mb-4'>
                                Our Top Destinations
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                Discover the diverse landscapes and wildlife of East Africa
                            </p>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
                            {destinations.map((destination, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariants}
                                    className='group rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
                                >
                                    <div className='relative h-56 overflow-hidden'>
                                        <img
                                            src={destination.image}
                                            alt={destination.title}
                                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                                        />
                                        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
                                        <h3 className='absolute bottom-4 left-4 text-white text-2xl font-bold'>{destination.title}</h3>
                                    </div>
                                    <div className='p-5'>
                                        <p className='text-gray-600 text-sm mb-4'>{destination.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {destination.highlights.map((highlight, i) => (
                                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                        <Link to={`/destinations/${destination.title.toLowerCase()}`} className="text-[#C57712] font-semibold text-sm hover:text-[#e0962c] transition-colors inline-flex items-center gap-1">
                                            Explore {destination.title} →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                {/* National Parks Section - Entry animation only */}
                <motion.div
                    className='bg-linear-to-br from-gray-50 to-white w-full py-16'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className='max-w-7xl mx-auto px-4'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                            <SectionObserver variants={fadeInLeft}>
                                <div>
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
                                        <img src={tanzania} alt="Wildlife in Africa" className='w-full h-full object-cover' />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <p className="text-sm font-semibold">Wildlife Experience</p>
                                                <p className="text-lg font-bold">Witness the Big Five in their natural habitat</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SectionObserver>

                            <SectionObserver variants={fadeInRight}>
                                <div className='space-y-4'>
                                    <div>
                                        <span className="text-[#C57712] text-sm font-semibold tracking-wide uppercase">National Parks</span>
                                        <h2 className='text-2xl md:text-3xl font-bold text-[#070e06] mt-2 mb-4'>
                                            Top National Parks to Visit
                                        </h2>
                                        <p className='text-gray-600'>
                                            Explore Uganda's most spectacular national parks, each offering unique wildlife experiences and breathtaking landscapes
                                        </p>
                                    </div>

                                    <div className='grid grid-cols-1 gap-3 mt-6'>
                                        {parks.map((park, idx) => (
                                            <a key={idx} href={park.link} target='_blank' rel="noopener noreferrer" className='group flex items-start gap-3 rounded-xl hover:bg-white/50 transition-colors duration-300 p-2 -m-2'>
                                                <FaCheckCircle className='text-[#C57712] mt-0.5 shrink-0' size={18} />
                                                <div>
                                                    <span className='font-semibold text-gray-800 group-hover:text-[#C57712] transition-colors'>
                                                        {park.name}
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {/* <div>
                                        <Link to="/destinations" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#C57712] text-white rounded-xl font-semibold hover:bg-[#e0962c] transition-colors duration-300 shadow-md">
                                            Explore All Parks
                                            <GoGlobe size={18} />
                                        </Link>
                                    </div> */}
                                </div>
                            </SectionObserver>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section - Entry animation only */}
                <motion.div
                    className="bg-linear-to-r from-[#070e06] to-[#1a2a14] py-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready for Your African Adventure?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Let us help you plan the safari of your dreams. Contact our travel experts today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="px-8 py-3 bg-[#C57712] text-white rounded-xl font-semibold hover:bg-[#e0962c] transition-colors duration-300 shadow-lg">
                                Plan Your Safari
                            </Link>
                            <Link to="/safaris" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#070e06] transition-colors duration-300">
                                Browse Safaris
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage