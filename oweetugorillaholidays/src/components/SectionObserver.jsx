import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

export default SectionObserver;
