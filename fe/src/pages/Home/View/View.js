import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import n1 from '~/assets/img/nav/n1.png';
import ProductMain from '~/components/ProductMain';
import { convertNumberToPrice } from '~/utils/currency';
function View() {
    const settings3 = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
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
                    slidesToShow: 4,
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
                    slidesToShow: 2,
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
        <div className="max-w-full bg-[#edf2f8]">
            <div className="mx-auto my-0 max-w-[1200px] py-8">
                <div className="-mx-1 flex flex-wrap cs:px-4 xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1 ">
                    <div className="mb-4 flex max-w-full flex-[0_0_100%] items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-1 h-6 w-6 rounded-full bg-red-500 px-1 py-1 text-[#fff]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#000]">Sản phẩm giảm giá</h3>
                    </div>
                </div>

                <Slider {...settings3} className="padding-respinsive ">
                    {medicines
                        ?.slice(0, 10)
                        ?.sort((a, b) => a.discount - b.discount)
                        .map((medicine, index) => {
                            const price = medicine?.priceWithUnit?.[0]?.price;
                            return (
                                <div className="!mx-auto !flex h-full !w-11/12 !items-center !justify-center">
                                    <ProductMain
                                        id={medicine?.id}
                                        key={index}
                                        to={`/detail/slug=${medicine?.slug}`}
                                        label={medicine?.specification}
                                        title={medicine?.name}
                                        newPrice={`${convertNumberToPrice(
                                            price - (price * medicine?.discount) / 100,
                                        )}đ`}
                                        oldPrice={`${convertNumberToPrice(price)}đ`}
                                        unit={medicine?.category}
                                    />
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}

export default View;
