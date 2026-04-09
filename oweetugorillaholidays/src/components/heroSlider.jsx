import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

import guides from '@/assets/guides.jpg'
import car_inside from '@/assets/car-inside.jpeg'
import tourists from '@/assets/tourists.jpeg'
import ken from '@/assets/ken.jpg'
import car1 from '@/assets/car1.jpeg'
import hotel1 from '@/assets/hotel-1.jpeg'

const images = [
    car1,
    guides,
    car_inside,
    tourists,
    ken,
    hotel1
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
        <div className="relative w-full h-[80vh] md:h-[95vh] overflow-hidden">
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

            <div className="absolute inset-0 bg-black/70" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-2xl md:text-5xl font-bold md:mb-4 w-[80%] md:w-[50%] md:leading-16">
                    Experience the Magic of Uganda's Gorilla Holidays
                </h1>
                <p className="max-w-2xl text-lg md:text-2xl text-gray-200 mt-5">
                    Travel is Therapy
                </p>
                <div className="flex gap-2 mt-8">
                    <Link to="/safaris" className="bg-[#cf7a18] text-white font-bold py-3 px-4 md:px-8 rounded-xl border border-[#cf7a18]">
                        Explore safaris
                    </Link>
                    <Link to="/bookings" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 md:px-8 rounded-xl border border-green-500">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSlider