import React from 'react'
import guides from '@/assets/guides.jpg'

const Banner = ({ url=guides, title }) => {
    return (
        <div style={{ backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundPositionY: 'center' }} className="text-white relative h-72 md:h-96">
            <div className='absolute inset-0 bg-black/50' />
            <div className="flex h-full justify-center items-center text-white relative px-4 text-center md:px-0">
                <h2 className='text-2xl md:text-4xl font-bold max-w-3xl leading-12'>
                    {title}
                </h2>
            </div>
        </div>
    )
}

export default Banner
