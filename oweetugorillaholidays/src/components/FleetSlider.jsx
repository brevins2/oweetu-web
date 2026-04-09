import { useState, useEffect } from "react";

const FleetSlider = ({ images, height }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const viewImage = (index) => {
        setCurrent(index);
    }

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg" style={{ height }}>
            <div className='absolute inset-0 bg-black/30 h-full w-full' />
            <div className="relative h-full w-full">
                {images.map((img, index) => (
                    <img key={index} src={img} alt="fleet" className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`} />
                ))}

                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <div key={index} className={`h-2 rounded-full ${index === current ? "bg-green-800 w-6" : "bg-gray-400 w-2"} cursor-pointer`} onClick={() => viewImage(index)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FleetSlider;