import { useEffect, useState } from 'react';
import CheckoutItem from '~/components/CheckoutItem/CheckoutItem';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { convertNumberToPrice } from '~/utils/currency';
import PaymentMethodItem from '~/components/PaymentMethodItem/PaymentMethodItem';
import { addNewOrder } from '~/services/orderServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { removeAddress } from '~/redux/addressSlice';
import { removeMedicinesFromCart } from '~/redux/cartSlice';
import { getCurrentExchangeRate } from '~/services/paymentServices';

function Payment() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.authentication.login.currentUser);
    const cart = useSelector((state) => state.cart.medicines);
    const address = useSelector((state) => state.address?.detail);
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(undefined);

    const [totalPrice, setTotalPrice] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(23000);

    useEffect(() => {
        let totalPriceTmp = 0;
        cart?.forEach((e) => (totalPriceTmp = e?.quantity * e?.unit?.price + totalPriceTmp));
        setTotalPrice(totalPriceTmp);
        getCurrentExchangeRate().then((e) => setExchangeRate(e));
    }, []);
    const dispatch = useDispatch();

    return (
        <div className="bg-[rgb(237,240,243)] py-5">
            <div className="w-full justify-between sm:mx-14 sm:flex">
                <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">Chọn địa chỉ giao hàng</p>
            </div>
            <div className="w-full">
                <div className="justify-between sm:mx-14 sm:flex">
                    <div className="">
                        <div className="rounded-xl bg-white px-3 py-5">
                            <div className="flex items-center">
                                <span>
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/user.png"></img>
                                </span>
                                <button
                                    onClick={() => {
                                        const listOrderDetail = cart.map((e) => {
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
                                            userId: 2,
                                            totalPayment: totalPrice,
                                            createDate: '01/01/2000',
                                            paymentMethod: 'paypal',
                                            address: `${address?.city} / ${address?.district} / ${address?.ward} / ${address?.detailAddress}`,
                                            message: address?.message,
                                            addressee: address?.name,
                                            phoneNumber: address?.phoneNumber,
                                        };
                                        const load = addNewOrder(newOrder, listOrderDetail);
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
                                    <img width={25} src="https://nhathuoclongchau.com.vn/estore-images/pin.png"></img>
                                </span>
                                <span className="ml-3 text-sm font-[500] leading-[2rem] text-[#020b27]">
                                    Địa chỉ nhận hàng
                                </span>
                            </div>
                            <div className="mb-1">
                                <span className="flex">
                                    {address?.city} / {address?.district} / {address?.ward} / {address?.detailAddress}
                                </span>
                            </div>
                        </div>
                        <p className="my-3 text-[1.1rem] font-[500] leading-[2rem] text-[#020b27]">
                            Danh sách sản phẩm (3)
                        </p>
                        <div className="rounded-xl bg-white px-3 py-5">
                            {cart.map((e, i) => {
                                return (
                                    <div key={i} className={i === 0 ? null : 'border-t'}>
                                        <CheckoutItem
                                            avatar={e?.avatar}
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
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Giảm giá trực tiếp</h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">0đ</h5>
                                </div>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">
                                        Giảm giá điểm thưởng
                                    </h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">824.400đ</h5>
                                </div>
                                <div className="my-2 flex justify-between">
                                    <h5 className="text-slate-600 max-sm:text-sm sm:text-[15px]">Tiết kiệm được</h5>
                                    <h5 className="max-sm:text-sm sm:text-[15px]">0đ</h5>
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
                                        {convertNumberToPrice(totalPrice)} đ
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
                                                const listOrderDetail = cart.map((e) => {
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
                                                    userId: 2,
                                                    totalPayment: totalPrice,
                                                    createDate: '01/01/2000',
                                                    paymentMethod: 'paypal',
                                                    address: `${address?.city} / ${address?.district} / ${address?.ward} / ${address?.detailAddress}`,
                                                    message: address?.message,
                                                    addressee: address?.name,
                                                    phoneNumber: address?.phoneNumber,
                                                };
                                                addNewOrder(newOrder, listOrderDetail)
                                                    .then(() => {
                                                        dispatch(removeAddress());
                                                        dispatch(removeMedicinesFromCart());
                                                        navigate('/');
                                                    })
                                                    .catch(() => {
                                                        navigate('/server_error');
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
    );
}

export default Payment;
