import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useState } from 'react'
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging } from "react-icons/tb";
import { FaMaximize } from 'react-icons/fa6'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import uganda from '@/assets/Uganda-map.jpg'
import kenya from '@/assets/kenya-map.jpg'
import tanzania from '@/assets/tanzania-map.jpg'
import rwanda from '@/assets/rwanda-map.png'

const BookPage = () => {
    const [activeTab, setActiveTab] = useState('Uganda');
    const [currentMapUrl, setCurrentMapUrl] = useState(uganda)
    const [showMap, setShowMap] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        destination: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const locations = [
        {
            icon: <LuMail color='#C57712' size={18} />,
            address: "info@oweetugorillaholidays.com",
            link: "mailto:info@oweetugorillaholidays.com"
        },
        {
            icon: <TbPhoneRinging color='#C57712' size={20} />,
            address: "+256 765 390 155",
            link: "tel:+256765390155"
        },
    ]

    const countryTabs = [
        { name: 'Uganda', map: uganda },
        { name: 'Kenya', map: kenya },
        { name: 'Tanzania', map: tanzania },
        { name: 'Rwanda', map: rwanda },
    ]

    const handleTabChange = (tab) => {
        setActiveTab(tab.name)
        setCurrentMapUrl(tab.map)
    }

    const maximizeImage = () => {
        setShowMap(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name) {
            alert("Please enter your name");
            return;
        }
        if (!formData.destination) {
            alert("Please enter your destination");
            return;
        }

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

    return (
        <div>
            <Header2 />
            <Banner title="Book Your Safari" />

            <section className='bg-gray-100 py-8 md:py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-6'>
                    
                    {/* Left Column - Info & Map */}
                    <div>
                        <div className='mb-4'>
                            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>
                                Find Your Trip!
                            </h2>
                            <p className='text-gray-600 text-sm leading-relaxed'>
                                You will receive a response within 30 minutes. Feel free to use our email and phone number (on WhatsApp) for more inquiries.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className='space-y-2 mb-6'>
                            {locations.map((location, idx) => (
                                <div key={idx} className='flex items-center gap-3'>
                                    {location.icon}
                                    {location.link ? (
                                        <a href={location.link} className='text-[#C57712] hover:text-[#a5630e] text-sm font-medium'>
                                            {location.address}
                                        </a>
                                    ) : (
                                        <span className='text-[#C57712] text-sm font-medium'>{location.address}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Country Tabs */}
                        <div>
                            <h3 className='text-gray-700 font-semibold text-sm mb-3'>Countries and Places</h3>
                            
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {countryTabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => handleTabChange(tab)}
                                        className={`px-4 py-1.5 rounded font-medium text-sm transition-colors ${
                                            activeTab === tab.name 
                                                ? 'bg-[#C57712] text-white' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Map Image */}
                            <div className='relative rounded-lg overflow-hidden border border-gray-200 bg-white'>
                                <img
                                    src={currentMapUrl}
                                    alt={`Map of ${activeTab}`}
                                    className='w-full h-80 object-contain bg-gray-50'
                                />
                                <button
                                    onClick={maximizeImage}
                                    className='absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 p-1.5 rounded-lg transition-colors'
                                    aria-label="View full screen map"
                                >
                                    <FaMaximize className='text-white text-base' />
                                </button>
                            </div>
                            <p className='text-xs text-gray-500 mt-2 text-center'>
                                Click the expand icon to view the map in full screen
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div>
                        <div className='mb-4'>
                            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>
                                Book Your Trip
                            </h2>
                            <p className='text-gray-600 text-sm'>
                                Fill out the form below and our safari expert will get back to you shortly
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-6 space-y-4'>
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium text-sm mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white'
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Email and Phone - Row */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-medium text-sm mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white'
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telephone" className="block text-gray-700 font-medium text-sm mb-1">
                                        Telephone
                                    </label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        id="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white'
                                        placeholder="+256 XXX XXX XXX"
                                    />
                                </div>
                            </div>

                            {/* Destination Field */}
                            <div>
                                <label htmlFor="destination" className="block text-gray-700 font-medium text-sm mb-1">
                                    Destination <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    id="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white'
                                    placeholder="e.g., Bwindi, Murchison Falls, Queen Elizabeth"
                                    required
                                />
                            </div>

                            {/* Additional Info Dropdown */}
                            <div>
                                <label htmlFor="travelers" className="block text-gray-700 font-medium text-sm mb-1">
                                    Number of Travelers
                                </label>
                                <select
                                    id="travelers"
                                    name="travelers"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white'
                                >
                                    <option value="">Select number of travelers</option>
                                    <option value="1">1 Traveler</option>
                                    <option value="2">2 Travelers</option>
                                    <option value="3">3 Travelers</option>
                                    <option value="4">4 Travelers</option>
                                    <option value="5">5+ Travelers</option>
                                </select>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium text-sm mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C57712] focus:ring-1 focus:ring-[#C57712] bg-white resize-none'
                                    placeholder="Tell us about your dream safari, preferred dates, or any special requests..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className='w-full bg-[#C57712] hover:bg-[#a5630e] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Sending...
                                    </span>
                                ) : submitSuccess ? (
                                    <span>✓ Sent Successfully!</span>
                                ) : (
                                    <span>Send Booking Request</span>
                                )}
                            </button>

                            {/* Trust Badge */}
                            <div className="text-center pt-2">
                                <p className="text-xs text-gray-500">
                                    We respect your privacy. Your information will never be shared.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map Dialog/Modal */}
                <Dialog open={showMap} onOpenChange={setShowMap}>
                    <DialogContent className="max-w-4xl w-[90vw] bg-white rounded-lg p-0 overflow-hidden">
                        <DialogHeader className="p-4 border-b border-gray-200">
                            <DialogTitle className="text-lg font-semibold text-gray-800">
                                Destinations Map - {activeTab}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Click anywhere outside the image to close
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="p-4 bg-gray-100">
                            <div className="bg-white rounded-lg overflow-hidden">
                                <img
                                    src={currentMapUrl}
                                    alt={`Detailed map of ${activeTab}`}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />
                            </div>
                        </div>
                        
                        <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
                            <p className="text-xs text-gray-500">
                                Map of {activeTab} showing major national parks and safari destinations
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </section>
            <Footer />
        </div>
    )
}

export default BookPage