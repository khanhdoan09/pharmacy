import { useState, useRef, useEffect } from 'react';
// import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import Slider from 'react-slick';
import ProductSeller from '~/components/ProductSeller';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Voucher from '~/components/Voucher';
import { getAllMedicinesInCart } from '~/services/cartService';
import { Navigate, useNavigate } from 'react-router-dom';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';

function Cart() {
    const voucherRef = useRef();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [showVouchers, setShowVouchers] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const load = getAllMedicinesInCart();
        load.then(
            (e) => {
                if (e.status == 200) {
                    setData(e?.data);
                    let tmpTotalPrice = 0;
                    e?.data?.data?.map((e2) => {
                        if (e2.medicine.active == 1) {
                            tmpTotalPrice += e2?.unit?.price * e2?.quantity;
                        }
                    });
                    setTotalPrice(convertNumberToPrice(tmpTotalPrice));
                }
            },
            (e) => {
                navigate('/server_error');
            },
        );
    }, []);

    function outOfStock() {
        return (
            <div>
                <div>
                    <div className="mb-3 flex items-center text-orange-400 text-xs">Sản phẩm đang tạm hết hàng</div>
                </div>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    display: 'absolute',
                    backgroundColor: '#003366',
                    color: 'blue',
                    left: '0%',
                    borderRadius: '100%',
                    padding: 0,
                    margin: 0,
                    paddingTop: '1px',
                    paddingRight: '21px',
                    zIndex: 1,
                }}
                onClick={onClick}
            />
        );
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    display: 'absolute',
                    backgroundColor: '#003366',
                    color: 'blue',
                    right: '0%',
                    borderRadius: '100%',
                    border: 'none',
                    paddingTop: '1px',
                    paddingRight: '21px',
                    margin: 0,
                }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    function setCheckAllCartItem() {
        let tmpTotalPrice = 0;
        if (checkAll) {
            tmpTotalPrice = 0;
        } else {
            data?.data?.map((e) => {
                tmpTotalPrice += convertPriceToNumber(e?.unit?.price) * e?.quantity;
            });
        }
        setTotalPrice(convertNumberToPrice(tmpTotalPrice));
        setCheckAll(!checkAll);
    }

    return (
        <div className="bg-[rgb(237,240,243)] py-5" id="num">
            <div className="w-full sm:flex flex-wrap justify-evenly max-sm:justify-start ">
                {/* <CartEmpty></CartEmpty> */}
                <div className="px-1 pb-3 rounded-xl">
                    <div className="mb-5 sm:mr-3 px-3 flex items-center justify-between px-4 bg-contain bg-[url(https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fbg-voucher.png?alt=media&token=24592f56-63b9-4e23-8006-a639ca5b8028)]">
                        <div className="flex items-center">
                            <img
                                width={40}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fvoucher.png?alt=media&token=44249f28-5df6-435f-81a5-1f7544564e19"
                            ></img>
                            <p className="text-[#1250dc] text-[14px] flex flex-wrap">
                                <span className="mr-1 font-semibold">Khuyến mại </span>
                                <span>dành riêng cho bạn</span>
                            </p>
                        </div>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                document.body.style.overflow = 'hidden';

                                setShowVouchers(true);
                            }}
                        >
                            <span className="whitespace-nowrap text-[#1250dc] bg-[#eaeffa] text-[14px] font-[500] tracking-[.01em] rounded-full py-1 px-5">
                                Chọn ngay
                            </span>
                            <span className="text-[#728091] max-sm:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="bg-white sm:mr-3 px-3 rounded-xl ">
                        <div>
                            <div className="flex items-center">
                                <div className="flex text-sm my-3 w-80 font-[500]">
                                    <span
                                        onClick={setCheckAllCartItem}
                                        className={`rounded-full p-1 mr-3 w-5 h-5 flex items-center justify-center text-white cursor-pointer ${
                                            checkAll ? 'bg-sky-700 border border-sky-700' : 'border border-black'
                                        }`}
                                    >
                                        {checkAll ? <i className="fa-solid fa-check"></i> : null}
                                    </span>
                                    Chọn tất cả (3)
                                </div>
                                <div className="text-sm w-36 text-center max-sm:hidden font-[500]">Giá thành</div>
                                <div className="text-sm w-20 text-center max-sm:hidden font-[500]">Số lượng</div>
                                <div className="text-sm w-32 text-center max-sm:hidden font-[500]">Đơn vị</div>
                            </div>
                        </div>
                        <div>
                            {data?.data?.map((e, i) => {
                                return e?.medicine?.active == 0 ? (
                                    <div key={i}>
                                        <CartItem
                                            key={i}
                                            checkAll={checkAll}
                                            data={e}
                                            totalPrice={totalPrice}
                                            setTotalPrice={setTotalPrice}
                                        ></CartItem>
                                        {outOfStock()}
                                    </div>
                                ) : (
                                    <CartItem
                                        key={i}
                                        checkAll={checkAll}
                                        data={e}
                                        totalPrice={totalPrice}
                                        setTotalPrice={setTotalPrice}
                                    ></CartItem>
                                );
                            })}
                        </div>
                    </div>
                    <div className="sm:w-[700px] my-3">
                        <h2 className="font-[500] tracking-[.0025em] text-[#020b27] text-[18px]">Sản phẩm vừa xem</h2>
                        <Slider {...settings} className="m-0 p-0 relative">
                            {Array.from({ length: 6 }, (v, i) => (
                                <div key={i} className="">
                                    <div className="max-sm:px-1 sm:px-3 py-5">
                                        <ProductSeller
                                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00500184-sua-nutren-junior-nestle-health-science-hop-850g-2256-62a8_large.jpg"
                                            name="Sữa bột Nestlé Nutren Junior hỗ trợ hệ tiêu hóa giúp trẻ hấp thu dinh dưỡng (850g)"
                                            newPrice="591.000đ"
                                            unit="Hộp"
                                            oldPrice=""
                                            backgroundColor="bg-white"
                                            py="sm:py-5 max-sm:py-4"
                                            px="max-sm:px-2 sm:px-5"
                                            borderRadius="rounded-xl"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="sticky h-fit top-0 flex z-20">
                    <div className="z-10 w-96 border-2 bottom-0 bg-white h-fit py-4 px-3 sm:rounded-3xl max-sm:rounded-t-3xl max-sm:w-screen max-sm:fixed">
                        <div className={`${showModal ? 'block' : 'hidden'} sm:block sm:text-[16px] max-sm:text-sm`}>
                            <div className="flex justify-between my-2">
                                <h5 className="text-slate-600">Tổng tiền</h5>
                                <h5>{totalPrice}đ</h5>
                            </div>
                            <div className="flex justify-between my-2">
                                <h5 className="text-slate-600">Giảm giá trực tiếp</h5>
                                <h5>0đ</h5>
                            </div>
                            <div className="flex justify-between my-2">
                                <h5 className="text-slate-600">Giảm giá voucher</h5>
                                <h5>824.400đ</h5>
                            </div>
                            <div className="flex justify-between my-2">
                                <h5 className="text-slate-600">Tiết kiệm được</h5>
                                <h5>0đ</h5>
                            </div>
                        </div>
                        <div className="max-sm:flex justify-between items-center">
                            <div className="flex max-sm:flex-col justify-between sm:border-t mt-3 py-3">
                                <h4 className="text-[16px] font-semibold">Tạm tính</h4>
                                <h4
                                    className="text-[20px] text-[#1250dc] font-[600] tracking-[.005em] flex items-center"
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    818.000đ
                                    <span
                                        className={`sm:hidden ml-2 duration-300 ${
                                            showModal ? 'rotate-180' : 'rotate-0'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="black"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                            />
                                        </svg>
                                    </span>
                                </h4>
                            </div>
                            <button className="w-full max-sm:w-5/12 max-sm:py-4 sm:py-2 rounded-3xl h-fit text-center bg-sky-600 text-white text-sm cursor-pointer ">
                                Đặt hàng (2)
                            </button>
                        </div>
                        <div className="text-center mt-4 max-sm:hidden">
                            <h6 className="text-xs text-[#020b27] font-[400px]">Nếu tiến hành đặt hàng, bạn đồng ý</h6>
                            <h6 className="mt-3 decoration-solid cursor-pointer text-xs font-semibold underline text-slate-600">
                                Điều khoản của nhà thuốc
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`w-screen h-screen absolute bg-black opacity-50 top-0 z-40 ${
                    showVouchers ? 'block' : 'hidden'
                }`}
            ></div>
            <div
                ref={voucherRef}
                id="test"
                className={`opacity-100	z-40 absolute right-0 top-0 bg-white h-full max-sm:w-full ${
                    showVouchers ? 'block' : 'hidden'
                }`}
            >
                <div className="opacity-100 flex justify-between items-center text-2xl font-[500] p-5">
                    <p className="">Khuyến mại tặng bạn</p>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            document.body.style.overflow = 'scroll';
                            setShowVouchers(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="bg-[#edf0f3] py-3 h-screen z-50 border-4">
                    <p className="text-[#4a4f63] font-[600] px-5">Khuyến mại đơn hàng</p>
                    <div className="h-3/4 overflow-auto px-5">
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                        <Voucher></Voucher>
                    </div>
                    <div className="h-1/5 pb-10 w-full bg-white flex items-center rounded-2xl">
                        <p className="py-3 mx-5 w-full rounded-3xl h-fit text-center bg-sky-600 text-white text-sm cursor-pointer ">
                            Về giỏ hàng
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
