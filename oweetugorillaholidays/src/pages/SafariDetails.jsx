import Banner from '@/components/banner';
import Footer from '@/components/footer';
import Header2 from '@/components/header2';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInView } from 'react-intersection-observer';
import HTMLRenderer from '@/components/HTMLRenderer';
import axiosInstance from '@/utils/axiosInstance';

const base_url = import.meta.env.VITE_API_URL
const SafariDetails = () => {
    const { id } = useParams();
    const [relatedSafaris, setRelatedSafaris] = useState([])
    const [safari, setSafari] = useState({});
    const [loading, setLoading] = useState(true)

    const getSafari = async () => {
        try {
            const respo = await axiosInstance.get(`safaris/${id}`)
            setSafari(respo.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const getSafaris = async () => {
        try {
            const respo = await axiosInstance.get('safaris');
            setRelatedSafaris(respo.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSafari();
    }, [])

    useEffect(() => {
        getSafaris();
    }, [safari])

    const related = relatedSafaris.filter((item) => item.country === safari?.country && item.id !== safari?.id).slice(0, 5);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const sidebarVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } }
    }

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

    if (!safari) {
        return (
            <div>
                <Header2 />
                <motion.div className="py-20 h-81 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-2xl font-bold">Safari not found</h1>
                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/" className="text-[#cf7a18] mt-4 inline-block italic">
                            Return Home
                        </Link>
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
        );
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
            <Banner title={safari.title} url={base_url + safari.image} />

            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                    <div className="md:col-span-2">
                        <motion.div className="overflow-hidden rounded-2xl shadow-lg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.img src={base_url + safari.image} alt={safari.title} className="rounded-2xl shadow-lg w-full h-96 object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <h2 className="text-3xl font-bold mt-8">{safari.title}</h2>
                            <div className='mt-4 space-y-2'>
                                <div>
                                    Price: <span className='text-green-500 font-bold'>${safari.price}</span>
                                </div>
                                <div>
                                    Duration: <span className='text-purple-500 font-bold'>{safari.duration}</span>
                                </div>
                            </div>
                            <div className="text-gray-600 mt-4 leading-8">
                                <h4 className='text-lg font-bold text-black'>Description</h4>
                                <HTMLRenderer htmlContent={safari.description} />
                            </div>
                        </motion.div>

                        <SectionObserver variants={fadeInUp}>
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                                    <HTMLRenderer htmlContent={safari.itinerary} />
                                </motion.div>
                            </div>
                        </SectionObserver>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div className="bg-blue-50 p-5 rounded-2xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">Accommodation</h3>
                                <p className="text-gray-700">{safari.accommodation}</p>
                            </motion.div>

                            <motion.div className="bg-yellow-50 p-5 rounded-2xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Best Time to Visit</h3>
                                <p className="text-gray-700">{safari.best_time}</p>
                            </motion.div>
                        </div>

                        {safari.activities && (
                            <SectionObserver variants={fadeInUp}>
                                <div className="mt-8">
                                    <h3 className="text-2xl font-semibold mb-4">Activities/Safari Highlights</h3>
                                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
                                        {safari.activities.split(",").map((activity, idx) => (
                                            <motion.span key={idx} variants={cardVariants} whileHover={{ scale: 1.05, backgroundColor: "#cf7a18", color: "white" }} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300">
                                                {activity}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </SectionObserver>
                        )}
                    </div>

                    <motion.div variants={sidebarVariants} initial="hidden" animate="visible" className="bg-[#f7f7f7] p-6 rounded-2xl shadow-md h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Other Safaris in {safari.country}</h3>
                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-4">
                            {related.length > 0 ? related.map((item) => (
                                <motion.div key={item.id} variants={cardVariants} whileHover={{ scale: 1.02, x: 5 }} transition={{ duration: 0.2 }}>
                                    <Link to={`/safaris/${item.id}`}>
                                        <div className="flex gap-4 bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
                                            <motion.img src={base_url + item.image} alt={item.title} className="w-24 h-24 object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
                                            <div className="p-3">
                                                <h4 className="text-sm font-semibold group-hover:text-[#cf7a18] transition-colors">
                                                    {item.title}
                                                </h4>
                                                <motion.span className="text-xs text-[#cf7a18] inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                                    View →
                                                </motion.span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )) : <h4 className='italic text-gray-500'>No related safari packages for {safari.country}</h4>}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SafariDetails;