import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import { GoGlobe } from "react-icons/go";
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging } from "react-icons/tb";
import { PiMapPinAreaFill } from "react-icons/pi";

import React from 'react'

import pearl from '@/assets/pearl.webp'
import hotel from '@/assets/hotel-4.jpg'
import fourbyfour from '@/assets/4X4.jpg'

import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const ContactPage = () => {
    const reasons = [
        {
            image: fourbyfour,
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

    return (
        <div>
            <Header2 />
            <Banner title="Contact us" />
            <section className='pt-8 bg-white'>
                <div className='max-w-7xl text-center mx-auto my-8 px-4 md:px-0'>
                    <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>What our Guests Say</h2>

                    <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 py-2'>
                        {reasons.map((reason, idx) => (
                            <div key={idx} className='shadow-xl rounded-xl space-y-4 bg-[#f3f3f3]'>
                                <img src={reason.image} alt="point" className='w-full h-52 object-cover rounded-t-xl' />
                                <div className='px-3 md:px-7 py-5'>
                                    <span className='text-[#C57712] text-[16px] md:text-lg font-semibold'>{reason.title}</span>
                                    <p className='text-sm md:text-[16px] mt-2 md:leading-7'>{reason.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-[#f1f1f1] w-full py-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto my-10 items-center'>
                        <div className='text-left space-y-2 px-4 md:px-0'>
                            <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>Reach us!</h2>
                            <p className='leading-7 text-lg text-gray-500'>
                                For any inquiries, feedback, reach us by sending a message or using our contact information as provided below
                            </p>

                            <div className='mt-6 grid grid-cols-1 gap-4 py-2'>
                                {locations.map((location, idx) => (
                                    <div key={idx} className='flex gap-4 space-y-2 bg-[#f3f3f3]'>
                                        {location.icon}
                                        {location.link ?
                                            <a href={location.link} className='text-[#C57712] hover:text-[#279c09] text-[16px] md:text-lg font-semibold'>{location.address}</a>
                                            :
                                            <span className='text-[#C57712] text-[16px] md:text-lg font-semibold'>{location.address}</span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-2 text-xl'>
                                <a href="https://www.instagram.com/oweetugorillaholidays?igsh=MXhnZDk4eXk2NmtoMw==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                <a href="https://tiktok.com/@oweetu.gorilla.hol" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                                {/* <a href="https://www.facebook.com/oweetugorillaholidays" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                                <a href="https://x.com/oweetugorillahol" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a> */}
                            </div>
                        </div>
                        <div className='text-left space-y-2 px-4 md:px-0'>
                            <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>Send a message</h2>

                            <form className='border-2 border-gray-400 rounded-lg p-6 bg-[#f7f4ed] space-y-3'>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="name" id="name" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Name' required />
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Email' />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="telephone">Telephone</label>
                                        <input type="text" name="telephone" id="telephone" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Telephone' />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message">Message</label>
                                    <textarea rows={4} name="message" id="message" className='border-2 rounded w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Your Message' />
                                </div>

                                <button className='bg-[#dd8819] text-white py-3 px-10 rounded-full mt-2'>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactPage
