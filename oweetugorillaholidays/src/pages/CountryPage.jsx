import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiMountains } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { FaLeaf } from 'react-icons/fa'
import { PiMapPinAreaFill } from "react-icons/pi";

import ugandaMap from '@/assets/Uganda-map.jpg'
import kenyaMap from '@/assets/kenya-map.jpg'
import tanzaniaMap from '@/assets/tanzania-map.jpg'
import rwandaMap from '@/assets/rwanda-map.png'

import uganda from '@/assets/uganda.jpg'
import ken from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'
import rwanda from '@/assets/rwanda.jpg'

const countryData = {
    uganda: {
        name: "Uganda",
        banner: uganda,
        map: ugandaMap,
        description:
            "Uganda, famously known as the Pearl of Africa, offers lush forests, mountain gorillas, savanna wildlife and rich cultures. From Bwindi Impenetrable National Park to Murchison Falls and the River Nile, Uganda provides one of the most diverse tourism experiences in Africa.",

        tourism: [
            "Wildlife & National Parks Tourism",
            "Gorilla & Chimpanzee Trekking",
            "Adventure Tourism (River Nile rafting)",
            "Cultural & Heritage Tourism",
            "Luxury & Eco Tourism"
        ],

        highlights: [
            "Bwindi Impenetrable National Park",
            "Queen Elizabeth National Park",
            "Murchison Falls National Park",
            "Lake Bunyonyi",
            "River Nile in Jinja"
        ]
    },

    kenya: {
        name: "Kenya",
        banner: ken,
        map: kenyaMap,
        description:
            "Kenya is one of Africa's most famous safari destinations. From the Masai Mara to the beautiful coastal beaches of Mombasa, Kenya offers world-class wildlife, culture and luxury tourism experiences.",

        tourism: [
            "Wildlife & Safari Tourism",
            "Coastal & Beach Tourism",
            "Luxury Safari Experiences",
            "Cultural Tourism (Maasai heritage)",
            "Adventure Tourism"
        ],

        highlights: [
            "Masai Mara National Reserve",
            "Nairobi National Park",
            "Mombasa Beaches",
            "Mount Kenya",
            "Amboseli National Park"
        ]
    },

    tanzania: {
        name: "Tanzania",
        banner: tz,
        map: tanzaniaMap,
        description:
            "Tanzania is home to Mount Kilimanjaro, the Serengeti and the beautiful island of Zanzibar. It is one of the richest tourism countries in East Africa offering wildlife, adventure and luxury travel experiences.",

        tourism: [
            "Wildlife & Safari Tourism",
            "Mountain Adventure Tourism",
            "Island & Coastal Tourism",
            "Luxury Tourism & Resorts",
            "Eco Tourism"
        ],

        highlights: [
            "Serengeti National Park",
            "Mount Kilimanjaro",
            "Zanzibar Island",
            "Ngorongoro Crater",
            "Tarangire National Park"
        ]
    },

    rwanda: {
        name: "Rwanda",
        banner: rwanda,
        map: rwandaMap,
        description:
            "Rwanda is one of Africa's fastest growing tourism destinations. Known for its clean cities and mountain gorilla trekking experiences, Rwanda offers a perfect combination of wildlife, luxury and cultural tourism.",

        tourism: [
            "Gorilla Trekking Tourism",
            "Luxury Tourism",
            "Cultural & Heritage Tourism",
            "Eco Tourism",
            "Sports Tourism"
        ],

        highlights: [
            "Volcanoes National Park",
            "Kigali City",
            "Lake Kivu",
            "Nyungwe Forest National Park",
            "Akagera National Park"
        ]
    }
}

