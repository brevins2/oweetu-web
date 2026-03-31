import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

import guides from '@/assets/guides.jpg'
import lions from '@/assets/tanzania.jpg'
import rw from '@/assets/rw.jpg'
import ken from '@/assets/ken.jpg'
import fourXfour from '@/assets/4X4.jpg'
import sixXfour from '@/assets/6X4.jpg'

const images = [
    guides,
    lions,
    rw,
    ken,
    fourXfour,
    sixXfour
]

const HeroSlider = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-[90vh] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index]}
                    className="absolute w-full h-full object-cover object-bottom"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* hero text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-3xl md:text-6xl font-bold md:mb-4 md:w-[60%] md:leading-16">
                    Experience the Magic of Uganda's Gorilla Holidays
                </h1>
                <p className="max-w-2xl text-2xl text-gray-200">
                    Travel is Therapy
                </p>
                <div className="flex gap-2 mt-8">
                    <Link to="/safaris" className="bg-[#cf7a18] text-white font-bold py-3 px-8 rounded-xl border border-[#cf7a18]">
                        Explore safaris
                    </Link>
                    <Link to="/booking" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl border border-green-500">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSlider