import Banner from '@/components/banner';
import Footer from '@/components/footer';
import Header2 from '@/components/header2';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import safarisData from '@/utils/safarisData';

const SafariDetails = () => {
    const { id } = useParams();
    const safari = safarisData.find((item) => item.id === Number(id));
    const related = safarisData
        .filter((item) => item.country === safari?.country && item.id !== safari?.id)
        .slice(0, 5);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const fadeInLeft = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    }

    const sidebarVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } }
    }

    // Custom hook for scroll animations
    const SectionObserver = ({ children, variants, className = "" }) => {
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "-50px 0px"
        });

        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                className={className}
            >
                {children}
            </motion.div>
        );
    };

    if (!safari) {
        return (
            <div>
                <Header2 />
                <motion.div className="py-20 h-81 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-2xl font-bold">Safari not found</h1>
                    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/" className="text-[#cf7a18] mt-4 inline-block italic">
                            Return Home
                        </Link>
                    </motion.div>
                </motion.div>
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
                        {/* Hero Image */}
                        <motion.div
                            className="overflow-hidden rounded-2xl shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.img
                                src={getImageUrl(safari.image)}
                                alt={safari.title}
                                className="rounded-2xl shadow-lg w-full h-96 object-cover"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>

                        {/* Title & Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mt-8">{safari.title}</h2>
                            <p className="text-gray-600 mt-4 leading-8">{safari.description}</p>
                        </motion.div>

                        {/* Itinerary Section */}
                        <SectionObserver variants={fadeInUp}>
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-3"
                                >
                                    {safari.itinerary?.map((day, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ x: 10, backgroundColor: "#f3f4f6" }}
                                            className="bg-gray-50 p-4 rounded-lg transition-all duration-300 cursor-pointer"
                                        >
                                            <p className="text-gray-700 leading-relaxed">{day}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </SectionObserver>

                        {/* Inclusions & Exclusions Grid */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                className="bg-green-50 p-5 rounded-2xl"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Inclusions</h3>
                                <motion.ul
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="space-y-2 text-gray-700"
                                >
                                    {safari.inclusions?.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-start gap-2 group cursor-pointer"
                                        >
                                            <motion.span
                                                className="text-green-600 group-hover:scale-125 transition-transform duration-200"
                                                whileHover={{ scale: 1.3 }}
                                            >
                                                ✓
                                            </motion.span>
                                            <span className="group-hover:text-green-700 transition-colors duration-300">{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            <motion.div
                                className="bg-red-50 p-5 rounded-2xl"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <h3 className="text-xl font-semibold text-red-800 mb-3">Exclusions</h3>
                                <motion.ul
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="space-y-2 text-gray-700"
                                >
                                    {safari.exclusions?.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            variants={itemVariants}
                                            className="flex items-start gap-2 group cursor-pointer"
                                        >
                                            <motion.span
                                                className="text-red-600 group-hover:scale-125 transition-transform duration-200"
                                                whileHover={{ scale: 1.3 }}
                                            >
                                                ✗
                                            </motion.span>
                                            <span className="group-hover:text-red-700 transition-colors duration-300">{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </div>

                        {/* Accommodation & Best Time */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                className="bg-blue-50 p-5 rounded-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">Accommodation</h3>
                                <p className="text-gray-700">{safari.accommodation}</p>
                            </motion.div>

                            <motion.div
                                className="bg-yellow-50 p-5 rounded-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Best Time to Visit</h3>
                                <p className="text-gray-700">{safari.bestTime}</p>
                            </motion.div>
                        </div>

                        {/* Activities */}
                        {safari.activities && safari.activities.length > 0 && (
                            <SectionObserver variants={fadeInUp}>
                                <div className="mt-8">
                                    <h3 className="text-2xl font-semibold mb-4">Activities</h3>
                                    <motion.div
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex flex-wrap gap-2"
                                    >
                                        {safari.activities.map((activity, idx) => (
                                            <motion.span
                                                key={idx}
                                                variants={cardVariants}
                                                whileHover={{ scale: 1.05, backgroundColor: "#cf7a18", color: "white" }}
                                                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300"
                                            >
                                                {activity}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </SectionObserver>
                        )}

                        {/* Highlights */}
                        <SectionObserver variants={fadeInUp}>
                            <motion.div
                                className="mt-8 bg-[#f7f7f7] p-6 rounded-2xl"
                                whileHover={{ boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-semibold">Safari Highlights</h3>
                                <motion.ul
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="mt-4 space-y-2 text-gray-600"
                                >
                                    {safari.highlights?.map((highlight, idx) => (
                                        <motion.li
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ x: 10, color: "#cf7a18" }}
                                            className="cursor-pointer transition-all duration-300"
                                        >
                                            • {highlight}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </SectionObserver>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-[#f7f7f7] p-6 rounded-2xl shadow-md h-fit sticky top-24"
                    >
                        <h3 className="text-xl font-bold mb-6">Other Safaris in {safari.country}</h3>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid gap-4"
                        >
                            {related.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link to={`/safaris/${item.id}`}>
                                        <div className="flex gap-4 bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
                                            <motion.img
                                                src={getImageUrl(item.image)}
                                                alt={item.title}
                                                className="w-24 h-24 object-cover"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <div className="p-3">
                                                <h4 className="text-sm font-semibold group-hover:text-[#cf7a18] transition-colors">
                                                    {item.title}
                                                </h4>
                                                <motion.span
                                                    className="text-xs text-[#cf7a18] inline-block"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    View →
                                                </motion.span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SafariDetails;