const CountryPage = () => {
    const { country } = useParams()
    const data = countryData[country]

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
                staggerChildren: 0.1,
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

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    const iconHover = {
        whileHover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
        whileTap: { scale: 0.95 }
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

    if (!data) {
        return (
            <div>
                <Header2 />
                <motion.div
                    className="text-center py-40 text-2xl font-bold"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Country not found
                </motion.div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header2 />
            <Banner title={data.name} />

            <section className="bg-white py-12">
                {/* Hero Description Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className="max-w-6xl mx-auto text-center px-4">
                        <motion.h2
                            className="text-xl md:text-3xl font-bold text-[#070e06]"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Discover {data.name}
                        </motion.h2>

                        <motion.p
                            className="text-gray-600 mt-6 leading-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {data.description}
                        </motion.p>
                    </div>
                </SectionObserver>

                {/* Map & Tourism Section */}
                <div className="max-w-7xl mx-auto py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
                    <motion.div
                        className="overflow-hidden rounded-2xl shadow-lg"
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src={data.map}
                            alt={data.name}
                            className="w-full h-96 object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>

                    <SectionObserver variants={fadeInRight}>
                        <div>
                            <motion.h3
                                className="text-2xl font-semibold text-[#070e06] mb-6"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Tourism in {data.name}
                            </motion.h3>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {data.tourism.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                        className="flex gap-4 items-start group cursor-pointer"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <FaLeaf className="text-[#cf7a18]" size={20} />
                                        </motion.div>
                                        <span className="text-gray-700 group-hover:text-[#cf7a18] transition-colors duration-300">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </SectionObserver>
                </div>

                {/* Top Places Section */}
                <motion.div
                    className='bg-[#f1f1f1] py-16'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.h3
                            className="text-xl md:text-2xl font-bold text-[#070e06] text-center"
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Top Places to Visit in {data.name}
                        </motion.h3>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6"
                        >
                            {data.highlights.map((place, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariants}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="rounded-2xl shadow-md px-4 py-6 bg-white hover:shadow-xl transition-all duration-300 flex gap-2 cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.3, rotate: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <PiMapPinAreaFill className="text-[#cf7a18] mb-4" size={26} />
                                    </motion.div>
                                    <h4 className="font-semibold group-hover:text-[#cf7a18]">{place}</h4>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Tourism Experiences Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className="max-w-7xl mx-auto py-10 px-4">
                        <motion.h3
                            className="text-xl md:text-2xl font-semibold text-[#070e06] text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Tourism Experiences
                        </motion.h3>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {/* Adventure Tourism Card */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-[#374b28] text-white rounded-2xl p-8 cursor-pointer"
                            >
                                <motion.div
                                    variants={iconHover}
                                    whileHover="whileHover"
                                    whileTap="whileTap"
                                >
                                    <GiMountains size={30} className="mb-4" />
                                </motion.div>
                                <motion.h4
                                    className="text-xl font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Adventure Tourism
                                </motion.h4>
                                <motion.p
                                    className="text-sm mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Explore mountains, national parks and adventure experiences across {data.name}.
                                </motion.p>
                            </motion.div>

                            {/* Wildlife Tourism Card */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-[#cf7a18] text-white rounded-2xl p-8 cursor-pointer"
                            >
                                <motion.div
                                    variants={iconHover}
                                    whileHover="whileHover"
                                    whileTap="whileTap"
                                >
                                    <FaCamera size={30} className="mb-4" />
                                </motion.div>
                                <motion.h4
                                    className="text-xl font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Wildlife Tourism
                                </motion.h4>
                                <motion.p
                                    className="text-sm mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Experience wildlife safaris and unforgettable nature adventures.
                                </motion.p>
                            </motion.div>

                            {/* Eco Tourism Card */}
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-[#1b1b1b] text-white rounded-2xl p-8 cursor-pointer"
                            >
                                <motion.div
                                    variants={iconHover}
                                    whileHover="whileHover"
                                    whileTap="whileTap"
                                >
                                    <FaLeaf size={30} className="mb-4" />
                                </motion.div>
                                <motion.h4
                                    className="text-xl font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Eco Tourism
                                </motion.h4>
                                <motion.p
                                    className="text-sm mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Enjoy sustainable travel experiences in nature and communities.
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </div>
                </SectionObserver>
            </section>
            <Footer />
        </div>
    )
}

export default CountryPage