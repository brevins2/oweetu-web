import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Header2 from "@/components/header2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaRoad, FaBinoculars, FaUserTie, FaCalendarCheck, FaUsers, FaPaperPlane, FaCar } from "react-icons/fa";

import V01 from "@/assets/01.jpeg"
import V02 from "@/assets/carflied.jpeg"
import V03 from "@/assets/03.jpeg"
import V04 from "@/assets/car4.jpeg"
import V05 from "@/assets/car10.jpeg"
import V06 from "@/assets/car11.jpeg"
import V07 from "@/assets/07.jpeg"
import V08 from "@/assets/car-inside.jpeg"
import V09 from "@/assets/car12.jpeg"


const vehicles = [
    {
        id: 1,
        name: "Land Cruise",
        image: V01,
        seats: 4,
        type: "4X4, no pop-up",
    },
    {
        id: 2,
        name: "Land Cruiser",
        image: V02,
        seats: 6,
        type: "4X4, pop-up",
    },
    {
        id: 3,
        name: "Land Cruiser",
        image: V03,
        seats: 7,
        type: "4X4, open roof",
    },
    {
        id: 4,
        name: "Land Cruiser",
        image: V04,
        seats: 6,
        type: "4X4, no pop-up, roof deck",
    },
    {
        id: 5,
        name: "Land Cruiser",
        image: V05,
        seats: 8,
        type: "4X4, pop-up",
    },
    {
        id: 6,
        name: "Land Cruiser",
        image: V06,
        seats: 8,
        type: "4X4, pop-up",
    },
    {
        id: 7,
        name: "Land Cruiser",
        image: V07,
        seats: 7,
        type: "4X4, pop-up",
    },
    {
        id: 8,
        name: "Land Cruiser",
        image: V08,
        seats: 7,
        type: "4X4, pop-up",
    },
    {
        id: 9,
        name: "Land Cruiser",
        image: V09,
        seats: 7,
        type: "4X4, pop-up",
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const SectionObserver = ({ children, variants, className = "" }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "-50px 0px",
    });

    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
            {children}
        </motion.div>
    );
};

const Fleet = () => {
    return (
        <div>
            <Header2 />
            <Banner title="Our Fleet" />

            <section className="mt-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#eaeae5]"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-2 gap-1.5 p-1.5">
                                <img
                                    src={V01}
                                    alt="safari jeep"
                                    className="col-span-2 h-64 w-full object-cover rounded-xl"
                                />
                                <img
                                    src={V03}
                                    alt="land cruiser"
                                    className="h-40 w-full object-cover rounded-xl"
                                />
                                <img
                                    src={V02}
                                    alt="roof top view"
                                    className="h-40 w-full object-cover rounded-xl"
                                />
                            </div>
                            <motion.div
                                className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <FaCar className="text-[#e3c9a0]" />
                                +12 vehicles
                            </motion.div>
                        </motion.div>

                        <SectionObserver variants={fadeInRight}>
                            <div className="space-y-5">
                                <motion.h2
                                    className="text-3xl font-bold text-[#1f2e1a]"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Engineered for the African bush
                                </motion.h2>
                                <motion.p
                                    className="text-[#2d3a26]/80 leading-relaxed text-base"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    Our fleet is strongly built, well maintained, and equipped for East
                                    Africa’s diverse landscapes. Every vehicle features pop-up
                                    roofs for unobstructed game viewing, ample legroom, and
                                    advanced suspension for rugged trails.
                                </motion.p>
                                <motion.div
                                    className="flex flex-wrap gap-5 text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div>
                                        <span className="font-semibold text-[#1f2e1a]">100%</span>{" "}
                                        <span className="text-[#5e6b55]">off‑road ready</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#1f2e1a]">24/7</span>{" "}
                                        <span className="text-[#5e6b55]">support & recovery</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-[#1f2e1a]">✔</span>{" "}
                                        <span className="text-[#5e6b55]">experienced driver‑guides</span>
                                    </div>
                                </motion.div>
                                <motion.button
                                    className="bg-[#b97635] hover:bg-[#a0662b] text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-[#b97635]/20 transition flex items-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaCalendarCheck /> Check availability
                                </motion.button>
                            </div>
                        </SectionObserver>
                    </div>
                </div>

                {/* Fleet Grid Section */}
                <motion.div
                    className="bg-[#eaeaea] py-8 md:py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="mb-6 flex items-end justify-between">
                            <motion.h3 className="text-2xl font-bold text-[#1f2e1a]" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>Our safari vehicles</motion.h3>
                        </div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {vehicles.map((vehicle) => (
                                <motion.div key={vehicle.id} variants={cardVariants} whileHover={{ y: -8 }} className="fleet-card bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100/80 transition-all duration-300">
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                                        <span className="absolute top-3 left-3 bg-[#1f2e1a]/80 text-white text-[10px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                            {vehicle.type}
                                        </span>
                                        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                            <FaUsers /> {vehicle.seats}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-[#1f2e1a]">
                                            {vehicle.name}
                                        </h4>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <SectionObserver variants={fadeInUp}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#eaeae5] rounded-3xl p-8 md:p-12">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-[#b97635]">
                                    <FaRoad />
                                </span>
                                <div>
                                    <h5 className="font-bold text-[#1f2e1a]">All‑terrain tyres</h5>
                                    <p className="text-sm text-[#4d5a45]">
                                        BFGoodrich or similar, reinforced for rocky & muddy trails.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-[#b97635]">
                                    <FaBinoculars />
                                </span>
                                <div>
                                    <h5 className="font-bold text-[#1f2e1a]">
                                        Game‑viewing ready
                                    </h5>
                                    <p className="text-sm text-[#4d5a45]">
                                        Pop‑up roof, charging ports, cool boxes & safari chairs.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-[#b97635]">
                                    <FaUserTie />
                                </span>
                                <div>
                                    <h5 className="font-bold text-[#1f2e1a]">
                                        Expert driver‑guides
                                    </h5>
                                    <p className="text-sm text-[#4d5a45]">
                                        Certified, multilingual, with deep local knowledge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionObserver>

                {/* CTA Banner */}
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-[#1f2e1a] rounded-3xl text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div>
                            <h4 className="text-2xl font-bold">Ready to explore?</h4>
                            <p className="text-gray-300 text-sm max-w-md">
                                Choose your safari vehicle and let us craft an unforgettable
                                journey.
                            </p>
                        </div>
                        <button className="bg-[#b97635] hover:bg-[#a0662b] px-10 py-3 rounded-full font-medium transition shadow-lg shadow-[#b97635]/25 flex items-center gap-2">
                            <FaPaperPlane /> Inquire now
                        </button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Fleet;