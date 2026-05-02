import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import { GoGlobe } from "react-icons/go";
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging, TbClock } from "react-icons/tb";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

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
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

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
            description: 'Certified local guides with over 10 years of experience in primate trekking and wildlife safaris',
        },
        {
            image: pearl,
            title: 'Authentic Ugandan Experience',
            description: 'Immerse yourself in rich culture, diverse wildlife, and breathtaking landscapes of the Pearl of Africa',
        },
        {
            image: hotel,
            title: 'Luxury & Comfort',
            description: 'Hand-picked eco-lodges and premium accommodations that blend luxury with nature',
        },
    ]

    const locations = [
        {
            icon: <PiMapPinAreaFill size={22} />,
            address: "Entebbe, Uganda",
            link: "",
            details: "Airport Road, Next to Lake Victoria"
        },
        {
            icon: <LuMail size={22} />,
            address: "info@oweetugorillaholidays.com",
            link: "mailto:info@oweetugorillaholidays.com",
            details: "24/7 Response within 2 hours"
        },
        {
            icon: <TbPhoneRinging size={22} />,
            address: "+256 765 390 155",
            link: "tel:+256765390155",
            details: "Emergency & WhatsApp Available"
        },
        {
            icon: <TbClock size={22} />,
            address: "Office Hours",
            link: "",
            details: "Mon-Fri: 8AM - 8PM | Sat: 9AM - 6PM"
        }
    ]

    const quickLinks = [
        { name: 'Popular Safaris', link: '/safaris' },
        { name: 'Booking Process', link: '/how-to-book' },
        { name: 'Travel Guide', link: '/travel-guide' },
        { name: 'FAQs', link: '/faqs' },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                telephone: '',
                subject: '',
                message: ''
            });
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    }

    return (
        <div className="bg-linear-to-b from-white to-gray-50">
            <Header2 />
            <Banner title="Connect With Us" subtitle="Start Your African Adventure Today" />

            <section className='bg-white'>
                {/* Guest Reviews Section - Enhanced */}
                <SectionObserver variants={fadeInUp}>
                    <div className='max-w-7xl text-center mx-auto py-12 md:py-20 px-4 md:px-0'>
                        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <span className="text-[#C57712] text-sm md:text-base font-semibold tracking-wide uppercase">Why Travel With Us</span>
                            <h2 className='text-3xl md:text-4xl text-[#070e06] font-bold mt-2 mb-4'>
                                Unforgettable Safari Experiences
                            </h2>
                            <p className='text-gray-600 max-w-2xl mx-auto'>
                                Join thousands of satisfied travelers who discovered the magic of Uganda with us
                            </p>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-2'>
                            {reasons.map((reason, idx) => (
                                <motion.div key={idx} variants={cardVariants} whileHover={{ y: -10, transition: { duration: 0.3 } }} className='group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer'>
                                    <div className='relative overflow-hidden h-64'>
                                        <motion.img src={reason.image} alt={reason.title} className='w-full h-full object-cover' whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                    </div>
                                    <div className='p-6 text-left'>
                                        <h3 className='text-xl font-bold text-[#070e06] mb-2 group-hover:text-[#C57712] transition-colors'>
                                            {reason.title}
                                        </h3>
                                        <p className='text-gray-600 leading-relaxed'>{reason.description}</p>
                                        <motion.div className="mt-4 inline-flex items-center text-[#C57712] font-semibold text-sm" whileHover={{ x: 5 }}>
                                            Learn More →
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </SectionObserver>

                {/* Contact Information & Form Section - Redesigned */}
                <div className='bg-linear-to-br from-gray-50 to-white w-full md:py-24 py-12'>
                    <div className='max-w-7xl mx-auto px-4 md:px-6'>
                        {/* Floating Contact Cards */}
                        <SectionObserver variants={fadeInUp}>
                            <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16" variants={staggerContainer} initial="hidden" animate="visible">
                                {locations.map((location, idx) => (
                                    <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C57712] transition-colors duration-300">
                                            <div className="text-[#C57712] group-hover:text-white transition-colors duration-300">
                                                {location.icon}
                                            </div>
                                        </div>
                                        {location.link ? (
                                            <a href={location.link} className='block'>
                                                <h3 className='text-[15px] font-semibold text-gray-800 hover:text-[#C57712] transition-colors mb-1'>
                                                    {location.address}
                                                </h3>
                                            </a>
                                        ) : (
                                            <h3 className='text-[15px] font-semibold text-gray-800 mb-1'>{location.address}</h3>
                                        )}
                                        <p className='text-sm text-gray-500'>{location.details}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SectionObserver>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                            {/* Left Column - Contact Info & Social */}
                            <SectionObserver variants={fadeInLeft}>
                                <div className='space-y-8'>
                                    <div>
                                        <motion.h2 className='text-3xl md:text-4xl font-bold text-[#070e06] mb-4' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                            Let's Plan Your <span className="text-[#C57712]">African Safari</span>
                                        </motion.h2>
                                        <motion.p className='text-gray-600 text-lg leading-relaxed' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                                            Whether you have questions about gorilla trekking permits, need a custom itinerary,
                                            or want to check availability - our travel experts are here to help you create
                                            memories that last a lifetime.
                                        </motion.p>
                                    </div>

                                    {/* Emergency Contact Highlight */}
                                    <motion.div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#C57712] rounded-full flex items-center justify-center shrink-0">
                                                <FaWhatsapp className="text-white text-2xl" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Contact(also on WhatsApp)</h4>
                                                <p className="text-2xl font-bold text-[#C57712] mb-2">+256 765 390 155</p>
                                                <p className="text-sm text-gray-600">Available 24/7 for urgent inquiries and last-minute bookings</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Quick Links */}
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                        <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {quickLinks.map((link, idx) => (
                                                <motion.a key={idx} href={link.link} whileHover={{ x: 3 }} className="text-gray-600 hover:text-[#C57712] transition-colors text-sm">
                                                    {link.name}
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Social Media Section */}
                                    <motion.div className='pt-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                                        <h3 className='font-semibold text-gray-800 mb-4'>Follow Our Adventures</h3>
                                        <div className='flex gap-4'>
                                            {[
                                                { icon: FaInstagram, link: "https://instagram.com/oweetugorillaholidays", color: "hover:text-pink-600" },
                                                { icon: FaTiktok, link: "https://tiktok.com/@oweetu.gorilla.hol", color: "hover:text-black" },
                                                { icon: FaFacebookF, link: "#", color: "hover:text-blue-600" },
                                                { icon: FaTwitter, link: "#", color: "hover:text-blue-400" },
                                            ].map((social, idx) => (
                                                <motion.a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300`} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                                                    <social.icon size={22} />
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Trust Badge */}
                                    <motion.div className="flex items-center gap-2 pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                                        <MdVerified className="text-green-600 text-xl" />
                                        <span className="text-sm text-gray-600">Licensed Tour Operator | Uganda Tourism Board</span>
                                    </motion.div>
                                </div>
                            </SectionObserver>

                            {/* Right Column - Enhanced Contact Form */}
                            <SectionObserver variants={fadeInRight}>
                                <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
                                    <div className="bg-linear-to-r from-[#2b7917] to-[#1a2a14] px-6 py-8 md:px-8">
                                        <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                                            Send a Message
                                        </h2>
                                        {/* <p className='text-gray-300'>
                                            Fill out the form below and our safari expert will get back to you within 2 hours
                                        </p> */}
                                    </div>

                                    <motion.form
                                        variants={formVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onSubmit={handleSubmit}
                                        className='p-6 md:p-8 space-y-3'
                                    >
                                        <motion.div
                                            className="flex flex-col gap-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <label className="text-gray-700 font-semibold text-sm">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`border-2 rounded-xl h-12 w-full px-4 outline-none transition-all duration-300 ${focusedField === 'name' ? 'border-[#C57712] ring-2 ring-amber-100' : 'border-gray-200'
                                                    } bg-gray-50 hover:bg-white focus:bg-white`}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </motion.div>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <motion.div
                                                className="flex flex-col gap-2"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="text-gray-700 font-semibold text-sm">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('email')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`border-2 rounded-xl h-12 w-full px-4 outline-none transition-all duration-300 ${focusedField === 'email' ? 'border-[#C57712] ring-2 ring-amber-100' : 'border-gray-200'
                                                        } bg-gray-50 hover:bg-white focus:bg-white`}
                                                    placeholder="john@example.com"
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="flex flex-col gap-2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="text-gray-700 font-semibold text-sm">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    value={formData.telephone}
                                                    onChange={handleInputChange}
                                                    onFocus={() => setFocusedField('telephone')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`border-2 rounded-xl h-12 w-full px-4 outline-none transition-all duration-300 ${focusedField === 'telephone' ? 'border-[#C57712] ring-2 ring-amber-100' : 'border-gray-200'
                                                        } bg-gray-50 hover:bg-white focus:bg-white`}
                                                    placeholder="+256 XXX XXX XXX"
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="flex flex-col gap-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label className="text-gray-700 font-semibold text-sm">
                                                Subject
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="border-2 rounded-xl h-12 w-full px-4 outline-none border-gray-200 bg-gray-50 hover:bg-white focus:bg-white focus:border-[#C57712] transition-all duration-300"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="booking">Booking Inquiry</option>
                                                <option value="custom-tour">Custom Tour Request</option>
                                                <option value="group-booking">Group Booking</option>
                                                <option value="support">Customer Support</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                        </motion.div>

                                        <motion.div
                                            className="flex flex-col gap-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="text-gray-700 font-semibold text-sm">
                                                Your Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`border-2 rounded-xl w-full p-4 outline-none transition-all duration-300 ${focusedField === 'message' ? 'border-[#C57712] ring-2 ring-amber-100' : 'border-gray-200'
                                                    } bg-gray-50 hover:bg-white focus:bg-white resize-none`}
                                                placeholder="Tell us about your dream safari..."
                                                required
                                            />
                                        </motion.div>

                                        <motion.button
                                            type="submit"
                                            className='bg-linear-to-r from-[#C57712] to-[#e0962c] text-white py-3.5 px-8 rounded-xl font-semibold relative overflow-hidden w-full shadow-lg hover:shadow-xl transition-all duration-300'
                                            whileHover={{ scale: 1.02 }}
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
                                                        className="flex items-center justify-center gap-3"
                                                    >
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Sending Your Message...
                                                    </motion.div>
                                                ) : submitSuccess ? (
                                                    <motion.div
                                                        key="success"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center gap-2"
                                                    >
                                                        <span>✓</span>
                                                        Message Sent Successfully!
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="default"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center gap-2"
                                                    >
                                                        <HiOutlineChatBubbleLeftRight size={20} />
                                                        Send Message
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>

                                        {/* <p className="text-xs text-gray-500 text-center mt-4">
                                            By submitting this form, you agree to our privacy policy. We respect your inbox and will never spam you.
                                        </p> */}
                                    </motion.form>
                                </div>
                            </SectionObserver>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactPage