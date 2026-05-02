import React, { useState } from 'react'
import logo from "@/assets/logo.webp"
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaShieldAlt } from "react-icons/fa";
import axiosInstance from '@/utils/axiosInstance';
import { toast, Toaster } from "react-hot-toast";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const res = await axiosInstance.post("/messages/subscribe", { email });
            toast.success(res.data.message || "Subscribed successfully!");
            setEmail("");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Subscription failed");
        } finally {
            setLoading(false);
        }
    };

    const quickLinks = [
        { name: "Safaris", path: "/safaris" },
        { name: "Destinations", path: "/destinations" },
        { name: "Gallery", path: "/gallery" },
        { name: "Book Now", path: "/bookings" },
        { name: "Contact", path: "/contact" },
    ];

    const destinations = [
        { name: "Murchison Falls National Park", url: "https://oweetugorillaholidays.com/murchison-falls-national-park/" },
        { name: "Queen Elizabeth National Park", url: "https://oweetugorillaholidays.com/queen-elizabeth-national-park/" },
        { name: "Bwindi Impenetrable National Park", url: "https://oweetugorillaholidays.com/bwindi-forest-impenetrable-national-park/" },
        { name: "Kibale Forest National Park", url: "https://oweetugorillaholidays.com/kibale-national-park/" },
        { name: "Mgahinga Gorilla National Park", url: "https://oweetugorillaholidays.com/mgahinga-gorilla-national-park/" },
    ];

    const socialLinks = [
        { icon: FaInstagram, url: "https://www.instagram.com/oweetugorillaholidays", label: "Instagram" },
        { icon: FaTiktok, url: "https://tiktok.com/@oweetu.gorilla.hol", label: "TikTok" },
        // { icon: FaFacebookF, url: "https://www.facebook.com/oweetugorillaholidays", label: "Facebook" },
        // { icon: FaTwitter, url: "https://twitter.com/oweetugorillaholidays", label: "Twitter" },
        // { icon: FaYoutube, url: "https://youtube.com/@oweetugorillaholidays", label: "YouTube" },
    ];

    return (
        <footer className="bg-[#0a0f0a] text-gray-300">
            <Toaster position="bottom-right" />
            
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Column 1 - Brand & About */}
                    <div className="space-y-4">
                        <Link to="/" className="block">
                            <img src={logo} alt="Oweetu Gorilla Holidays" className="h-16 md:h-20 object-contain" />
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Experience the uniqueness of East African wildlife, savannahs, landscapes, 
                            water bodies, and diverse cultures. Mix luxury travel with wild adventure.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#C57712]">
                            <FaShieldAlt size={14} />
                            <span>Licensed Tour Operator</span>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#C57712] border-l-3 border-[#C57712] pl-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        to={link.path} 
                                        className="text-sm hover:text-[#C57712] transition-colors duration-200 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Top Destinations */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#C57712] border-l-3 border-[#C57712] pl-3">
                            Top Destinations
                        </h3>
                        <ul className="space-y-2">
                            {destinations.map((destination, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={destination.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm hover:text-[#C57712] transition-colors duration-200 inline-block"
                                    >
                                        {destination.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - Contact & Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#C57712] border-l-3 border-[#C57712] pl-3">
                            Contact Us
                        </h3>
                        
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#C57712] mt-0.5 shrink-0" size={16} />
                                <span className="text-sm">Wakiso, Entebbe, Uganda</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#C57712] shrink-0" size={14} />
                                <a href="mailto:info@oweetugorillaholidays.com" className="text-sm hover:text-[#C57712] transition-colors break-all">
                                    info@oweetugorillaholidays.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#C57712] shrink-0" size={14} />
                                <a href="tel:+256765390155" className="text-sm hover:text-[#C57712] transition-colors">
                                    +256 765 390 155
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="pt-2">
                            <h4 className="font-semibold text-white mb-2 text-sm">Subscribe to our newsletter</h4>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                                    placeholder="Enter your email" 
                                    className="flex-1 px-3 py-2 rounded-lg bg-[#1a1f1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#C57712] transition-colors"
                                />
                                <button 
                                    onClick={handleSubscribe} 
                                    disabled={loading} 
                                    className="bg-[#C57712] px-4 py-2 rounded-lg hover:bg-[#a5630e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    {loading ? (
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <FaPaperPlane size={14} />
                                    )}
                                    <span className="text-sm">Subscribe</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 pt-8 border-t border-gray-800">
                    <div className="flex gap-4">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-[#1a1f1a] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C57712] transition-all duration-200"
                                aria-label={social.label}
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>
                    
                    <div className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Oweetu Gorilla Holidays. All rights reserved.
                    </div>
                    
                    {/* <div className="flex gap-4 text-xs">
                        <Link to="/privacy-policy" className="hover:text-[#C57712] transition-colors">Privacy Policy</Link>
                        <span className="text-gray-700">|</span>
                        <Link to="/terms-conditions" className="hover:text-[#C57712] transition-colors">Terms & Conditions</Link>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer