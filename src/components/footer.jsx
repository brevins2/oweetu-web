import React from 'react'
import bgimage from "@/assets//bg.webp";
import logo from "@/assets//logo.webp"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div style={{ backgroundImage: `url(${bgimage})`, backgroundSize: "cover", backgroundPosition: "center" }} className="text-white relative">
            <div className='absolute inset-0 bg-black/50' />
            <div className='h-full pt-20 pb-10'>
                <div className='relative max-w-7xl mx-auto px-6'>
                    <div className="grid grid-cols-1 md:grid-cols-4 justify-between items-start gap-6">
                        <div className="text-left">
                            <Link to="">
                                <img src={logo} alt="Logo" className="h-32 w-32 mb-2 object-contain" />
                            </Link>
                            {/* <h2 className="text-2xl font-bold mb-2">Oweetu Gorilla Holidays</h2> */}
                            <p>
                                Experience uniqueness of East African wildlife, Savannah, climate, landscapes, water bodies & diverse cultures. Mix luxury travel & wild adventure.
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <h3 className='text-2xl text-[#cf7a18] font-bold'>Quick Links</h3>
                            <Link to="/booking" className="hover:text-[#cf7a18] transition">Book</Link>
                            <Link to="/contact" className="hover:text-[#cf7a18] transition">Contact</Link>
                            <Link to="/safaris" className="hover:text-[#cf7a18] transition">Safaris</Link>
                            <Link to="/destinations" className="hover:text-[#cf7a18] transition">Destinations</Link>
                        </div>
                        <div className="grid gap-6">
                            <h3 className='text-2xl text-[#cf7a18] font-bold'>Top Destinations</h3>
                            <a href="https://oweetugorillaholidays.com/murchison-falls-national-park/" target='_blank' className="hover:text-[#cf7a18] transition">Murchison Falls National Park</a>
                            <a href="https://oweetugorillaholidays.com/queen-elizabeth-national-park/" target='_blank' className="hover:text-[#cf7a18] transition">Queen Elizabeth National Park</a>
                            <a href="https://oweetugorillaholidays.com/bwindi-forest-impenetrable-national-park/" target='_blank' className="hover:text-[#cf7a18] transition">Bwindi Forest Impenetrable National Park</a>
                        </div>
                        <div className="grid gap-4">
                            <h3 className='text-2xl text-[#cf7a18] font-bold'>Contact Info</h3>
                            <span>Wakiso, Entebbe</span>
                            <a href="mailto:info@oweetugorillaholidays.com" className="hover:text-[#cf7a18] transition">info@oweetugorillaholidays.com</a>
                            <a href="tel:+256706064400" className="hover:text-[#cf7a18] transition">+256 706 064400</a>
                        </div>
                    </div>
                    <div className='h-0.5 mt-8 mx-auto bg-white' />
                </div>
                <p className="text-lg mt-6 text-gray-100 text-center">© {new Date().getFullYear()} Oweetu Gorilla Holidays. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
