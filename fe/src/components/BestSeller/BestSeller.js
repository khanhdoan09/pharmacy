import Slider from 'react-slick';
import ProductAds from '~/components/ProductAds';

function BestSeller(children) {
    const settings2 = {
        className: 'flex flex-wrap -mx-1 mt-4',
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="mb-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-4">
            <div className="flex items-center ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-1 h-6 w-6 rounded-full bg-[#ef4444] px-1 py-1 text-[#fff]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                </svg>

                <h3 className="select-none text-[20px] font-bold text-[#fff]">Bán Chạy Nhất</h3>
            </div>
            <Slider {...settings2}>{children}</Slider>
        </div>
    );
}

export default BestSeller;
