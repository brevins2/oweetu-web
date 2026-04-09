import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"
import logo from "@/assets//logo.png"
import { useEffect, useState } from "react"

const Header2 = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation()

    const handleMenuOpen = () => {
        setOpen(!open)
    }
    
    useEffect(() => {
        setOpen(false)
    }, [location])

    return (
        <header className="sticky top-0 w-full z-50 bg-white/40 backdrop-blur-lg shadow-sm">
            <div className="max-w-7xl mx-auto min-h-16 flex items-center justify-between px-6">
                <Link to='/'>
                    <img src={logo} alt="Logo" className="h-24 w-24 object-contain" />
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
                    <Link to='/' className={`${location.pathname === '/' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Home</Link>
                    <Link to='/safaris' className={`${location.pathname === '/safaris' || location.pathname.includes('safaris') ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Safaris</Link>
                    <Link to='/destinations' className={`${location.pathname === '/destinations' || location.pathname.includes('destinations') ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Destinations</Link>
                    <Link to='/about' className={`${location.pathname === '/about' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>About</Link>
                    <Link to='/contact' className={`${location.pathname === '/contact' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Contact</Link>
                    <Link to='/gallery' className={`${location.pathname === '/gallery' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Gallery</Link>
                    <Link to='/bookings' className="bg-[#cf7a18] hover:bg-[#eb932f] py-3 px-6 rounded-md transition text-white">Book Now</Link>
                </nav>

                <button className="md:hidden text-gray-900" onClick={handleMenuOpen}>
                    {open ? <IoClose size={22} className="text-red-600" /> : <TiThMenu size={22} />}
                </button>
            </div>

            <nav className={`${open ? 'flex flex-col' : 'hidden'} md:hidden gap-8 text-sm font-medium items-left p-4 transition`}>
                <Link to='/' className={`${location.pathname === '/' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Home</Link>
                <Link to='/safaris' className={`${location.pathname === '/safaris' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Safaris</Link>
                <Link to='/destinations' className={`${location.pathname === '/destinations' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Destinations</Link>
                <Link to='/about' className={`${location.pathname === '/about' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>About</Link>
                <Link to='/contact' className={`${location.pathname === '/contact' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Contact</Link>
                <Link to='/gallery' className={`${location.pathname === '/gallery' ? 'text-[#cf7a18]' : ''} hover:text-[#cf7a18] font-medium text-[16px]`}>Gallery</Link>
                <Link to='/bookings' className="bg-[#cf7a18] hover:bg-[#eb932f] py-3 px-6 rounded-md transition text-white">Book Now</Link>
            </nav>
        </header>
    )
}

export default Header2