import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Mountain, Camera, Leaf } from 'lucide-react'

import ugandaMap from '@/assets/Uganda-map.jpg'
import kenyaMap from '@/assets/kenya-map.jpg'
import tanzaniaMap from '@/assets/tanzania-map.jpg'
import rwandaMap from '@/assets/rwanda-map.png'

import uganda from '@/assets/uganda.jpg'
import ken from '@/assets/ken.jpg'
import tz from '@/assets/tz.jpg'
import rwanda from '@/assets/rwanda.jpg'

const CountryPage = () => {


    const countryData = {
        uganda: {
            name: "Uganda",
            banner: uganda,
            map: ugandaMap,
            description:
                "Uganda, famously known as the Pearl of Africa, offers lush forests, mountain gorillas, savanna wildlife and rich cultures. From Bwindi Impenetrable National Park to Murchison Falls and the River Nile, Uganda provides one of the most diverse tourism experiences in Africa.",

            tourism: [
                "Wildlife & National Parks Tourism",
                "Gorilla & Chimpanzee Trekking",
                "Adventure Tourism (River Nile rafting)",
                "Cultural & Heritage Tourism",
                "Luxury & Eco Tourism"
            ],

            highlights: [
                "Bwindi Impenetrable National Park",
                "Queen Elizabeth National Park",
                "Murchison Falls National Park",
                "Lake Bunyonyi",
                "River Nile in Jinja"
            ]
        },

        kenya: {
            name: "Kenya",
            banner: ken,
            map: kenyaMap,
            description:
                "Kenya is one of Africa’s most famous safari destinations. From the Masai Mara to the beautiful coastal beaches of Mombasa, Kenya offers world-class wildlife, culture and luxury tourism experiences.",

            tourism: [
                "Wildlife & Safari Tourism",
                "Coastal & Beach Tourism",
                "Luxury Safari Experiences",
                "Cultural Tourism (Maasai heritage)",
                "Adventure Tourism"
            ],

            highlights: [
                "Masai Mara National Reserve",
                "Nairobi National Park",
                "Mombasa Beaches",
                "Mount Kenya",
                "Amboseli National Park"
            ]
        },

        tanzania: {
            name: "Tanzania",
            banner: tz,
            map: tanzaniaMap,
            description:
                "Tanzania is home to Mount Kilimanjaro, the Serengeti and the beautiful island of Zanzibar. It is one of the richest tourism countries in East Africa offering wildlife, adventure and luxury travel experiences.",

            tourism: [
                "Wildlife & Safari Tourism",
                "Mountain Adventure Tourism",
                "Island & Coastal Tourism",
                "Luxury Tourism & Resorts",
                "Eco Tourism"
            ],

            highlights: [
                "Serengeti National Park",
                "Mount Kilimanjaro",
                "Zanzibar Island",
                "Ngorongoro Crater",
                "Tarangire National Park"
            ]
        },

        rwanda: {
            name: "Rwanda",
            banner: rwanda,
            map: rwandaMap,
            description:
                "Rwanda is one of Africa’s fastest growing tourism destinations. Known for its clean cities and mountain gorilla trekking experiences, Rwanda offers a perfect combination of wildlife, luxury and cultural tourism.",

            tourism: [
                "Gorilla Trekking Tourism",
                "Luxury Tourism",
                "Cultural & Heritage Tourism",
                "Eco Tourism",
                "Sports Tourism"
            ],

            highlights: [
                "Volcanoes National Park",
                "Kigali City",
                "Lake Kivu",
                "Nyungwe Forest National Park",
                "Akagera National Park"
            ]
        }
    }
    const { country } = useParams()
    const data = countryData[country?.toLowerCase()]

    if (!data) {
        return (
            <div>
                <Header2 />
                <div className="text-center py-40 text-2xl font-bold">
                    Country not found
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header2 />
            <Banner title={data.name} url={data.banner} />

            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#070e06]">
                        Discover {data.name}
                    </h2>

                    <p className="text-gray-600 mt-6 leading-8 max-w-3xl mx-auto">
                        {data.description}
                    </p>
                </div>

                <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
                    <img src={data.banner} alt={data.name} className="rounded-2xl shadow-lg w-full h-96 object-cover" />

                    <div>
                        <h3 className="text-2xl font-bold text-[#070e06] mb-6">
                            Tourism in {data.name}
                        </h3>

                        <div className="space-y-4">
                            {data.tourism.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <Leaf className="text-[#cf7a18]" size={20} />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-20 px-4">

                    <h3 className="text-2xl md:text-3xl font-bold text-[#070e06] text-center">
                        Top Places to Visit in {data.name}
                    </h3>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                        {data.highlights.map((place, idx) => (
                            <div key={idx} className="rounded-2xl shadow-md p-8 bg-[#f7f7f7] hover:shadow-xl transition">
                                <MapPin className="text-[#cf7a18] mb-4" size={26} />
                                <h4 className="text-lg font-semibold">{place}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-20 px-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#070e06] text-center">
                        Tourism Experiences
                    </h3>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#374b28] text-white rounded-2xl p-8">
                            <Mountain size={30} className="mb-4" />
                            <h4 className="text-xl font-bold">Adventure Tourism</h4>
                            <p className="text-sm mt-3">
                                Explore mountains, national parks and adventure experiences across {data.name}.
                            </p>
                        </div>

                        <div className="bg-[#cf7a18] text-white rounded-2xl p-8">
                            <Camera size={30} className="mb-4" />
                            <h4 className="text-xl font-bold">Wildlife Tourism</h4>
                            <p className="text-sm mt-3">
                                Experience wildlife safaris and unforgettable nature adventures.
                            </p>
                        </div>

                        <div className="bg-[#1b1b1b] text-white rounded-2xl p-8">
                            <Leaf size={30} className="mb-4" />
                            <h4 className="text-xl font-bold">Eco Tourism</h4>
                            <p className="text-sm mt-3">
                                Enjoy sustainable travel experiences in nature and communities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default CountryPage