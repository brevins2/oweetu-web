import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import { GoGlobe } from "react-icons/go";
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging } from "react-icons/tb";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import pearl from '@/assets/pearl.webp'
import hotel from '@/assets/hotel-1.jpeg'
import car12 from '@/assets/car12.jpeg'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
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

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    const formVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    const socialVariants = {
        hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
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

    const reasons = [
        {
            image: car12,
            title: 'Expert Gorilla Trekking Guides',
            description: 'Travel with best, guides that will make your trip very enjoyable'
        },
        {
            image: pearl,
            title: 'Authentic Ugandan Experience',
            description: 'An amazing experience, animals, culture & wildlife in Africa'
        },
        {
            image: hotel,
            title: 'Luxury & Comfort',
            description: 'Luxury, comfortable & affordable lodges & hotels for your stay'
        },
    ]

    const locations = [
        {
            icon: <PiMapPinAreaFill color='#C57712' size={20} />,
            address: "Entebbe, Uganda",
            link: ""
        },
        {
            icon: <LuMail color='#C57712' size={20} />,
            address: "info@oweetugorillaholidays.com",
            link: "mailto:info@oweetugorillaholidays.com"
        },
        {
            icon: <TbPhoneRinging color='#C57712' size={20} />,
            address: "+256765390155",
            link: "tel:+256765390155"
        },
        {
            icon: <GoGlobe color='#C57712' size={20} />,
            address: "Booking page",
            link: "https://oweetugorillaholidays.com/book/"
        }
    ]

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
                message: ''
            });
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    }

    return (
        <div>
            <Header2 />
            <Banner title="Contact us" />
            
            <section className='bg-white'>
                {/* Guest Reviews Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl text-center mx-auto py-8 md:py-16 px-4 md:px-0'>
                        <motion.h2 
                            className='text-xl md:text-2xl text-[#070e06] font-bold'
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            What our Guests Say
                        </motion.h2>

                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 py-2'
                        >
                            {reasons.map((reason, idx) => (
                                <motion.div 
                                    key={idx} 
                                    variants={cardVariants}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className='shadow-xl rounded-xl space-y-4 bg-[#f3f3f3] overflow-hidden cursor-pointer'
                                >
                                    <motion.div className='overflow-hidden'>
                                        <motion.img 
                                            src={reason.image} 
                                            alt="point" 
                                            className='w-full h-64 object-cover rounded-t-xl'
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.div>
                                    <div className='px-3 md:px-10 py-8'>
                                        <motion.span 
                                            className='text-[#C57712] text-[16px] md:text-lg font-semibold'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            {reason.title}
                                        </motion.span>
                                        <p className='text-sm md:text-[16px] mt-2 md:leading-7'>{reason.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                {/* Contact Information & Form Section */}
                <motion.div className='bg-[#f1f1f1] w-full md:py-20 py-8' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto items-start'>
                        <SectionObserver variants={fadeInLeft}>
                            <div className='text-left space-y-2 px-4 md:px-0'>
                                <motion.h2 className='text-xl md:text-2xl text-[#070e06] font-bold' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                    Reach us!
                                </motion.h2>
                                <motion.p className='leading-7 text-lg text-gray-500' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                                    For any inquiries, feedback, reach us by sending a message or using our contact information as provided below
                                </motion.p>

                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='mt-6 grid grid-cols-1 gap-0 py-2'>
                                    {locations.map((location, idx) => (
                                        <motion.div key={idx} variants={itemVariants} whileHover={{ x: 10 }} className='flex gap-4 bg-[#f3f3f3] p-1.5 rounded-lg'>
                                            <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                                                {location.icon}
                                            </motion.div>
                                            {location.link ?
                                                <a href={location.link} className='text-[#C57712] hover:text-[#279c09] text-[16px] md:text-lg font-semibold transition-colors duration-300'>
                                                    {location.address}
                                                </a>
                                                :
                                                <span className='text-[#C57712] text-[16px] md:text-lg font-semibold'>{location.address}</span>
                                            }
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div className='flex gap-2 text-2xl mt-1 ml-3' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                                    <motion.a href="https://www.instagram.com/oweetugorillaholidays?igsh=MXhnZDk4eXk2NmtoMw==" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors" variants={socialVariants} whileHover="hover" whileTap="tap">
                                        <FaInstagram size={20} />
                                    </motion.a>
                                    <motion.a  href="https://tiktok.com/@oweetu.gorilla.hol" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors" variants={socialVariants} whileHover="hover" whileTap="tap">
                                        <FaTiktok size={20} />
                                    </motion.a>
                                </motion.div>
                            </div>
                        </SectionObserver>

                        {/* Right Column - Contact Form */}
                        <SectionObserver variants={fadeInRight}>
                            <div className='text-left space-y-4 px-4 md:px-0'>
                                <motion.h2 
                                    className='text-xl md:text-2xl text-[#070e06] font-bold'
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Send a message
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
                                        className='bg-[#dd8819] text-white py-3 px-10 rounded-full mt-2 relative overflow-hidden w-full md:w-auto'
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
                                                    className="flex items-center justify-center gap-2"
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
                </motion.div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactPage