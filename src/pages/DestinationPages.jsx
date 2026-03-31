import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { Link } from 'react-router-dom'

import uganda from '@/assets/uganda.jpg'
import ken from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'
import rwanda from '@/assets/rwanda.jpg'
import pearl from '@/assets/pearl.webp'
import guides from '@/assets/guides.jpg'
import tanzania from '@/assets/tanzania.jpg'

const DestinationPages = () => {

    const countries = [
        {
            name: "Uganda",
            image: uganda,
            description: "Explore Uganda’s exceptional wildlife, savanna, water bodies and diverse culture",
            bg: "bg-[#374b28]"
        },
        {
            name: "Kenya",
            image: ken,
            description: "The Masai Mara, national parks and rich savanna, Kenya’s tourism stands out",
            bg: "bg-[#c47a2c]"
        },
        {
            name: "Tanzania",
            image: tz,
            description: "From the slopes of Kilimanjaro to the savannas & beautiful coast, Tanzania is rich",
            bg: "bg-[#374b28]"
        },
        {
            name: "Rwanda",
            image: rwanda,
            description: "Trek the gorillas, chimpanzees & explore national parks in the heart of Rwanda",
            bg: "bg-[#c47a2c]"
        }
    ]

    const sections = [
        {
            title: "Uganda tourism",
            image: pearl,
            items: [
                "Wildlife & Eco Tourism (national parks & reserves)",
                "Adventure Tourism (River Nile)",
                "Cultural & Heritage Tourism",
                "MICE Tourism (Meetings & Conferences)",
                "Sports Tourism",
                "Luxury & Leisure Travel"
            ]
        },
        {
            title: "Kenya tourism",
            image: guides,
            items: [
                "Wildlife & Safari Tourism (Masai Mara)",
                "MICE Tourism",
                "Coastal & Beach Tourism",
                "Cultural & Heritage Tourism",
                "Adventure Tourism"
            ]
        },
        {
            title: "Tanzanian tourism",
            image: tanzania,
            items: [
                "Wildlife & Safari Tourism",
                "Coastal & Island Tourism",
                "Mountain Adventure Tourism",
                "Luxury Tourism & Hospitality",
                "Eco-Tourism & Community Tourism"
            ]
        },
        {
            title: "Rwanda tourism",
            image: rwanda,
            items: [
                "Wildlife Tourism (Primates)",
                "MICE Tourism",
                "Luxury & High-End Tourism",
                "Cultural & Community Tourism",
                "Sports Tourism"
            ]
        }
    ]

    return (
        <div>
            <Header2 />
            <Banner title="Top Destinations" />

            <section className='bg-white py-10'>
                <div className='max-w-6xl mx-auto text-center px-4'>
                    <h2 className='text-2xl md:text-4xl font-bold text-[#070e06]'>
                        Explore the beauties of East Africa
                    </h2>
                    <p className='text-gray-500 mt-4 max-w-3xl mx-auto'>
                        East Africa is blessed with beautiful landscapes, wildlife, mountains,
                        historical sites and rich cultures. Be part of the amazing journey
                        and explore the best of East Africa with Oweetu Gorilla Holidays.
                    </p>
                </div>

                <div className='max-w-7xl mx-auto my-12 grid grid-cols-1 md:grid-cols-4 gap-6 px-4'>
                    {countries.map((country, idx) => (
                        <div key={idx} className='rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white'>
                            <img src={country.image} alt={country.name} className='h-52 w-full object-cover' />
                            <div className={`${country.bg} text-white p-6 text-center`}>
                                <h3 className='text-2xl font-bold'>{country.name}</h3>
                                <p className='text-sm mt-2 leading-6'>
                                    {country.description}
                                </p>
                                <Link to={`/destinations/country/${country.name.toLowerCase()}`} className='inline-block mt-4 bg-white text-[#374b28] px-6 py-2 rounded-full font-semibold hover:bg-gray-100'>
                                    Explore
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='bg-[#dcdedb] py-16 mt-4'>
                    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4'>
                        <img src={uganda} alt="gorilla" className='rounded-2xl shadow-lg h-115 object-cover' />
                        <div className='space-y-5'>
                            <h2 className='text-3xl font-bold text-[#070e06]'>
                                Oweetu Gorilla Holidays
                            </h2>

                            <p className='text-gray-600 leading-7'>
                                We are determined to carry out destinations across East Africa, to bring what is hidden in wildlife and in the communities. Our destinations are well chosen to serve the wonders of our clients to see, enjoy and learn what is in each location.
                                <br />

                                East Africa is blessed with great unique adventures, adventures that have brought thousands of people from all the continents of the world. Historic sites, cultural diversities, great animals and more have made our destinations very great.
                                <br />

                                Uganda, Kenya, Tanzania, Rwanda have a lot  to share with you, choose your destination today.
                            </p>

                            <Link to="/bookings" className='bg-[#cf7a18] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b96b11]'>
                                Book today
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto mt-20 space-y-20 px-4'>
                    {sections.map((section, idx) => (
                        <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                            <img src={section.image} alt={section.title} className='rounded-2xl shadow-lg h-96 w-full object-cover' />

                            <div>
                                <h3 className='text-2xl font-bold text-[#070e06] mb-4'>
                                    {section.title}
                                </h3>
                                <ul className='space-y-3 text-gray-600'>
                                    {section.items.map((item, i) => (
                                        <li key={i} className='flex gap-3 items-start'>
                                            <span className='w-2 h-2 bg-[#cf7a18] rounded-full mt-2'></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DestinationPages