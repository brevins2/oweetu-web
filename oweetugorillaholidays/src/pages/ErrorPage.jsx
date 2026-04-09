import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaSearch, FaSadTear, FaArrowLeft } from 'react-icons/fa'
import { GiBrokenBottle, GiCompass } from 'react-icons/gi'

const ErrorPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
        initial: { opacity: 0, y: 20 }
    }

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }

    const rotateAnimation = {
        rotate: [0, 360],
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }

    const suggestions = [
        { text: "Use the navigation menu to find what you're looking for", icon: <GiCompass />, link: "/" },
        { text: "Contact us if you need assistance", icon: <FaSadTear />, link: "/contact" },
        { text: "Explore our amazing safaris", icon: <FaSearch />, link: "/safaris" },
    ]

    return (
        <div className="max-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="relative mb-2">
                    <motion.div animate={rotateAnimation} className="absolute inset-0 flex items-center justify-center opacity-10">
                        <GiBrokenBottle size={300} className="text-gray-400" />
                    </motion.div>

                    <div className="relative z-10">
                        <motion.h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#cf7a18] to-[#374b28]" animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            404
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Error Message */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={fadeInUp}>
                        <motion.div animate={floatAnimation} className="inline-block mb-2">
                            <FaSadTear size={60} className="text-[#cf7a18]" />
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Oops! Page Not Found
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            The page you're looking for doesn't exist or has been moved.
                            But don't worry, we've got plenty of amazing safaris waiting for you!
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <motion.div variants={buttonVariants} initial="initial" animate="visible" whileHover="hover" whileTap="tap">
                            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#cf7a18] text-white rounded-full font-semibold hover:bg-[#b96b11] transition-colors duration-300 shadow-lg hover:shadow-xl">
                                <FaHome />
                                Back to Home
                            </Link>
                        </motion.div>

                        <motion.div variants={buttonVariants} initial="initial" animate="visible" whileHover="hover" whileTap="tap" transition={{ delay: 0.1 }}>
                            <Link to="/safaris" className="inline-flex items-center gap-2 px-6 py-3 bg-[#374b28] text-white rounded-full font-semibold hover:bg-[#2a3a1e] transition-colors duration-300 shadow-lg hover:shadow-xl">
                                <GiCompass />
                                Explore Safaris
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Suggestions Section */}
                    <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Here are some helpful suggestions:
                        </h3>

                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3 text-left">
                            {suggestions.map((suggestion, idx) => (
                                <Link to={suggestion.link} key={idx}>
                                    <motion.div key={idx} variants={fadeInUp} whileHover={{ x: 10, color: "#cf7a18" }} className="flex items-center gap-3 text-gray-600 transition-all duration-300">
                                        <span className="text-[#cf7a18]">{suggestion.icon}</span>
                                        <span>{suggestion.text}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Fun Fact / Quote */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-6 text-sm text-gray-400">
                        <p>"Every great adventure begins with a single step — or a wrong turn that leads to something amazing!"</p>
                        <p className="mt-2">— Oweetu Gorilla Holidays</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default ErrorPage