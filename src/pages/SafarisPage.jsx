import Banner from '@/components/banner'
import Footer from '@/components/footer'
import Header2 from '@/components/header2'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import safariData from '@/utils/safarisData'

const SafarisPage = () => {
    const [selectedCountry, setSelectedCountry] = useState("all")
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10

    const filteredSafaris = safariData.filter((item) => {
        const matchesCountry = selectedCountry === "all" || item.country === selectedCountry
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
        return matchesCountry && matchesSearch
    })

    const totalPages = Math.ceil(filteredSafaris.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSafaris = filteredSafaris.slice(startIndex, startIndex + itemsPerPage)

    const handleCountryChange = (country) => {
        setSelectedCountry(country)
        setCurrentPage(1)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div>
            <Header2 />
            <Banner title="Safaris" />

            <section className="bg-[#f7f7f7] py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

                    <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
                        <h3 className="text-xl font-bold mb-6">Filter Safaris</h3>

                        <div className="flex items-center border rounded-lg px-3 py-2 mb-6">
                            <Search size={18} />
                            <input type="text" placeholder="Search safari..." className="outline-none ml-2 w-full" value={search} onChange={handleSearchChange} />
                        </div>

                        <div className="space-y-3">
                            {["all", "uganda", "kenya", "tanzania", "rwanda"].map((country) => (
                                <button key={country} onClick={() => handleCountryChange(country)} className={`w-full text-left px-4 py-3 rounded-lg capitalize transition ${selectedCountry === country ? "bg-[#374b28] text-white" : "bg-[#f3f3f3] hover:bg-[#e7e7e7]"}`}>
                                    {country === "all" ? "All Safaris" : country}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedSafaris.map((safari) => (
                                <Link to={`/safaris/${safari.id}`} key={safari.id}>
                                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
                                        <img src={safari.image} alt={safari.title} className="w-full h-56 object-cover" />
                                        <div className="p-6">
                                            <h4 className="font-semibold">{safari.title}</h4>

                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                {safari.description}
                                            </p>

                                            <span className="inline-block mt-4 text-sm text-[#cf7a18] font-semibold">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-3 flex-wrap">
                                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100">
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1
                                    return (
                                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg shadow transition ${currentPage === page ? "bg-[#374b28] text-white" : "bg-white hover:bg-gray-100"} `}>
                                            {page}
                                        </button>
                                    )
                                })}

                                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100">
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SafarisPage