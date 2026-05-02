import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaPlay, FaInfoCircle, FaStar, FaArrowRight } from "react-icons/fa"

import guides from '@/assets/guides.jpg'
import car_inside from '@/assets/car-inside.jpeg'
import tourists from '@/assets/tourists.jpeg'
import ken from '@/assets/ken.jpg'
import car1 from '@/assets/car1.jpeg'
import hotel1 from '@/assets/hotel-1.jpeg'

const slides = [
    {
        image: car1,
        title: "Experience the Magic of Uganda's Gorilla Holidays",
        subtitle: "Encounter majestic mountain gorillas in their natural habitat",
        cta: "Explore Safaris",
        ctaLink: "/safaris"
    },
    {
        image: guides,
        title: "Expert Local Guides",
        subtitle: "Travel with certified guides who know every trail and secret spot",
        cta: "Meet Our Guides",
        ctaLink: "/about"
    },
    {
        image: car_inside,
        title: "Luxury Safari Vehicles",
        subtitle: "Travel in comfort with our premium 4x4 safari vehicles",
        cta: "View Vehicles",
        ctaLink: "/gallery"
    },
    {
        image: tourists,
        title: "Unforgettable Group Experiences",
        subtitle: "Join like-minded adventurers on life-changing safaris",
        cta: "Group Safaris",
        ctaLink: "/safaris"
    },
    {
        image: ken,
        title: "East Africa's Finest Destinations",
        subtitle: "From Uganda to Kenya, Tanzania to Rwanda - explore them all",
        cta: "Destinations",
        ctaLink: "/destinations"
    },
    {
        image: hotel1,
        title: "Premium Eco-Lodges",
        subtitle: "Stay in hand-picked accommodations that blend luxury with nature",
        cta: "View Accommodations",
        ctaLink: "/gallery"
    }
]

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [isPlaying])

    const goToSlide = (index) => {
        setCurrentIndex(index)
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 8000)
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 8000)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 8000)
    }

    return (
        <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div key={currentIndex} className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
                    <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/50 to-black/30" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                <motion.div key={currentIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-4xl">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
                        <span>Satified Safari Operators</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        {slides[currentIndex].title}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        {slides[currentIndex].subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={slides[currentIndex].ctaLink} className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#C57712] to-[#e0962c] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                            {slides[currentIndex].cta}
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-[#070e06] transition-all duration-300">
                            <FaInfoCircle />
                            Contact Expert
                        </Link>
                    </motion.div>

                    {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20">
                        {[
                            { label: "Happy Travelers", value: "5,000+" },
                            { label: "Safari Packages", value: "50+" },
                            { label: "Years Experience", value: "10+" }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-xl md:text-2xl font-bold text-[#C57712]">{stat.value}</div>
                                <div className="text-xs text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div> */}
                </motion.div>
            </div>

            <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)} className={`transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-8 md:w-10 h-2 bg-[#C57712]' : 'w-2 h-2 bg-white/50 hover:bg-white/80' }`} />
                ))}
            </div>
            
            <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block z-20" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce" />
                </div>
            </motion.div>
        </div>
    )
}

export default HeroSlider