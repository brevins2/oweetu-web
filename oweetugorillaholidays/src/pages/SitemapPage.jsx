import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GoGlobe } from "react-icons/go";
import { FaSafari } from "react-icons/fa";
import { GiTreeBranch } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosInstance from '@/utils/axiosInstance';

const mainPages = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Safaris", path: "/safaris" },
    { name: "Destinations", path: "/destinations" },
    { name: "Gallery", path: "/gallery" },
    { name: "Our Fleet", path: "/fleet" },
    { name: "Bookings", path: "/bookings" },
    { name: "Contact Us", path: "/contact" },
]

const countries = [
    { name: "Uganda", path: "/destinations/uganda", countryPath: "/destinations/country/uganda" },
    { name: "Kenya", path: "/destinations/kenya", countryPath: "/destinations/country/kenya" },
    { name: "Tanzania", path: "/destinations/tanzania", countryPath: "/destinations/country/tanzania" },
    { name: "Rwanda", path: "/destinations/rwanda", countryPath: "/destinations/country/rwanda" },
]

const SitemapPage = () => {
    const [safaris, setSafaris] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSafaris = async () => {
            try {
                const respo = await axiosInstance.get('safaris');
                setSafaris(respo.data.data)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        getSafaris();
    }, [])

    return (
        <div>
            <Header2 />
            <Banner title="Sitemap" />

            <section className="bg-white py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-0">
                    <div className="text-center mb-10">
                        <span className="text-[#C57712] text-sm md:text-base font-semibold tracking-wide uppercase">Site Navigation</span>
                        <h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mt-2 mb-4'>
                            Explore Our Website
                        </h2>
                        <p className='text-gray-600 max-w-2xl mx-auto'>
                            A complete guide to all the pages on Oweetu Gorilla Holidays
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Main Pages */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#C57712]/10 rounded-xl flex items-center justify-center">
                                    <GoGlobe className="text-[#C57712]" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-[#070e06]">Main Pages</h3>
                            </div>
                            <ul className="space-y-3">
                                {mainPages.map((page, idx) => (
                                    <li key={idx}>
                                        <Link to={page.path} className="group flex items-center gap-3 text-gray-600 hover:text-[#C57712] transition-colors duration-200">
                                            <span className="w-2 h-2 bg-[#C57712]/40 rounded-full group-hover:bg-[#C57712] transition-colors duration-200" />
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Destinations */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#C57712]/10 rounded-xl flex items-center justify-center">
                                    <GiTreeBranch className="text-[#C57712]" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-[#070e06]">Destinations</h3>
                            </div>
                            <ul className="space-y-4">
                                {countries.map((country, idx) => (
                                    <li key={idx}>
                                        <span className="font-semibold text-[#070e06] block mb-1">{country.name}</span>
                                        <div className="pl-3 space-y-1">
                                            <Link to={country.path} className="group flex items-center gap-3 text-gray-600 hover:text-[#C57712] transition-colors duration-200">
                                                <span className="w-2 h-2 bg-[#C57712]/40 rounded-full group-hover:bg-[#C57712] transition-colors duration-200" />
                                                Destination Overview
                                            </Link>
                                            <Link to={country.countryPath} className="group flex items-center gap-3 text-gray-600 hover:text-[#C57712] transition-colors duration-200">
                                                <span className="w-2 h-2 bg-[#C57712]/40 rounded-full group-hover:bg-[#C57712] transition-colors duration-200" />
                                                Country Details
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Safari Packages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#C57712]/10 rounded-xl flex items-center justify-center">
                                <FaSafari className="text-[#C57712]" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#070e06]">Safari Packages</h3>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-10 gap-3 text-gray-500">
                                <AiOutlineLoading3Quarters className="animate-spin text-[#C57712]" size={20} />
                                <span>Loading safari packages...</span>
                            </div>
                        ) : safaris.length > 0 ? (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {safaris.map((safari, idx) => (
                                    <li key={safari.id}>
                                        <Link to={`/safaris/${safari.id}`} className="group flex items-center gap-3 text-gray-600 hover:text-[#C57712] transition-colors duration-200">
                                            <span className="w-2 h-2 bg-[#C57712]/40 rounded-full group-hover:bg-[#C57712] transition-colors duration-200 shrink-0" />
                                            <span className="line-clamp-1">{safari.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Link to="/safaris" className="text-[#C57712] font-semibold hover:text-[#e0962c] transition-colors">
                                Browse All Safaris →
                            </Link>
                        )}
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SitemapPage
