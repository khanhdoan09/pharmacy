import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import ProductAds from '~/components/ProductAds';
import { convertNumberToPrice } from '~/utils/currency';

function Resistance() {
    const settings2 = {
        className: 'flex flex-wrap -mx-1 mt-4',
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const medicines = useSelector((state) => state.medicine.data);
    return (
        <div className="max-w-full bg-[#4e70d0]">
            <div className="mx-auto my-0 max-w-[1200px] py-8">
                <div className="-mx-1 flex flex-wrap cs:px-4 xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1">
                    <div className="flex max-w-full flex-[0_0_100%] items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-1 h-6 w-6 rounded-full bg-white px-1 py-1 text-red-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#fff] line-clamp-1">
                            Sản Phẩm Bán Chạy Nhất
                        </h3>
                    </div>
                </div>

                <Slider {...settings2}>
                    {medicines
                        ?.slice(0, 10)
                        ?.sort((a, b) => a.saleNumber - b.saleNumber)
                        ?.map((medicine, index) => {
                            const price = medicine?.priceWithUnit?.[0]?.price;
                            return (
                                <ProductAds
                                    id={medicine?.id}
                                    key={index}
                                    to={`/detail/slug=${medicine?.slug}`}
                                    label={medicine?.specification}
                                    title={medicine?.name}
                                    newPrice={`${convertNumberToPrice(price - (price * medicine?.discount) / 100)}đ`}
                                    oldPrice={`${convertNumberToPrice(price)}đ`}
                                    unit={medicine?.category}
                                />
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}

export default Resistance;
