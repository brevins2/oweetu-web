import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CiSearch } from "react-icons/ci";
import HTMLRenderer from '@/components/HTMLRenderer'
import axiosInstance from '@/utils/axiosInstance'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const base_url = import.meta.env.VITE_API_URL
const SafarisPage = () => {
    const [selectedCountry, setSelectedCountry] = useState("all")
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [safaris, setSafaris] = useState([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        getSafaris();
    }, [])

    const itemsPerPage = 10

    const filteredSafaris = safaris.filter((item) => {
        const matchesCountry = selectedCountry === "all" || item.country === selectedCountry
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
        return matchesCountry && matchesSearch
    })

    const totalPages = Math.ceil(filteredSafaris.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSafaris = filteredSafaris.slice(startIndex, startIndex + itemsPerPage)

    const handleCountryChange = (country) => {
        setSelectedCountry(country)
        setCurrentPage(1)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
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

    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    }

    const pageButtonVariants = {
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    }

    if (loading) {
        return (
            <div>
                <Header2 />
                <motion.div className="py-20 h-81 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-2xl font-bold">Loading safari</h1>
                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                        <AiOutlineLoading3Quarters className="animate-spin" size={30} />
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header2 />
            <Banner title="Safaris" />

            <section className="bg-[#f7f7f7] py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                    <motion.div variants={sidebarVariants} initial="hidden" animate="visible" className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Filter Safaris</h3>

                        <motion.div className="flex items-center border rounded-lg px-3 py-2 mb-6" whileHover={{ boxShadow: "0 0 0 2px #374b28" }} transition={{ duration: 0.2 }}>
                            <CiSearch size={18} className='font-extrabold' />
                            <input type="text" placeholder="Search safari..." className="outline-none ml-2 w-full" value={search} onChange={handleSearchChange} />
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                            {["all", "Uganda", "Kenya", "Tanzania", "Rwanda"].map((country) => (
                                <motion.button key={country} variants={cardVariants} whileHover="hover" whileTap="tap" onClick={() => handleCountryChange(country)} className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-all duration-300 ${selectedCountry === country ? "bg-[#374b28] text-white shadow-md" : "bg-[#f3f3f3] hover:bg-[#e7e7e7]"}`}>
                                    {country === "all" ? "All Safaris" : country}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>

                    <div className="md:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div key={selectedCountry + search + currentPage} variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedSafaris.length > 0 ? (
                                    paginatedSafaris.map((safari) => (
                                        <motion.div key={safari.id} variants={cardVariants} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                                            <Link to={`/safaris/${safari.id}`}>
                                                <motion.div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer" whileHover={{ scale: 1.02 }}>
                                                    <motion.div className="overflow-hidden">
                                                        <motion.img src={`${base_url + safari.image}`} alt={safari.title} className="w-full h-56 object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                                                    </motion.div>
                                                    <div className="p-6">
                                                        <motion.h4 className="font-semibold text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                                            {safari.title}
                                                        </motion.h4>

                                                        <motion.div className="text-sm text-gray-500 mt-2 line-clamp-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                                            <HTMLRenderer htmlContent={safari.description} />
                                                        </motion.div>

                                                        <motion.span className="inline-block mt-4 text-sm text-[#cf7a18] font-semibold" whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                                                            View Details →
                                                        </motion.span>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div className="col-span-full text-center py-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <p className="text-gray-500 text-lg">No safaris found matching your criteria.</p>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                                            setSelectedCountry("all")
                                            setSearch("")
                                        }} className="mt-4 px-6 py-2 bg-[#cf7a18] text-white rounded-lg">
                                            Clear Filters
                                        </motion.button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-center mt-12 gap-3 flex-wrap">
                                <motion.button variants={pageButtonVariants} whileHover="hover" whileTap="tap" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-all duration-300" disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>
                                    Prev
                                </motion.button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <motion.button key={page} variants={pageButtonVariants} whileHover="hover" whileTap="tap" onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg shadow transition-all duration-300 ${currentPage === page ? "bg-[#374b28] text-white" : "bg-white hover:bg-gray-100"}`}>
                                                {page}
                                            </motion.button>
                                        )
                                    } else if (
                                        (page === currentPage - 2 && currentPage > 3) ||
                                        (page === currentPage + 2 && currentPage < totalPages - 2)
                                    ) {
                                        return <span key={page} className="px-2">...</span>
                                    }
                                    return null
                                })}

                                <motion.button variants={pageButtonVariants} whileHover="hover" whileTap="tap" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-all duration-300" disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
                                    Next
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Results Count */}
                        {filteredSafaris.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center mt-6 text-gray-500 text-sm">
                                Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredSafaris.length)} of {filteredSafaris.length} safaris
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SafarisPage