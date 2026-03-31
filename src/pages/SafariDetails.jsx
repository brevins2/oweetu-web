import Banner from '@/components/banner';
import Footer from '@/components/footer';
import Header2 from '@/components/header2';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import safarisData from '@/utils/safarisData';

const SafariDetails = () => {
    const { id } = useParams();
    const safari = safarisData.find((item) => item.id === Number(id));
    const related = safarisData
        .filter((item) => item.country === safari?.country && item.id !== safari?.id)
        .slice(0, 5);

    if (!safari) {
        return (
            <div>
                <Header2 />
                <div className="py-20 text-center">
                    <h1 className="text-2xl font-bold">Safari not found</h1>
                    <Link to="/" className="text-[#cf7a18] mt-4 inline-block">
                        Return Home
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const getImageUrl = (path) => {
        return path.startsWith('/') ? path : `/${path}`;
    };

    return (
        <div>
            <Header2 />
            <Banner title={safari.title} url={getImageUrl(safari.image)} />

            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                    {/* Main Content Column */}
                    <div className="md:col-span-2">
                        <img
                            src={getImageUrl(safari.image)}
                            alt={safari.title}
                            className="rounded-2xl shadow-lg w-full h-96 object-cover"
                        />

                        <h2 className="text-3xl font-bold mt-8">{safari.title}</h2>
                        <p className="text-gray-600 mt-4 leading-8">{safari.description}</p>

                        {/* Itinerary Section */}
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
                            <div className="space-y-3">
                                {safari.itinerary?.map((day, idx) => (
                                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 leading-relaxed">{day}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inclusions & Exclusions Grid */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-5 rounded-2xl">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Inclusions</h3>
                                <ul className="space-y-2 text-gray-700">
                                    {safari.inclusions?.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-5 rounded-2xl">
                                <h3 className="text-xl font-semibold text-red-800 mb-3">Exclusions</h3>
                                <ul className="space-y-2 text-gray-700">
                                    {safari.exclusions?.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-red-600">✗</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Accommodation & Best Time */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-5 rounded-2xl">
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">Accommodation</h3>
                                <p className="text-gray-700">{safari.accommodation}</p>
                            </div>
                            <div className="bg-yellow-50 p-5 rounded-2xl">
                                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Best Time to Visit</h3>
                                <p className="text-gray-700">{safari.bestTime}</p>
                            </div>
                        </div>

                        {/* Activities */}
                        {safari.activities && safari.activities.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4">Activities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {safari.activities.map((activity, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm"
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Highlights (using actual data) */}
                        <div className="mt-8 bg-[#f7f7f7] p-6 rounded-2xl">
                            <h3 className="text-xl font-semibold">Safari Highlights</h3>
                            <ul className="mt-4 space-y-2 text-gray-600">
                                {safari.highlights?.map((highlight, idx) => (
                                    <li key={idx}>• {highlight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-[#f7f7f7] p-6 rounded-2xl shadow-md h-fit">
                        <h3 className="text-xl font-bold mb-6">Other Safaris in {safari.country}</h3>
                        <div className="grid gap-4">
                            {related.map((item) => (
                                <Link key={item.id} to={`/safaris/${item.id}`}>
                                    <div className="flex gap-4 bg-white rounded-xl overflow-hidden hover:shadow-md transition">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover"
                                        />
                                        <div className="p-3">
                                            <h4 className="text-sm font-semibold">{item.title}</h4>
                                            <span className="text-xs text-[#cf7a18]">View →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SafariDetails;