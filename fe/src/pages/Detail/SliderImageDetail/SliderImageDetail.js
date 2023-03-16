import { useState } from 'react';
import Slider from 'react-slick';
import useBodyScrollLock from '~/hooks/useBodyScrollLock';

function SliderImageDetail() {
    const settings = {
        customPaging: function (i) {
            return (
                <div className="w-[132px] border rounded-md cursor-pointer px-4 py-4 hover:border-[#016cc9]">
                    <img
                        src={require(`../../../assets/img/slide0${i + 1}.png`)}
                        alt="slide-img"
                        className=" object-cover w-[100px] h-[100px] "
                    />
                </div>
            );
        },
        dots: true,
        dotsClass: '!grid grid-cols-4 gap-4 px-1',
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const settingsModal = {
        customPaging: function (i) {
            return (
                <div className="w-[132px] !flex mx-auto items-center  border rounded-md cursor-pointer px-4 py-4 hover:border-[#016cc9]">
                    <img
                        src={require(`../../../assets/img/slide0${i + 1}.png`)}
                        alt="slide-img"
                        className=" object-cover w-[100px] h-[100px] "
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
        
        <div className="img px-1 animate-fadeBottomMobile">
            <Slider {...settings}>
                <div
                    className="select-none outline-none h-[476px] cursor-pointer"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide01.png')}
                        alt="slide-img"
                        className="w-[432px] h-[432px] object-cover flex mx-auto "
                    />
                </div>
                <div
                    className="select-none outline-none h-[476px] cursor-pointer"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide02.png')}
                        alt="slide-img"
                        className="w-[432px] h-[432px] object-cover flex mx-auto"
                    />
                </div>
                <div
                    className="select-none h-[476px] cursor-pointer"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide03.png')}
                        alt="slide-img"
                        className="w-[432px] h-[432px] object-cover flex mx-auto"
                    />
                </div>
                <div
                    className="select-none h-[476px] cursor-pointer"
                    onClick={() => {
                        setShowDetailImage(!showDetailImage);
                    }}
                >
                    <img
                        src={require('~/assets/img/slide04.png')}
                        alt="slide-img"
                        className="w-[432px] h-[432px] object-cover flex mx-auto"
                    />
                </div>
            </Slider>
            {showDetailImage && (
                <div className="fixed top-0 left-0 z-50 w-full h-full animate-fadeBottomMobile">
                    <div
                        className="detail-img__overlay relative top-0 left-0 z-50  w-screen h-screen bg-[rgb(67,67,67,0.6)]"
                        onClick={() => {
                            setShowDetailImage(!showDetailImage);
                        }}
                    ></div>
                    <div className="detail-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-[50%] min-w-[690px] px-10 py-10 rounded-lg ">
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
                                    className="w-10 h-10 cursor-pointer px-2 py-2 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                                    />
                                </svg>
                                <button
                                    className="flex items-center bg-[#718198] px-2 py-1 rounded-lg text-[#fff]"
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
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <p>Đóng</p>
                                </button>
                            </div>
                        </div>
                        <div className="detail-img__content">
                            <Slider {...settingsModal}>
                                <div className="select-none outline-none h-[476px]">
                                    <img
                                        src={require('~/assets/img/slide01.png')}
                                        alt="slide-img"
                                        className="w-[432px] h-[432px] object-cover flex mx-auto hover:scale-110 transition-basic cursor-pointer"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide02.png')}
                                        alt="slide-img"
                                        className="w-[432px] h-[432px] object-cover flex mx-auto hover:scale-110 transition-basic cursor-pointer"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide03.png')}
                                        alt="slide-img"
                                        className="w-[432px] h-[432px] object-cover flex mx-auto hover:scale-110 transition-basic cursor-pointer"
                                    />
                                </div>
                                <div className="select-none outline-none">
                                    <img
                                        src={require('~/assets/img/slide04.png')}
                                        alt="slide-img"
                                        className="w-[432px] h-[432px] object-cover flex mx-auto hover:scale-110 transition-basic cursor-pointer"
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
