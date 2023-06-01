import React, { useState } from 'react';

const ProductImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <img className="h-[488px] max-w-full select-none" src={images[currentIndex]} alt={`Product ${currentIndex}`} />
                <button
                    className="absolute top-1/2 left-0 -translate-y-1/2 transform rounded-full bg-white px-4 py-2 shadow-md hover:bg-gray-200 focus:outline-none"
                    onClick={handlePrev}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    className="absolute top-1/2 right-0 -translate-y-1/2 transform rounded-full bg-white px-4 py-2 shadow-md hover:bg-gray-200 focus:outline-none"
                    onClick={handleNext}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className="mt-4 flex">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`mx-2 h-[100px] w-[100px] cursor-pointer rounded-md border border-gray-400 focus:outline-none ${
                            currentIndex === index ? 'border-gray-600 bg-gray-200' : 'bg-white'
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img className="h-full w-full rounded-md" src={image} alt={`Product ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImageSlider;
