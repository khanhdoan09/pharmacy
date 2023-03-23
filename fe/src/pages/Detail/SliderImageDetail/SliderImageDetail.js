import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import useBodyScrollLock from '~/hooks/useBodyScrollLock';

function SliderImageDetail() {
    const settings = {
        customPaging: function (i) {
            return (
                <div className="cursor-pointer rounded-md border px-4 py-4 hover:border-[#016cc9] cs:hidden cs:w-[70px] xs:hidden xs:w-[100px]  sm:block sm:w-[132px] md:block md:w-[132px] lg:block lg:w-[132px] xl:block xl:w-[132px] 2xl:block 2xl:w-[132px]">
                    <img
                        src={require(`../../../assets/img/slide0${i + 1}.png`)}
                        alt="slide-img"
                        className=" h-[100px] w-[100px] object-cover "
                    />
                </div>
            );
        },
        dots: true,
        dotsClass: '!grid grid-cols-4 gap-4 px-1',
        infinite: true,
        speed: 400,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const settingsModal = {
        customPaging: function (i) {
            return (
                <div className="mx-auto !flex  w-[132px] cursor-pointer items-center  rounded-md border px-4 py-4 hover:border-[#016cc9] 2xl:block">
                    <img
                        src={require(`../../../assets/img/slide0${i + 1}.png`)}
                        alt="slide-img"
                        className=" h-[100px] w-[100px] object-cover "
                    />
                </div>
            );
        },
        dots: true,
        dotsClass: '!grid grid-cols-4 gap-4 px-1',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const [lock, toggle] = useBodyScrollLock();
    const [showDetailImage, setShowDetailImage] = useState(false);

    return (
        <div className="img animate-fadeBottomMobile overflow-hidden px-1 cs:hidden xs:hidden sm:block md:block lg:block xl:block 2xl:block">
            <Slider {...settings}>
                <div
                    className="cursor-pointer select-none outline-none cs:h-full xs:h-[300px] sm:h-[476px] md:h-[476px] lg:h-[476px] xl:h-[476px] 2xl:h-[476px]"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide01.png')}
                        alt="slide-img"
                        className="mx-auto flex object-cover object-center cs:w-[100px] xs:w-[432px] sm:w-[432px] md:w-[432px] lg:w-[432px] xl:w-[432px] 2xl:w-[432px]"
                    />
                </div>
                <div
                    className="cursor-pointer select-none outline-none cs:h-[200px] xs:h-[300px] sm:h-[476px] md:h-[476px] lg:h-[476px] xl:h-[476px] 2xl:h-[476px]"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide02.png')}
                        alt="slide-img"
                        className="mx-auto flex object-cover object-center cs:w-[100px] xs:w-[432px] sm:w-[432px] md:w-[432px] lg:w-[432px] xl:w-[432px] 2xl:w-[432px]"
                    />
                </div>
                <div
                    className="cursor-pointer select-none cs:h-[200px] xs:h-[300px] sm:h-[476px] md:h-[476px] lg:h-[476px] xl:h-[476px] 2xl:h-[476px]"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide03.png')}
                        alt="slide-img"
                        className="mx-auto flex object-cover object-center cs:w-[100px] xs:w-[432px] sm:w-[432px] md:w-[432px] lg:w-[432px] xl:w-[432px] 2xl:w-[432px]"
                    />
                </div>
                <div
                    className="cursor-pointer select-none cs:h-[200px] xs:h-[300px] sm:h-[476px] md:h-[476px] lg:h-[476px] xl:h-[476px] 2xl:h-[476px]"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide04.png')}
                        alt="slide-img"
                        className="mx-auto flex object-cover object-center cs:w-[100px] xs:w-[300px] sm:w-[432px] md:w-[432px] lg:w-[432px] xl:w-[432px] 2xl:w-[432px]"
                    />
                </div>
            </Slider>
            {showDetailImage && (
                <div className="fixed top-0 left-0 z-50 h-full w-full animate-fadeBottomMobile">
                    <div
                        className="detail-img__overlay relative top-0 left-0 z-50  h-screen w-screen bg-[rgb(67,67,67,0.6)]"
                        onClick={() => {
                            setShowDetailImage(!showDetailImage);
                        }}
                    ></div>
                    <div className="detail-img absolute top-1/2 left-1/2 z-50 w-[50%] min-w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-10 py-10 ">
                        <div className="detail-img__header flex items-center justify-between">
                            <p className="line-clamp-1">
                                Viên uống Gasso Max Vitamins For Life bổ sung enzym và các thảo mộc (30 viên)
                            </p>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mr-2 h-10 w-10 cursor-pointer px-2 py-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                                    />
                                </svg>
                                <button
                                    className="flex items-center rounded-lg bg-[#718198] px-2 py-1 text-[#fff]"
                                    onClick={() => {
                                        setShowDetailImage(!showDetailImage);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <p>Đóng</p>
                                </button>
                            </div>
                        </div>
                        <div className="detail-img__content">
                            <Slider {...settingsModal}>
                                <div className="select-none outline-none cs:h-[200px] xs:h-[300px] sm:h-[476px] md:h-[476px] lg:h-[476px] xl:h-[476px] 2xl:h-[476px]">
                                    <img
                                        src={require('~/assets/img/slide01.png')}
                                        alt="slide-img"
                                        className="transition-basic mx-auto flex h-[432px] w-[432px] cursor-pointer object-cover hover:scale-110"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide02.png')}
                                        alt="slide-img"
                                        className="transition-basic mx-auto flex h-[432px] w-[432px] cursor-pointer object-cover hover:scale-110"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide03.png')}
                                        alt="slide-img"
                                        className="transition-basic mx-auto flex h-[432px] w-[432px] cursor-pointer object-cover hover:scale-110"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide04.png')}
                                        alt="slide-img"
                                        className="transition-basic mx-auto flex h-[432px] w-[432px] cursor-pointer object-cover hover:scale-110"
                                    />
                                </div>
                            </Slider>
                        </div>
                        <div className="detail-img__footer"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SliderImageDetail;
