import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { Link } from 'react-router-dom'

import van from '@/assets/van.jpg'
import range_rover from '@/assets/range_rover.jpg'
import open_carrier from '@/assets/6X4_open.jpg'
import closed_carrier from '@/assets/6X4.jpg'

import uganda from '@/assets/uganda.jpg'
import kenya from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'
import rwanda from '@/assets/rwanda.jpg'

import hotel1 from '@/assets/hotel-1.jpg'
import hotel2 from '@/assets/hotel-2.jpg'
import hotel3 from '@/assets/hotel-3.jpg'
import campfire from '@/assets/campfire.jpg'

import guides from '@/assets/guides.jpg'

const AboutPage = () => {
    const fleet = [
        {
            title: "Tour Van",
            image: van,
            description: " Carrying upto 14 tourists with an close-open roof",
            location: ""
        },
        {
            title: "Range Rover",
            image: range_rover,
            description: "Carrying upto 4 tourists with an close-open roof",
            location: ""
        },
        {
            title: "Open Carrier",
            image: open_carrier,
            description: "Carrying up-to 6 tourists open for sunny weathers",
            location: ""
        },
        {
            title: "Closed carrier",
            image: closed_carrier,
            description: "Carrying upto 8 tourists with an close-open roof and a mobile fridge",
            location: ""
        },
    ]

    const destinations = [
        {
            title: "Uganda",
            image: uganda,
            description: "Explorer Uganda's exceptional wildlife, savanna, water bodies and diverse culture",
            location: ""
        },
        {
            title: "Kenya",
            image: kenya,
            description: "The Masai Mara, national parks and rich savanna, Kenya's tourism stands out",
            location: ""
        },
        {
            title: "Tanzania",
            image: tz,
            description: "From the slopes of Kilimanjaro to the Simbas & beautiful coast, Tanzania is rich",
            location: ""
        },
        {
            title: "Rwanda",
            image: rwanda,
            description: "Trek the gorilla, chimpanzees & explore national parks in the heart of Rwanda",
            location: ""
        },
    ]

    const accomodations = [
        {
            title: "Scenery views",
            image: hotel1,
            description: "Relax with the best views of the wild with our accommodations, great view, fresh air and amazing relaxations",
        },
        {
            title: "Luxury Hotels",
            image: hotel3,
            description: "Stay dot com with luxurious hotels in the country and enjoy comfort and relaxation mixed with luxury"
        },
        {
            title: "Swimming pools & bars",
            image: hotel2,
            description: "Relax in swimming pools and bars after the day's trip that are open 24/7 for your satisifaction"
        },
        {
            title: "Camp fires",
            image: campfire,
            description: "Desire a camp fire, we got you covered & entertained. Enjoy the good old days & live memories for life"
        },
    ]

    return (
        <div>
            <Header2 />
            <Banner title="About us" />
            <section className='mt-8 bg-white'>
                <div className='max-w-7xl text-center mx-auto my-10 px-2 md:px-4'>
                    <p className='text-lg text-[#070e06] font-light'>
                        Oweetu Gorilla Holidays is a safari company based in Uganda that carries out tours across East Africa. The <i>“Pearl of Africa”</i> has a lot to offer to tourist from everywhere across the world. This has been a great support for many business minded country men and women. From water bodies, animals, forests, savanna areas, landscapes, history and culture, there has been a big room for everyone who wants to work.
                        <br /><br />

                        Oweetu Gorilla Holidays is a dream of an adventure loving Ugandan who has grown up watching the wildlife, sharing the tourism experience from the heart of Queen Elizabeth national park. As a young lad, he has grown up seeing tourist vehicles and groups come in and out of the park and surrounding water bodies like Kazinga Channel and this and his love for adventure travel have pushed him to have a desire to take part in this economic activity.
                    </p>
                </div>

                <div className="bg-[#eaeaea] my-10 py-8">
                    <div className='max-w-7xl mx-auto px-4 md:px-0'>
                        <h2 className='text-xl md:text-3xl text-[#070e06] text-center font-bold'>Our Destinations</h2>
                        <p className="text-gray-500 md:text-lg text-center">Travel through East Africa to a destination of your choice</p>

                        <div className='mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                            {fleet.map((destination, idx) => (
                                <div key={idx} className="shadow-lg rounded-xl text-white grid bg-[#444444]">
                                    <img src={destination.image} alt={destination.title} className='h-64 w-full object-cover rounded-t-xl' />
                                    <div className='p-3 text-center'>
                                        <span className='text-3xl font-semibold text-[#b97635]'>{destination.title}</span>
                                        <p className='text-lg leading-7 mb-6'>{destination.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto my-10'>
                    <img src={guides} alt="lions" className='h-full md:h-125 w-full object-cover' />
                    <div className='text-left space-y-2 px-4 md:px-0'>
                        <h2 className='text-xl md:text-3xl text-[#070e06] font-bold'>The pearl of Africa</h2>

                        <p className='text-lg leading-7 mb-6 font-light'>
                            Uganda is a country with 2 seasons, rainy and sunny seasons. Our guides and vehicles are built with the capability to carry out trips for tourists at any time of their choosing.<br />
                            Sunny/dry season(summer) that is mid year is usually the most preferred by many of our clients because of the easiness of transportation across the national parks plus most conducive environment that favor their enjoyment.<br /><br />

                            National parks like Queen Elizabeth, Murchison Falls, Bwindi Impenetrable, and many more always parked with tourists from with in and outside the country. Birds in the air and animals outside grazing, migrating and cooling down, water bodies clear and holiday makers enjoying.<br />
                            Enjoying the cultural art crafts from the tourist shops, participate in the cultural dances and many more things that make Uganda unique
                        </p>
                    </div>
                </div>

                <div className="bg-[#eaeaea] my-10 py-8 md:py-10">
                    <div className='max-w-7xl mx-auto px-4 md:px-0'>
                        <h2 className='text-xl md:text-3xl text-[#070e06] text-center font-bold'>Explore the beauties of East Africa</h2>
                        <p className="text-gray-500 md:text-lg text-center md:mx-auto md:w-[90%] ">
                            East Africa is blessed with beauties from water bodies, animal, amazing landscapes, diverse culture and various historical sites. Be part of the amazing journey and explore the best of East Africa with Oweetu Gorilla Holidays
                        </p>

                        <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                            {destinations.map((destination, idx) => (
                                <div key={idx} className={`shadow-lg rounded-xl text-white grid ${idx % 2 > 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'}`}>
                                    <img src={destination.image} alt={destination.title} className='h-56 w-full object-cover rounded-t-xl' />
                                    <div className='p-3 pb-8 text-center'>
                                        <span className={`text-2xl font-semibold ${idx % 2 === 0 ? 'text-[#b97635]' : 'text-[#374b28]'}`}>{destination.title}</span>
                                        <p className='text-[16px] leading-7 mb-6'>{destination.description}</p>
                                        <Link to={destination.location} className={`py-3 px-6 rounded font-bold ${idx % 2 === 0 ? 'bg-[#b97635]' : 'bg-[#374b28]'}`}>View Page</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='max-w-7xl mx-auto px-4 md:px-0 py-8 md:py-8'>
                    <h2 className='text-xl md:text-3xl text-[#070e06] text-center font-bold'>Safaris Accommodations</h2>
                    <p className="text-gray-500 md:text-lg text-center md:mx-auto md:w-[90%] mt-2">
                        East Africa is blessed with beauties from water bodies, animal, amazing landscapes, diverse culture and various historical sites. Be part of the amazing journey and explore the best of East Africa with Oweetu Gorilla Holidays
                    </p>

                    <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 py-2'>
                        {accomodations.map((accomodate, idx) => (
                            <div key={idx} className="text-white grid">
                                <img src={accomodate.image} alt={accomodate.title} className='h-56 w-full object-cover' />
                                <div className='p-3 pb-8 text-center mt-2'>
                                    <span className="text-xl font-medium text-[#000000D9]">{accomodate.title}</span>
                                    <p className='text-[16px] font-light leading-7 mb-6 text-[#494949]'>{accomodate.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default AboutPage
