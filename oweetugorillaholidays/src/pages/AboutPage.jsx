import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import oweetu_fleet from '@/assets/oweetu_fleet.jpeg'
import car1 from '@/assets/car1.jpeg'
import car3 from '@/assets/car3.jpeg'
import car4 from '@/assets/car4.jpeg'
import car6 from '@/assets/car6.jpeg'
import car12 from '@/assets/car12.jpeg'

import uganda from '@/assets/uganda.jpg'
import kenya from '@/assets/ken.jpg'
import tz from '@/assets/lion-family.jpeg'
import rwanda from '@/assets/rwanda.jpg'

import hotel1 from '@/assets/hotel-1.jpg'
import hotel2 from '@/assets/hotel-3.jpeg'
import hotel3 from '@/assets/hotel-1.jpeg'
import campfire from '@/assets/campfire.jpg'

import equator from '@/assets/equator-line-4.jpeg'

import FleetSlider from '@/components/FleetSlider'

const AboutPage = () => {
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

    const imageHover = {
        whileHover: { scale: 1.05, transition: { duration: 0.4 } }
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

    const accomodations = [
        {
            title: "Scenery views",
            image: hotel1,
            description: "Relax with the best views of the wild with our accommodations, great view, fresh air and amazing relaxations",
        },
        {
            title: "Luxury Hotels",
            image: hotel3,
            description: "Stay dot com with luxurious hotels in the country and enjoy comfort and relaxation mixed with luxury"
        },
        {
            title: "Swimming pools & bars",
            image: hotel2,
            description: "Relax in swimming pools and bars after the day's trip that are open 24/7 for your satisifaction"
        },
        {
            title: "Camp fires",
            image: campfire,
            description: "Desire a camp fire, story telling under the stars of the night, and make lifetime memories"
        },
    ]

    return (
        <div>
            <Header2 />
            <Banner title="About us" />

            <section className='mt-8 bg-white'>
                {/* About Text Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl text-center mx-auto py-8 md:py-16 px-2 md:px-4'>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className='md:text-lg text-[#070e06] font-light leading-relaxed'
                        >
                            Oweetu Gorilla Holidays is a safari company based in Uganda that carries out tours across East Africa. The <i>"Pearl of Africa"</i> has a lot to offer to tourist from everywhere across the world. This has been a great support for many business minded country men and women. From water bodies, animals, forests, savanna areas, landscapes, history and culture, there has been a big room for everyone who wants to work.
                            <br /><br />

                            Oweetu Gorilla Holidays is a dream of an adventure loving Ugandan who has grown up watching the wildlife, sharing the tourism experience from the heart of Queen Elizabeth national park. As a young lad, he has grown up seeing tourist vehicles and groups come in and out of the park and surrounding water bodies like Kazinga Channel and this and his love for adventure travel have pushed him to have a desire to take part in this economic activity.
                        </motion.p>
                    </div>
                </SectionObserver>

                {/* Fleet Section */}
                <motion.div
                    className="bg-[#eaeaea] md:py-16 py-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-14">
                        <motion.div
                            className="h-75 md:h-125 overflow-hidden rounded-xl"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <FleetSlider images={[oweetu_fleet, car1, car3, car4, car6, car12]} />
                        </motion.div>

                        <SectionObserver variants={fadeInRight}>
                            <div className="space-y-4 text-[#070e06]">
                                <motion.h3
                                    className="text-2xl md:text-2xl font-bold"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Reliable, Comfortable & Built for Adventure
                                </motion.h3>
                                <motion.p
                                    className="text-gray-600 leading-7"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    Our fleet is carefully selected to handle the diverse terrains of East Africa,
                                    from smooth highways to rugged national park trails. Whether you're exploring
                                    savannas, forests, or mountainous regions, we ensure a smooth and safe journey.
                                </motion.p>
                                <motion.p
                                    className="text-gray-600 leading-7"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    Each vehicle is well-maintained, spacious, and designed for comfort — with
                                    features like pop-up roofs for wildlife viewing, ample seating, and modern
                                    travel amenities.
                                </motion.p>
                                <motion.p
                                    className="text-gray-600 leading-7"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    Our drivers are highly experienced, knowledgeable, and passionate about tourism.
                                    With years of experience navigating national parks and tourist routes, they not
                                    only ensure your safety but also enrich your journey with local insights and
                                    unforgettable experiences.
                                </motion.p>
                                <motion.p
                                    className="text-gray-600 leading-7 font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    Travel with confidence — your adventure is in safe hands.
                                </motion.p>
                            </div>
                        </SectionObserver>
                    </div>
                </motion.div>

                {/* Pearl of Africa Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto my-10 px-4 md:px-0'>
                    <SectionObserver variants={fadeInLeft}>
                        <div className='text-left space-y-2'>
                            <h2 className='text-xl md:text-2xl text-[#070e06] font-bold'>The pearl of Africa</h2>

                            <p className='text-[15px] leading-7 mb-6 font-light'>
                                Uganda is a country with 2 seasons, rainy and sunny seasons. Our guides and vehicles are built with the capability to carry out trips for tourists at any time of their choosing.<br />
                                Sunny/dry season(summer) that is mid year is usually the most preferred by many of our clients because of the easiness of transportation across the national parks plus most conducive environment that favor their enjoyment.<br /><br />

                                National parks like Queen Elizabeth, Murchison Falls, Bwindi Impenetrable, and many more always parked with tourists from with in and outside the country. Birds in the air and animals outside grazing, migrating and cooling down, water bodies clear and holiday makers enjoying.<br />
                                Enjoying the cultural art crafts from the tourist shops, participate in the cultural dances and many more things that make Uganda unique
                            </p>
                        </div>
                    </SectionObserver>

                    <motion.div
                        className='overflow-hidden rounded-xl'
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src={equator}
                            alt="Equator line"
                            className='h-full md:h-125 w-full object-cover'
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>
                </div>

                {/* Destinations Section */}
                <motion.div
                    className="bg-[#eaeaea] py-8 md:py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className='max-w-7xl mx-auto px-4 md:px-0'>
                        <motion.h2
                            className='text-xl md:text-2xl text-[#070e06] text-center font-bold'
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Explore the beauties of East Africa
                        </motion.h2>
                        <motion.p
                            className="text-gray-500 md:text-[15.7px] text-center md:mx-auto md:w-[90%] mt-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            East Africa is blessed with beauties from water bodies, animal, amazing landscapes, diverse culture and various historical sites. Be part of the amazing journey and explore the best of East Africa with Oweetu Gorilla Holidays
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'
                        >
                            {destinations.map((destination, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariants}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className={`shadow-lg rounded-xl text-white grid ${idx % 2 > 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'} cursor-pointer overflow-hidden`}
                                >
                                    <motion.div className='overflow-hidden'>
                                        <motion.img
                                            src={destination.image}
                                            alt={destination.title}
                                            className='h-56 w-full object-cover rounded-t-xl'
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.div>
                                    <div className='p-6 pb-8 text-center'>
                                        <motion.span
                                            className="text-2xl mt-2 font-semibold text-white"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            {destination.title}
                                        </motion.span>
                                        <p className='text-[16px] leading-7 mb-6 mt-2'>{destination.description}</p>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link to={destination.location} className='inline-block mt-2 bg-white text-[#374b28] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
                                                Explore
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Accommodations Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl mx-auto px-4 md:px-0 py-8 md:py-20'>
                        <motion.h2
                            className='text-xl md:text-2xl text-[#070e06] text-center font-bold'
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Safaris Accommodations
                        </motion.h2>
                        <motion.p
                            className="text-gray-500 md:text-[15.7px] text-center md:mx-auto md:w-[90%] mt-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            East Africa is blessed with beauties from water bodies, animal, amazing landscapes, diverse culture and various historical sites. Be part of the amazing journey and explore the best of East Africa with Oweetu Gorilla Holidays
                        </motion.p>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'
                        >
                            {accomodations.map((accomodate, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariants}
                                    whileHover={{ y: -10 }}
                                    className="text-white grid cursor-pointer"
                                >
                                    <motion.div className='overflow-hidden rounded-lg'>
                                        <motion.img
                                            src={accomodate.image}
                                            alt={accomodate.title}
                                            className='h-56 w-full object-cover'
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className='p-3 pb-8 text-center mt-2'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <span className="text-xl font-medium text-[#000000D9]">{accomodate.title}</span>
                                        <p className='text-[16px] font-light leading-7 mb-6 px-1 text-[#494949]'>{accomodate.description}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>
            </section>
            <Footer />
        </div>
    )
}

export default AboutPage