import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useState } from 'react'
import { LuMail } from "react-icons/lu";
import { TbPhoneRinging } from "react-icons/tb";
import { FaMaximize } from 'react-icons/fa6'

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

    const locations = [
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 max-w-7xl mx-auto items-center'>
                    <div className='text-left space-y-2 px-4 md:px-0'>
                        <h2 className='text-xl md:text-2xl text-[#070e06] font-bold'>Find your trip!</h2>
                        <p className='leading-7 text-lg text-gray-500'>
                            You will get response in an 30 minutes, please feel free to use our email and phone number(on WhatsApp) for more inquiries
                        </p>

                        <div className='mt-2 grid grid-cols-1 gap-2 py-2'>
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

                        <div>
                            <h2 className='text-xl text-[#444644] font-semibold'>Countries and places</h2>

                            <div className='flex gap-2 my-2'>
                                {['Uganda', 'Kenya', 'Tanzania', 'Rwanda'].map((tab, idx) => <span key={idx} className={`cursor-pointer py-1 px-2 md:px-4 font-bold ${newTab === tab && 'text-white bg-green-400 border-b-2 border-green-600'}`} onClick={() => handleTabChange(tab)}>{tab}</span>)}
                            </div>

                            <div className='relative'>
                                <img src={newUrl} alt="country-tours" className='h-80 w-full rounded object-cover' />
                                <FaMaximize className='relative bottom-2 left-[95%] z-20 text-white bg-green-500 p-0.5 font-bold cursor-pointer' onClick={maximizeImage} />
                            </div>
                        </div>
                    </div>
                    <div className='text-left space-y-2 px-4 md:px-0'>
                        <h2 className='text-xl md:text-2xl text-[#070e06] font-semibold'>Book you trip</h2>

                        <form className='border-2 border-gray-400 rounded-lg p-6 bg-[#f7f4ed] space-y-3'>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                                <input type="text" name="name" id="name" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Name' required />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Email' />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="telephone">Telephone</label>
                                    <input type="tel" name="telephone" id="telephone" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Telephone' />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="destination">Destination <span className="text-red-500">*</span></label>
                                <input type="text" name="destination" id="destination" className='border-2 rounded h-10 w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Where you want to go' required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message">Message</label>
                                <textarea rows={4} name="message" id="message" className='border-2 rounded w-full border-gray-300 p-2 px-4 ring-0 focus:right-0 focus:border-gray-300 bg-white' placeholder='Your Message' />
                            </div>

                            <button className='bg-[#dd8819] text-white py-3 px-10 rounded-full mt-2'>Send Message</button>
                        </form>
                    </div>
                </div>

                <Dialog open={showMap} onOpenChange={setShowMap}>
                    <DialogContent className="w-full max-w-none p-2 bg-white">
                        <DialogHeader>
                            <DialogTitle>Destinations in {newTab}</DialogTitle>
                            <DialogDescription>All top destinations</DialogDescription>
                        </DialogHeader>

                        <div className="w-full h-full overflow-hidden rounded-lg relative">
                            <img src={newUrl} alt="map" className="object-contain transition-transform duration-200" style={zoomStyle} onMouseMove={handleMouseMove} onMouseLeave={resetZoom} />
                        </div>
                    </DialogContent>
                </Dialog>
            </section>
            <Footer />
        </div>
    )
}

export default BookPage
