import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaInstagram, FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa'

import img1 from '@/assets/boat-cruise.jpeg'
import img2 from '@/assets/equator-line-1.jpeg'
import img3 from '@/assets/fog-1.jpeg'
import img4 from '@/assets/tourist-on-cars-2.jpeg'
import img5 from '@/assets/tourists-5.jpeg'
import img6 from '@/assets/tourists-6.jpeg'
import img7 from '@/assets/tourists-flags-1.jpeg'
import img8 from '@/assets/car11.jpeg'
import img9 from '@/assets/giraffes.jpeg'
import img10 from '@/assets/tourists-3.jpeg'
import Header2 from '@/components/header2'
import Footer from '@/components/footer'
import Banner from '@/components/banner'

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Gallery images data
    const galleryImages = [
        { id: 1, src: img1, title: "Boat Cruising, on Uganda lakes", location: "Nwoya, Uganda", likes: 234 },
        { id: 2, src: img2, title: "Equator Line", location: "Kasese, Uganda", likes: 189 },
        { id: 3, src: img3, title: "Foggy views", location: "Kisoro, Uganda", likes: 456 },
        { id: 4, src: img4, title: "Touring Masai Mara", location: "Masai Mara, Kenya", likes: 312 },
        { id: 5, src: img5, title: "Queen Elizabeth National Park", location: "Kasese, Uganda", likes: 278 },
        { id: 6, src: img6, title: "Queen Elizabeth, Uganda", location: "Kasese, Uganda", likes: 145 },
        { id: 7, src: img7, title: "Along lake Victoria", location: "Jinja, Uganda", likes: 367 },
        { id: 8, src: img8, title: "Bird Watching", location: "Nyungwe, Rwanda", likes: 98 },
        { id: 9, src: img9, title: "Giraffes", location: "Kidepo Valley National Park, Uganda", likes: 423 },
        { id: 10, src: img10, title: "Lions", location: "Serengeti National Park, Tanzania", likes: 289 }
    ]

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    }

    const openModal = (index) => {
        setCurrentIndex(index)
        setSelectedImage(galleryImages[index])
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setSelectedImage(null)
        document.body.style.overflow = 'auto'
    }

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % galleryImages.length
        setCurrentIndex(nextIndex)
        setSelectedImage(galleryImages[nextIndex])
    }

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
        setCurrentIndex(prevIndex)
        setSelectedImage(galleryImages[prevIndex])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal()
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
    }

    React.useEffect(() => {
        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown)
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedImage, currentIndex])

    const SectionObserver = ({ children, variants, className = "" }) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "-50px 0px"
        });

        return (
            <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
                {children}
            </motion.div>
        );
    };

    return (
        <>
            <Header2 />
            <Banner title="Gallery" />
            <div className="bg-linear-to-br from-gray-50 to-gray-100 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionObserver variants={fadeInUp}>
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-[#070e06] mb-4"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Our Safari Gallery
                            </motion.h2>
                            <motion.div
                                className="w-24 h-1 bg-[#cf7a18] mx-auto mb-6"
                                initial={{ width: 0 }}
                                animate={{ width: 96 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />
                            <motion.p
                                className="text-gray-600 max-w-2xl mx-auto text-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Capturing the most breathtaking moments from our safaris across East Africa
                            </motion.p>
                        </div>
                    </SectionObserver>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-12">
                        <a href="https://www.instagram.com/oweetugorillaholidays" target="_blank" rel="noopener noreferrer" className="block">
                            <motion.div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-orange-500 p-8 text-white shadow-xl group cursor-pointer" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }} className="bg-white rounded-full p-4 shadow-lg">
                                            <FaInstagram size={40} className="text-pink-600" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Follow Our Adventures</h3>
                                            <p className="text-white/90">Get daily updates, behind-the-scenes content, and amazing wildlife moments</p>
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                                        <FaInstagram size={20} />
                                        @oweetugorillaholidays
                                    </motion.div>
                                </div>
                            </motion.div>
                        </a>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div key={image.id} variants={cardVariants} whileHover={{ y: -10, scale: 1.02 }} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" onClick={() => openModal(index)}>
                                <motion.div className="overflow-hidden">
                                    <motion.img src={image.src} alt={image.title} className="w-full h-72 object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                                </motion.div>

                                <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaInstagram className="text-white" size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center mt-12">
                        <motion.a href="https://www.instagram.com/oweetugorillaholidays" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-linear-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                            <FaInstagram size={24} />
                            View More Photos on Instagram
                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeModal}>
                            <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="absolute top-4 right-4 text-white text-3xl z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition" onClick={closeModal} >
                                <FaTimes />
                            </motion.button>

                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute left-4 text-white text-3xl z-10 bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prevImage()
                                }}
                            >
                                <FaChevronLeft />
                            </motion.button>

                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute right-4 text-white text-3xl z-10 bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    nextImage()
                                }}
                            >
                                <FaChevronRight />
                            </motion.button>

                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                                <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto max-h-[85vh] object-contain rounded-lg" />

                                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-lg" >
                                    <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                                    <p className="text-gray-200">{selectedImage.location}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <motion.a href="https://www.instagram.com/oweetugorillaholidays" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition" whileHover={{ scale: 1.05 }} >
                                            <FaInstagram />
                                            View on Instagram
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                                {currentIndex + 1} / {galleryImages.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </>
    )
}

export default Gallery