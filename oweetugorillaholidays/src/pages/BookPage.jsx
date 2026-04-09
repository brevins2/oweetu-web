import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useState } from 'react'
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging } from "react-icons/tb";
import { FaMaximize } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import uganda from '@/assets/Uganda-map.jpg'
import kenya from '@/assets/kenya-map.jpg'
import tanzania from '@/assets/tanzania-map.jpg'
import rwanda from '@/assets/rwanda-map.png'

const BookPage = () => {
    const [newTab, setNewTab] = useState('Uganda');
    const [newUrl, setNewUrl] = useState(uganda)
    const [showMap, setShowMap] = useState(false)
    const [zoomStyle, setZoomStyle] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        destination: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

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

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    const formVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const tabVariants = {
        inactive: { scale: 1, backgroundColor: "transparent" },
        active: { scale: 1.05, backgroundColor: "#4ade80", color: "white" },
        hover: { scale: 1.02, transition: { duration: 0.2 } }
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

    const locations = [
        {
            icon: <LuMail color='#C57712' size={18} />,
            address: "info@oweetugorillaholidays.com",
            link: "mailto:info@oweetugorillaholidays.com"
        },
        {
            icon: <TbPhoneRinging color='#C57712' size={20} />,
            address: "+256765390155",
            link: "tel:+256765390155"
        },
    ]

    const handleTabChange = (tab) => {
        setNewTab(tab)
        countryUrl(tab)
    }

    const maximizeImage = () => {
        setShowMap(true)
    }

    const countryUrl = (ctry) => {
        let url = '';

        switch (ctry) {
            case 'Uganda':
                url = uganda
                break;
            case 'Kenya':
                url = kenya
                break;
            case 'Tanzania':
                url = tanzania
                break;
            case 'Rwanda':
                url = rwanda
                break;
            default:
                url = uganda
                break;
        }

        setNewUrl(url)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                telephone: '',
                destination: '',
                message: ''
            });
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(2)"
        });
    };

    const resetZoom = () => {
        setZoomStyle({
            transform: "scale(1)"
        });
    };

    return (
        <div>
            <Header2 />
            <Banner title="Book your Safaris" />

            <section className='bg-[#f3f3f3] py-4 md:py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 max-w-7xl mx-auto items-start'>

                    {/* Left Column - Info & Map */}
                    <SectionObserver variants={fadeInLeft}>
                        <div className='text-left space-y-0 px-4 md:px-0'>
                            <motion.h2
                                className='text-lg md:text-xl text-[#070e06] font-bold'
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Find your trip!
                            </motion.h2>
                            <motion.p
                                className='leading-7 text-[15.7px] text-gray-500'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                You will get response in an 30 minutes, please feel free to use our email and phone number(on WhatsApp) for more inquiries
                            </motion.p>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className='mt-2 grid grid-cols-1 gap-2 py-2'
                            >
                                {locations.map((location, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                        className='flex items-center gap-2 space-y-2 bg-[#f3f3f3]'
                                    >
                                        {location.icon}
                                        {location.link ?
                                            <a href={location.link} className='text-[#C57712] hover:text-[#279c09] text-[16px] md:text-[15.7px] font-medium transition-colors duration-300'>
                                                {location.address}
                                            </a>
                                            :
                                            <span className='text-[#C57712] text-[16px] md:text-[15.7px] font-medium'>{location.address}</span>
                                        }
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                className='mt-2'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <h2 className='text-[16px] text-[#444644] font-semibold'>Countries and places</h2>

                                <div className='flex gap-2 my-2'>
                                    {['Uganda', 'Kenya', 'Tanzania', 'Rwanda'].map((tab, idx) => (
                                        <motion.span
                                            key={idx}
                                            className={`cursor-pointer py-1 px-2 md:px-4 font-bold rounded transition-all duration-300 ${newTab === tab ? 'text-white bg-green-400 border-b-2 border-green-600' : 'text-gray-600 hover:bg-green-100'
                                                }`}
                                            variants={tabVariants}
                                            initial="inactive"
                                            animate={newTab === tab ? "active" : "inactive"}
                                            whileHover="hover"
                                            onClick={() => handleTabChange(tab)}
                                        >
                                            {tab}
                                        </motion.span>
                                    ))}
                                </div>

                                <motion.div
                                    className='relative overflow-hidden rounded-lg'
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={newUrl}
                                            src={newUrl}
                                            alt="country-tours"
                                            className='h-80 w-full rounded object-cover'
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </AnimatePresence>
                                    <motion.div
                                        className='absolute bottom-2 right-2 z-20'
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaMaximize className='text-white bg-green-500 p-1.5 rounded-full cursor-pointer text-2xl hover:bg-green-600 transition-colors' onClick={maximizeImage} />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </SectionObserver>

                    {/* Right Column - Booking Form */}
                    <SectionObserver variants={fadeInRight}>
                        <div className='text-left space-y-6 px-4 md:px-0'>
                            <motion.h2
                                className='text-xl md:text-2xl text-[#070e06] font-medium'
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Book your trip
                            </motion.h2>

                            <motion.form
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                onSubmit={handleSubmit}
                                className='border-2 border-gray-400 rounded-lg p-6 bg-[#f7f4ed] space-y-3'
                            >
                                <motion.div
                                    className="flex flex-col gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white transition-all duration-300 focus:ring-2 focus:ring-green-300 outline-none'
                                        placeholder='Name'
                                        required
                                    />
                                </motion.div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    <motion.div
                                        className="flex flex-col gap-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white transition-all duration-300 focus:ring-2 focus:ring-green-300 outline-none'
                                            placeholder='Email'
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="flex flex-col gap-2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label htmlFor="telephone">Telephone</label>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            id="telephone"
                                            value={formData.telephone}
                                            onChange={handleInputChange}
                                            className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white transition-all duration-300 focus:ring-2 focus:ring-green-300 outline-none'
                                            placeholder='Telephone'
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="flex flex-col gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label htmlFor="destination">Destination <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="destination"
                                        id="destination"
                                        value={formData.destination}
                                        onChange={handleInputChange}
                                        className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white transition-all duration-300 focus:ring-2 focus:ring-green-300 outline-none'
                                        placeholder='Where you want to go'
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex flex-col gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className='border-2 rounded w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white transition-all duration-300 focus:ring-2 focus:ring-green-300 outline-none'
                                        placeholder='Your Message'
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className='bg-[#dd8819] text-white py-3 px-10 rounded-full mt-2 relative overflow-hidden'
                                    whileHover={{ scale: 1.02, backgroundColor: "#c97a15" }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSubmitting ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </motion.div>
                                        ) : submitSuccess ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                ✓ Sent Successfully!
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="default"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                Send Message
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </motion.form>
                        </div>
                    </SectionObserver>
                </div>

                {/* Map Dialog with Animation */}
                <Dialog open={showMap} onOpenChange={setShowMap}>
                    <DialogContent className="w-full max-w-4xl p-2 bg-white rounded-xl">
                        <DialogHeader className="h-12">
                            <DialogTitle>Destinations in {newTab}</DialogTitle>
                            <DialogDescription>All top destinations - Hover over the map to zoom in</DialogDescription>
                        </DialogHeader>

                        <motion.div
                            className="w-full h-[70vh] overflow-hidden rounded-lg relative bg-gray-100"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={newUrl}
                                alt="map"
                                className="h-full w-full object-contain transition-transform duration-200 cursor-zoom-in"
                                style={zoomStyle}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={resetZoom}
                            />
                            <motion.div
                                className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white bg-opacity-75 px-2 py-1 rounded"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Hover to zoom • Click to close
                            </motion.div>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            </section>
            <Footer />
        </div>
    )
}

export default BookPage