import { useEffect, useState } from 'react';
import CheckoutItem from '~/components/CheckoutItem/CheckoutItem';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { convertNumberToPrice } from '~/utils/currency';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { addNewOrder, getRewardPointById } from '~/services/orderServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { removeAddress } from '~/redux/addressSlice';
import { removeMedicinesFromCart } from '~/redux/cartSlice';
import { getCurrentExchangeRate } from '~/services/paymentServices';

function Payment() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.authentication.login.currentUser);
    const cart = useSelector((state) => state.cart?.medicines);
    const address = useSelector((state) => state.address?.detail);
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);
    const [moneySaved, setMoneySaved] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(23000);
    const [rewardPoint, setRewardPoint] = useState(100);
    const [isUseRewardPoint, setIsUseRewardPoint] = useState(false);
    const [renderRewardPoint, setRenderRewardPoint] = useState(0);
    const voucher = useSelector((state) => state.voucher?.items);
    const [totalPriceByVoucher, setTotalPriceByVoucher] = useState(0);

    useEffect(() => {
        getRewardPointById(user?.accessToken, user?.account, user?.email).then(
            (e) => {
                if (e?.status == 200) {
                    setRewardPoint(e?.data);
                } else {
                    navigate('server-error');
                }
            },
            (err) => {
                console.log(err);
                navigate('server-error');
            },
        );
    }, []);

    useEffect(() => {
        if (user == null) {
            navigate('/sign-in');
        } else {
            let totalPriceTmp = 0;
            let totalPriceWithDiscountTmp = 0;
            let tmpTotalPriceByVoucher = 0;
            cart?.medicines?.forEach((e) => {
                totalPriceTmp = e?.quantity * e?.unit?.price + totalPriceTmp;
                totalPriceWithDiscountTmp +=
                    (e?.unit?.price - (e?.unit?.price * e?.medicine?.discount) / 100) * e?.quantity;
            });
            voucher?.items?.forEach((e) => {
                tmpTotalPriceByVoucher += e?.discount;
            });
            setTotalPriceByVoucher((totalPriceWithDiscountTmp * tmpTotalPriceByVoucher) / 100);
            setTotalPrice(totalPriceTmp);
            setTotalPriceWithDiscount(totalPriceWithDiscountTmp);

            setMoneySaved(
                totalPriceTmp -
                    (totalPriceWithDiscountTmp + (totalPriceWithDiscountTmp * tmpTotalPriceByVoucher) / 100),
            );
            getCurrentExchangeRate().then((e) => setExchangeRate(e));
        }
    }, []);
    const dispatch = useDispatch();

    return (
        user && (
            <div className="bg-[rgb(237,240,243)] py-5">
                <div className="w-full justify-between sm:mx-14 sm:flex">
                    <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                        Chọn địa chỉ giao hàng
                    </p>
                </div>
                <div className="w-full">
                    <div className="justify-between sm:mx-14 sm:flex">
                        <div className="">
                            <div className="rounded-xl bg-white px-3 py-5">
                                <div className="flex items-center">
                                    <span>
                                        <img
                                            width={25}
                                            src="https://nhathuoclongchau.com.vn/estore-images/user.png"
                                        ></img>
                                    </span>
                                    <button
                                        onClick={() => {
                                            const listOrderDetail = cart?.medicines.map((e) => {
                                                return {
                                                    cartId: e?.id,
                                                    quantity: e?.quantity,
                                                    unitId: e?.unit?.id,
                                                    unit: e?.unit?.name,
                                                    price: e?.unit?.price,
                                                    medicineId: e?.medicine?.id,
                                                };
                                            });
                                            const newOrder = {
                                                id: 10,
                                                email: user?.email,
                                                totalPayment: totalPrice,
                                                paymentMethod: 'paypal',
                                                address: `${address?.city} / ${address?.district} / ${address?.ward} / ${address?.detailAddress}`,
                                                message: address?.message,
                                                addressee: address?.name,
                                                phoneNumber: address?.phoneNumber,
                                            };
                                            console.log(newOrder);
                                            console.log(listOrderDetail);
                                            const load = addNewOrder(
                                                user?.accessToken,
                                                user?.account,
                                                newOrder,
                                                listOrderDetail,
                                            );
                                            load.then((e) => {
                                                console.log(e);
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                        }}
                                    >
                                        123233
                                    </button>
                                    <span className="ml-3 text-sm font-[500] leading-[2rem] text-[#020b27]">
                                        Thông tin người nhận
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-wrap justify-between">
                                    <div className="max-sm:w-full sm:w-[49%]">
                                        <p>{address?.name}</p>
                                    </div>
                                    <div className="max-sm:w-full sm:w-[49%]">
                                        <p>{address?.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="my-5 flex w-full items-center border-t pt-3">
                                    <span>
                                        <img
                                            width={25}
                                            src="https://nhathuoclongchau.com.vn/estore-images/pin.png"
                                        ></img>
                                    </span>
                                    <span className="ml-3 text-sm font-[500] leading-[2rem] text-[#020b27]">
                                        Địa chỉ nhận hàng
                                    </span>
                                </div>
                                <div className="mb-1">
                                    <span className="flex">
                                        {address?.city} / {address?.district} / {address?.ward} /{' '}
                                        {address?.detailAddress}
                                    </span>
                                </div>
                            </div>
                            <div className="my-3 mt-2 block rounded-lg border bg-white py-5 px-3">
                                <div className="flex justify-between bg-[rgb(255,243,225)] p-1 text-[13px]">
                                    <div>
                                        <span className="flex items-center">
                                            <span className="mx-2">
                                                <i className="fa-solid fa-tag"></i>
                                            </span>
                                            <span className="font-medium">Khuyến mại</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="mx-2 mt-3">
                                    {voucher?.items?.map((e, i) => {
                                        return (
                                            <div className={i === 0 ? null : 'border-t'} key={i}>
                                                <div className="flex items-center py-2">
                                                    <span className="rounded border p-1">
                                                        <img
                                                            src="https://s3-sgn09.fptcloud.com/lc-public/web-lc/default/promotion_used.webp"
                                                            width="30"
                                                            height="30"
                                                            className="transparent"
                                                        />
                                                    </span>
                                                    <span className="mx-2 text-[14px]">
                                                        {e?.name} với {e?.discount}%
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                                Danh sách sản phẩm ({cart?.medicines?.length})
                            </p>
                            <div className="rounded-xl bg-white px-3 py-5">
                                {cart?.medicines?.map((e, i) => {
                                    return (
                                        <div key={i} className={i === 0 ? null : 'border-t'}>
                                            <CheckoutItem
                                                avatar={e?.medicine?.avatar}
                                                medicine={e?.medicine}
                                                quantity={e?.quantity}
                                                unit={e?.unit}
                                            ></CheckoutItem>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                                Hình thức thanh toán
                            </p>
                            <div className="rounded-xl bg-white px-3 py-4">
                                <div className="flex items-center">
                                    <PaymentMethodItem
                                        urlImg={
                                            'https://static.vecteezy.com/system/resources/thumbnails/009/469/637/small/paypal-payment-icon-editorial-logo-free-vector.jpg'
                                        }
                                        name={'Thanh toán bằng paypal'}
                                    ></PaymentMethodItem>
                                </div>
                            </div>
                        </div>
                        <div className="sticky top-0 mx-2 flex h-fit">
                            <div className="left-0 bottom-0 z-10 h-fit border-2 bg-white py-4 px-3 max-sm:fixed max-sm:w-screen max-sm:rounded-t-3xl sm:w-96 sm:rounded-3xl">
                                <div className={`${showModal ? 'block' : 'hidden'} sm:block`}>
                                    <div className="my-2 flex justify-between">
                                        <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Tổng tiền</h5>
                                        <h5 className="max-sm:text-sm sm:text-[15px]">
                                            {convertNumberToPrice(totalPrice)}đ
                                        </h5>
                                    </div>
                                    <div className="my-2 flex justify-between">
                                        <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">
                                            Giảm giá trực tiếp
                                        </h5>
                                        <h5 className="max-sm:text-sm sm:text-[15px]">
                                            {convertNumberToPrice(totalPrice - totalPriceWithDiscount)}đ
                                        </h5>
                                    </div>
                                    <div className="my-2 flex justify-between">
                                        <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">
                                            Giảm giá voucher
                                        </h5>
                                        <h5 className="max-sm:text-sm sm:text-[15px]">
                                            {convertNumberToPrice(totalPriceByVoucher)}đ
                                        </h5>
                                    </div>
                                    {rewardPoint > 5 && totalPrice - totalPriceWithDiscount > 100 ? (
                                        <div className="my-2 flex justify-between">
                                            <h5 className="relative text-slate-600 max-sm:text-sm sm:text-[15px]">
                                                Giảm giá điểm thưởng
                                                <span
                                                    onClick={() => {
                                                        setIsUseRewardPoint(!isUseRewardPoint);
                                                        if (isUseRewardPoint) {
                                                            setRenderRewardPoint(0);
                                                            setMoneySaved(moneySaved - (totalPrice * 3) / 100);
                                                        } else {
                                                            setRenderRewardPoint((totalPrice * 5) / 100);
                                                            setMoneySaved((totalPrice * 3) / 100 + moneySaved);
                                                        }
                                                    }}
                                                    className="absolute mx-1"
                                                    data-tooltip-target="tooltip-dark"
                                                >
                                                    <input
                                                        className="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                    />
                                                </span>
                                            </h5>
                                            <h5 className="max-sm:text-sm sm:text-[15px]">
                                                {convertNumberToPrice(renderRewardPoint)}đ
                                            </h5>
                                        </div>
                                    ) : null}
                                    <div className="my-2 flex justify-between">
                                        <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Tiết kiệm được</h5>
                                        <h5 className="max-sm:text-sm sm:text-[15px]">
                                            {convertNumberToPrice(moneySaved)}đ
                                        </h5>
                                    </div>
                                    <div className="mt-3 flex justify-between border-t py-2">
                                        <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Phí vận chuyển</h5>
                                        <h5 className="text-green-600 max-sm:text-sm sm:text-[15px]	">Miễn phí</h5>
                                    </div>
                                    {/* <div className="max-sm:block sm:hidden">
                                    <p className="m-3">{address?.message}</p>
                                </div> */}
                                </div>
                                <div className="items-center justify-between max-sm:flex sm:border-t">
                                    <div className="mt-2 flex justify-between py-3 max-sm:flex-col">
                                        <h4 className="text-ms font-semibold">Thành tiền</h4>
                                        <h4
                                            className="flex items-center text-base font-bold text-blue-700 "
                                            onClick={() => setShowModal(!showModal)}
                                        >
                                            {convertNumberToPrice(totalPrice - moneySaved)}đ
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
                                    {/* <div className="border-2max-sm:hidden h-full border p-0 sm:block">
                                    <p className="m-3">{address?.message}</p>
                                </div> */}
                                    <div className="my-3">
                                        <PayPalButton
                                            options={{
                                                clientId:
                                                    'Afdbi9dJnb8U9adDYpRVpmQRC3JlS7UfxmP4-6Dso53q62xyRv9rnkQotycHduKsl_wpWRX0yCgGVTiO',
                                                currency: 'USD',
                                            }}
                                            shippingPreference="NO_SHIPPING"
                                            amount={Math.ceil(totalPrice / exchangeRate)}
                                            onSuccess={(details, data) => {
                                                if (details?.status === 'COMPLETED') {
                                                    const listOrderDetail = cart?.medicines.map((e) => {
                                                        return {
                                                            quantity: e?.quantity,
                                                            unitId: e?.unit?.id,
                                                            unit: e?.unit?.name,
                                                            price: e?.unit?.price,
                                                            medicineId: e?.medicine?.id,
                                                            cartId: e?.id,
                                                        };
                                                    });
                                                    const newOrder = {
                                                        id: 10,
                                                        email: user?.email,
                                                        totalPayment: totalPrice - moneySaved,
                                                        paymentMethod: 'paypal',
                                                        address: `${address?.city} / ${address?.district} / ${address?.ward} / ${address?.detailAddress}`,
                                                        message: address?.message,
                                                        addressee: address?.name,
                                                        phoneNumber: address?.phoneNumber,
                                                    };
                                                    console.log(newOrder);
                                                    console.log(listOrderDetail);
                                                    addNewOrder(
                                                        user?.accessToken,
                                                        user?.account,
                                                        newOrder,
                                                        listOrderDetail,
                                                    )
                                                        .then(() => {
                                                            dispatch(removeAddress());
                                                            dispatch(removeMedicinesFromCart());
                                                            navigate('/');
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                            navigate('server-error');
                                                        });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-center max-sm:hidden">
                                    <h6 className="text-xs text-slate-400">Nếu tiến hành đặt hàng, bạn đồng ý</h6>
                                    <h6 className="text-xs	font-semibold text-slate-600 underline decoration-solid">
                                        Điều khoản của nhà thuốc
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Payment;
