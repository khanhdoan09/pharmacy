import Slider from 'react-slick';
import ProductMain from '~/components/ProductMain';
import n1 from '~/assets/img/nav/n1.png';
import n2 from '~/assets/img/nav/n2.png';
import n3 from '~/assets/img/nav/n3.png';
import n4 from '~/assets/img/nav/n4.png';
import n5 from '~/assets/img/nav/n5.png';

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
                            className="mr-1 h-6 w-6 rounded-full bg-[#072d94] px-1 py-1 text-[#fff]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#000]">Vừa mới xem</h3>
                    </div>
                </div>

                <Slider {...settings3} className="padding-respinsive ">
                    <div className="!mx-auto !flex !w-11/12 !items-center !justify-center h-full">
                        <ProductMain
                            to=""
                            label="Hộp"
                            img={n1}
                            title="
                    Viên uống Sâm Nhung Bổ Thận NV Dolexpharm giúp tráng dương, mạnh gân cốt (30 viên)"
                            newPrice="591.000đ"
                            oldPrice=""
                            unit="Hộp"
                        />
                    </div>
                    <div className="!mx-auto !flex !w-11/12 !items-center !justify-center">
                        <ProductMain
                            to=""
                            label="Hộp"
                            img={n2}
                            title="
                    Tinh chất hàu Best King JpanWell hỗ trợ tăng cường sinh lý và khả năng sinh sản ở nam giới (60 viên)"
                            newPrice="1.300.000đ "
                            oldPrice=""
                            unit="Hộp"
                        />
                    </div>
                    <div className="!mx-auto !flex !w-11/12 !items-center !justify-center">
                        <ProductMain
                            to=""
                            label="Hộp"
                            img={n3}
                            title="
                    Tinh chất hàu Best King JpanWell hỗ trợ tăng cường sinh lý và khả năng sinh sản ở nam giới (60 viên)"
                            newPrice="879.000đ"
                            unit="Hộp"
                        />
                    </div>
                    <div className="!mx-auto !flex !w-11/12 !items-center !justify-center">
                        <ProductMain
                            to=""
                            label="Hộp"
                            img={n4}
                            title="
                    Viên uống Tố Nữ Vương Royal Care hỗ trợ cải thiện nội tiết tố nữ (30 viên)"
                            newPrice="138.000đ"
                            oldPrice=""
                            unit="Hộp"
                        />
                    </div>
                    <div className="!mx-auto !flex !w-11/12 !items-center !justify-center">
                        <ProductMain
                            to=""
                            label="Hộp"
                            img={n5}
                            title="
                    Viên uống Maca M Male Power Nature's Supplements bổ thận, tráng dương (60 viên)"
                            newPrice="627.000đ"
                            oldPrice="660.000đ"
                            unit="Hộp"
                        />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default View;
