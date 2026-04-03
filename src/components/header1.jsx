import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import logo from "@/assets//logo.png"
import { Link, useLocation } from "react-router-dom"

const Header1 = () => {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false);
    const location = useLocation()

    const handleMenuOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const handleScroll = () => {
            const sliderHeight = window.innerHeight * 0.8
            setScrolled(window.scrollY > sliderHeight - 80)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setOpen(false)
    }, [location])

    return (
        <motion.header
            initial={false}
            animate={{
                backgroundColor: scrolled
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0)",
                backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
                boxShadow: scrolled
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div className="max-w-7xl mx-auto min-h-16 flex items-center justify-between px-6">
                <Link to='/'>
                    <img src={logo} alt="Logo" className={`h-24 w-24 object-contain ${!scrolled && 'bg-gray-100'}`} />
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
                    <Link to='/' className={`${location.pathname === '/' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Home</Link>
                    <Link to='/safaris' className={`${location.pathname === '/safaris' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Safaris</Link>
                    <Link to='/destinations' className={`${location.pathname === '/destinations' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Destinations</Link>
                    <Link to='/about' className={`${location.pathname === '/about' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>About</Link>
                    <Link to='/contact' className={`${location.pathname === '/contact' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Contact</Link>
                    <Link to='/bookings' className={`bg-[#cf7a18] py-3 px-6 rounded-md transition text-white`}>Book Now</Link>
                </nav>

                <button className={`md:hidden ${scrolled ? "text-gray-900" : "text-white"}`} onClick={handleMenuOpen}>
                    {open ? <IoClose size={22} className="text-red-600" /> : <TiThMenu size={22} />}
                </button>
            </div>

            <nav className={`${open ? 'flex flex-col' : 'hidden'} md:hidden gap-8 text-sm font-medium items-left p-4`}>
                <Link to='/' className={`${location.pathname === '/' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Home</Link>
                <Link to='/safaris' className={`${location.pathname === '/safaris' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Safaris</Link>
                <Link to='/destinations' className={`${location.pathname === '/destinations' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Destinations</Link>
                <Link to='/about' className={`${location.pathname === '/about' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>About</Link>
                <Link to='/contact' className={`${location.pathname === '/contact' ? 'text-[#cf7a18]' : ''} transition ${scrolled ? "text-gray-800" : "text-white"}`}>Contact</Link>
                <Link to='/bookings' className={`bg-[#cf7a18] py-3 px-6 rounded-md transition text-white`}>Book Now</Link>
            </nav>
        </motion.header>
    )
}

export default Header1