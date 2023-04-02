import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import Slider from 'react-slick';
import ProductSeller from '~/components/ProductSeller';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Voucher from '~/components/Voucher';
import { useNavigate } from 'react-router-dom';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';
import { getAllVouchersByToDay } from '~/services/voucherServices';
import { getAllMedicinesInCart } from '~/services/cartService';

function Cart() {
    const voucherRef = useRef();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [showVouchers, setShowVouchers] = useState(false);
    const [vouchers, setVouchers] = useState(false);
    const [data, setData] = useState({});
    const [checklist, setChecklist] = useState(0);
    const [cartChecked, setCartChecked] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.authentication.login.currentUser);
    useEffect(() => {
        if (user == null) {
            navigate('/signIn');
        } else {
            const load = getAllMedicinesInCart(user?.accessToken, user?.account);
            load.then(
                (e) => {
                    if (e.status == 200) {
                        setData(e?.data);
                        let tmpTotalPrice = 0;
                        let num = 0;
                        e?.data?.data?.map((e2) => {
                            if (e2.medicine.active == 1) {
                                tmpTotalPrice += e2?.unit?.price * e2?.quantity;
                                num += 1;
                                cartChecked.push(e2?.id);
                            }
                        });
                        setChecklist(num);
                        setTotalPrice(convertNumberToPrice(tmpTotalPrice));
                    }
                },
                (err) => {
                    if (err?.status === 403 || err?.status === 401) {
                        navigate('/signIn');
                    } else {
                        navigate('/server_error');
                    }
                },
            );
        }
    }, []);

    function outOfStock() {
        return (
            <div className="pb-2">
                <div className="flex items-center text-xs text-orange-400">Sản phẩm đang tạm hết hàng</div>
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
        if (checkAll) {
            setChecklist(0);
            setCartChecked([]);
        } else {
            let num = 0;
            let list = [];
            data?.data?.map((e) => {
                if (e.medicine.active == 1) {
                    num += 1;
                    list.push(e?.id);
                }
            });
            setChecklist(num);
            setCartChecked(list);
        }
        setCheckAll(!checkAll);
    }

    function handleSubmit() {
        let params = '';
        cartChecked?.map((e) => {
            params += 'id=' + e + '&';
        });
        params = params.substring(0, params.length - 1);
        navigate('/order?' + params);
    }

    return (
        <div className="bg-[rgb(237,240,243)] py-5" id="num">
            <div
                className={`absolute left-[45%] top-[35%] z-50 rounded-xl bg-[#edf0f3] p-5 ${
                    showLoading ? 'block' : 'hidden'
                }`}
            >
                <span className="flex w-full items-center justify-center ">
                    <svg className="h-16 w-16 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            className="opacity-40"
                            cx={'12'}
                            cy={'12'}
                            r="10"
                            stroke="#454545"
                            strokeWidth={'2'}
                        ></circle>
                        <path
                            fill="#FFFFFF"
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </span>
                <p className="mt-3">Đang cập nhật giỏ hàng</p>
            </div>
            <div className="w-full flex-wrap justify-evenly max-sm:justify-start sm:flex ">
                {/* <CartEmpty></CartEmpty> */}
                <div className="rounded-xl px-1 pb-3">
                    <div className="mb-5 flex items-center justify-between bg-[url(https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fbg-voucher.png?alt=media&token=24592f56-63b9-4e23-8006-a639ca5b8028)] bg-contain px-3 px-4 sm:mr-3">
                        <div className="flex items-center">
                            <img
                                width={40}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fvoucher.png?alt=media&token=44249f28-5df6-435f-81a5-1f7544564e19"
                            ></img>
                            <p className="flex flex-wrap text-[14px] text-[#1250dc]">
                                <span className="mr-1 font-semibold">Khuyến mại </span>
                                <span>dành riêng cho bạn</span>
                            </p>
                        </div>
                        <div
                            className="flex cursor-pointer items-center"
                            onClick={() => {
                                document.body.style.overflow = 'hidden';
                                let dateObj = new Date();
                                let month = dateObj.getUTCMonth() + 1;
                                let day = dateObj.getUTCDate();
                                let year = dateObj.getUTCFullYear();
                                let toDay = year + '-' + month + '-' + day;
                                getAllVouchersByToDay(toDay).then(
                                    (e) => {
                                        setVouchers(e?.data);
                                        setShowVouchers(true);
                                    },
                                    () => {
                                        navigate('/server_error');
                                    },
                                );
                            }}
                        >
                            <span className="whitespace-nowrap rounded-full bg-[#eaeffa] py-1 px-5 text-[14px] font-[500] tracking-[.01em] text-[#1250dc]">
                                Chọn ngay
                            </span>
                            <span className="text-[#728091] max-sm:hidden">
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
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white px-3 sm:mr-3 ">
                        <div>
                            <div className="flex items-center">
                                <div className="my-3 flex w-80 text-sm font-[500]">
                                    <span
                                        onClick={setCheckAllCartItem}
                                        className={`mr-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-1 text-white ${
                                            checkAll ? 'border border-sky-700 bg-sky-700' : 'border border-black'
                                        }`}
                                    >
                                        {checkAll ? <i className="fa-solid fa-check"></i> : null}
                                    </span>
                                    Chọn tất cả (3)
                                </div>
                                <div className="w-36 text-center text-sm font-[500] max-sm:hidden">Giá thành</div>
                                <div className="w-20 text-center text-sm font-[500] max-sm:hidden">Số lượng</div>
                                <div className="w-32 text-center text-sm font-[500] max-sm:hidden">Đơn vị</div>
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
                                            checklist={checklist}
                                            setChecklist={setChecklist}
                                            cartChecked={cartChecked}
                                            setCartChecked={setCartChecked}
                                            setShowLoading={setShowLoading}
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
                                        checklist={checklist}
                                        setChecklist={setChecklist}
                                        cartChecked={cartChecked}
                                        setCartChecked={setCartChecked}
                                        setShowLoading={setShowLoading}
                                    ></CartItem>
                                );
                            })}
                        </div>
                    </div>
                    <div className="my-3 sm:w-[700px]">
                        <h2 className="text-[18px] font-[500] tracking-[.0025em] text-[#020b27]">Sản phẩm vừa xem</h2>
                        <Slider {...settings} className="relative m-0 p-0">
                            {Array.from({ length: 6 }, (v, i) => (
                                <div key={i} className="">
                                    <div className="py-5 max-sm:px-1 sm:px-3">
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
                <div className="sticky top-0 z-20 flex h-fit">
                    <div className="bottom-0 z-10 h-fit w-96 border-2 bg-white py-4 px-3 max-sm:fixed max-sm:w-screen max-sm:rounded-t-3xl sm:rounded-3xl">
                        <div className={`${showModal ? 'block' : 'hidden'} max-sm:text-sm sm:block sm:text-[16px]`}>
                            <div className="my-2 flex justify-between">
                                <h5 className="text-slate-600">Tổng tiền</h5>
                                <h5>{totalPrice}đ</h5>
                            </div>
                            <div className="my-2 flex justify-between">
                                <h5 className="text-slate-600">Giảm giá trực tiếp</h5>
                                <h5>0đ</h5>
                            </div>
                            <div className="my-2 flex justify-between">
                                <h5 className="text-slate-600">Giảm giá voucher</h5>
                                <h5>824.400đ</h5>
                            </div>
                            <div className="my-2 flex justify-between">
                                <h5 className="text-slate-600">Tiết kiệm được</h5>
                                <h5>0đ</h5>
                            </div>
                        </div>
                        <div className="items-center justify-between max-sm:flex">
                            <div className="mt-3 flex justify-between py-3 max-sm:flex-col sm:border-t">
                                <h4 className="text-[16px] font-semibold">Tạm tính</h4>
                                <h4
                                    className="flex items-center text-[20px] font-[600] tracking-[.005em] text-[#1250dc]"
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    818.000đ
                                    <span
                                        className={`ml-2 duration-300 sm:hidden ${
                                            showModal ? 'rotate-180' : 'rotate-0'
                                        }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="black"
                                            className="h-5 w-5"
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
                            <button
                                onClick={handleSubmit}
                                className="h-fit w-full cursor-pointer rounded-3xl bg-sky-600 text-center text-sm text-white max-sm:w-5/12 max-sm:py-4 sm:py-2 "
                            >
                                Đặt hàng ({checklist})
                            </button>
                        </div>
                        <div className="mt-4 text-center max-sm:hidden">
                            <h6 className="text-xs font-[400px] text-[#020b27]">Nếu tiến hành đặt hàng, bạn đồng ý</h6>
                            <h6 className="mt-3 cursor-pointer text-xs font-semibold text-slate-600 underline decoration-solid">
                                Điều khoản của nhà thuốc
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-0 z-40 h-screen w-screen bg-black opacity-50 ${
                    showVouchers || showLoading ? 'block' : 'hidden'
                }`}
            ></div>
            <div
                ref={voucherRef}
                className={`absolute	right-0 top-0 z-40 h-full bg-white opacity-100 max-sm:w-full ${
                    showVouchers ? 'block' : 'hidden'
                }`}
            >
                <div className="flex items-center justify-between p-5 text-2xl font-[500] opacity-100">
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
                            className="h-8 w-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="z-50 h-screen border-4 bg-[#edf0f3] py-3">
                    <p className="px-5 font-[600] text-[#4a4f63]">Khuyến mại đơn hàng</p>
                    <div className="h-3/4 overflow-auto px-5">
                        {vouchers?.data?.map((e, i) => {
                            return <Voucher key={i} name={e?.name}></Voucher>;
                        })}
                    </div>
                    <div className="flex h-1/5 w-full items-center rounded-2xl bg-white pb-10">
                        <p
                            onClick={() => {
                                document.body.style.overflow = 'scroll';
                                setShowVouchers(false);
                            }}
                            className="mx-5 h-fit w-full cursor-pointer rounded-3xl bg-sky-600 py-3 text-center text-sm text-white "
                        >
                            Về giỏ hàng
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
