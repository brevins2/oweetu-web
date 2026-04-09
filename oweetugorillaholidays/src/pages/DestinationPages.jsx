import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import uganda from '@/assets/uganda.jpg'
import ken from '@/assets/ken.jpg'
import tz from '@/assets/lion-family.jpeg'
import rwanda from '@/assets/rwanda.jpg'
import pearl from '@/assets/pearl.webp'
import guides from '@/assets/guides.jpg'
import tanzania from '@/assets/lion-family.jpeg'

import tourists from '@/assets/tourists.jpeg'
import hotel1 from '@/assets/hotel-1.jpeg'
import car_inside from '@/assets/car-inside.jpeg'
import car1 from '@/assets/car1.jpeg'

import FleetSlider from '@/components/FleetSlider'

const DestinationPages = () => {
    // Animation variants
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
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    // Custom hook for scroll animations
    const SectionObserver = ({ children, variants, className = "" }) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "-50px 0px"
        });

        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                className={className}
            >
                {children}
            </motion.div>
        );
    };

    const countries = [
        {
            name: "Uganda",
            image: uganda,
            description: "Explore Uganda's exceptional wildlife, savanna, water bodies and diverse culture",
            bg: "bg-[#374b28]"
        },
        {
            name: "Kenya",
            image: ken,
            description: "The Masai Mara, national parks and rich savanna, Kenya's tourism stands out",
            bg: "bg-[#c47a2c]"
        },
        {
            name: "Tanzania",
            image: tz,
            description: "From the slopes of Kilimanjaro to the savannas & beautiful coast, Tanzania is rich",
            bg: "bg-[#374b28]"
        },
        {
            name: "Rwanda",
            image: rwanda,
            description: "Trek the gorillas, chimpanzees & explore national parks in the heart of Rwanda",
            bg: "bg-[#c47a2c]"
        }
    ]

    const sections = [
        {
            title: "Uganda tourism",
            image: pearl,
            items: [
                "Wildlife & Eco Tourism (national parks & reserves)",
                "Adventure Tourism (River Nile)",
                "Cultural & Heritage Tourism",
                "MICE Tourism (Meetings & Conferences)",
                "Sports Tourism",
                "Luxury & Leisure Travel"
            ]
        },
        {
            title: "Kenya tourism",
            image: guides,
            items: [
                "Wildlife & Safari Tourism (Masai Mara)",
                "MICE Tourism",
                "Coastal & Beach Tourism",
                "Cultural & Heritage Tourism",
                "Adventure Tourism"
            ]
        },
        {
            title: "Tanzanian tourism",
            image: tanzania,
            items: [
                "Wildlife & Safari Tourism",
                "Coastal & Island Tourism",
                "Mountain Adventure Tourism",
                "Luxury Tourism & Hospitality",
                "Eco-Tourism & Community Tourism"
            ]
        },
        {
            title: "Rwanda tourism",
            image: rwanda,
            items: [
                "Wildlife Tourism (Primates)",
                "MICE Tourism",
                "Luxury & High-End Tourism",
                "Cultural & Community Tourism",
                "Sports Tourism"
            ]
        }
    ]

    return (
        <div>
            <Header2 />
            <Banner title="Top Destinations" />

            <section className='bg-white py-10'>
                {/* Hero Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-6xl mx-auto text-center px-4 py-8 md:py-10'>
                        <motion.h2
                            className='text-xl md:text-2xl font-bold text-[#070e06]'
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Explore the beauties of East Africa
                        </motion.h2>
                        <motion.p
                            className='text-gray-500 mt-4 max-w-5xl mx-auto'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            East Africa is blessed with beautiful landscapes, wildlife, mountains,
                            historical sites and rich cultures. Be part of the amazing journey
                            and explore the best of East Africa with Oweetu Gorilla Holidays.
                        </motion.p>
                    </div>
                </SectionObserver>

                {/* Countries Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='max-w-7xl mx-auto pb-8 md:pb-16 grid grid-cols-1 md:grid-cols-4 gap-6 px-4'
                >
                    {countries.map((country, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className='rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white'
                        >
                            <motion.div className='overflow-hidden'>
                                <motion.img
                                    src={country.image}
                                    alt={country.name}
                                    className='h-52 w-full object-cover'
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>
                            <div className={`${country.bg} text-white p-6 text-center`}>
                                <motion.h3
                                    className='text-2xl font-bold'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {country.name}
                                </motion.h3>
                                <motion.p
                                    className='text-sm mt-2 leading-6'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.1 + 0.1 }}
                                >
                                    {country.description}
                                </motion.p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to={`/destinations/country/${country.name.toLowerCase()}`}
                                        className='inline-block mt-4 bg-white text-[#374b28] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors'
                                    >
                                        Explore
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* About Section with Slider */}
                <motion.div
                    className='bg-[#dcdedb] py-8 md:py-20 mt-4'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4'>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <FleetSlider images={[tourists, car1, car_inside, hotel1]} height="450px" />
                        </motion.div>

                        <SectionObserver variants={fadeInRight}>
                            <div className='space-y-5'>
                                <motion.h2
                                    className='text-xl md:text-2xl font-bold text-[#070e06]'
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Oweetu Gorilla Holidays
                                </motion.h2>

                                <motion.p
                                    className='text-gray-600 leading-7 pb-4'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    We are determined to carry out destinations across East Africa, to bring what is hidden in wildlife and in the communities. Our destinations are well chosen to serve the wonders of our clients to see, enjoy and learn what is in each location.
                                    <br /><br />
                                    East Africa is blessed with great unique adventures, adventures that have brought thousands of people from all the continents of the world. Historic sites, cultural diversities, great animals and more have made our destinations very great.
                                    <br /><br />
                                    Uganda, Kenya, Tanzania, Rwanda have a lot to share with you, choose your destination today.
                                </motion.p>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/bookings"
                                        className='inline-block bg-[#cf7a18] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b96b11] transition-colors'
                                    >
                                        Book today
                                    </Link>
                                </motion.div>
                            </div>
                        </SectionObserver>
                    </div>
                </motion.div>

                {/* Tourism Sections */}
                <div className='max-w-7xl mx-auto py-8 md:py-20 space-y-20 px-4'>
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className='overflow-hidden rounded-2xl shadow-lg'
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={section.image}
                                    alt={section.title}
                                    className='rounded-2xl shadow-lg h-96 w-full object-cover'
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.h3
                                    className='text-2xl font-bold text-[#070e06] mb-4'
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    {section.title}
                                </motion.h3>

                                <motion.ul
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className='space-y-3 text-gray-600'
                                >
                                    {section.items.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            variants={listItemVariants}
                                            whileHover={{ x: 10 }}
                                            className='flex gap-3 items-start group cursor-pointer'
                                        >
                                            <motion.span
                                                className='w-2 h-2 bg-[#cf7a18] rounded-full mt-2 group-hover:scale-125 transition-transform duration-200'
                                                whileHover={{ scale: 1.5 }}
                                            ></motion.span>
                                            <span className='group-hover:text-[#cf7a18] transition-colors duration-300'>
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DestinationPages