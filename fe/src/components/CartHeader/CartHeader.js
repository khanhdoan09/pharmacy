import { useSelector } from 'react-redux';
import ItemCartHeader from './ItemCartHeader';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAcquireAccessToken from '~/hooks/useAcquireAcessToken';
import { getAllMedicinesInCart } from '~/services/cartServices';
import { useDispatch } from 'react-redux';
import { addMedicinesToCart, removeMedicinesFromCart, unShowCartInHeader } from '~/redux/cartSlice';

function CartHeader() {
    const cart = useSelector((state) => state.cart.medicines);
    const user = useSelector((state) => state.authentication.login.currentUser);
    const [totalMedicine, setTotalMedicine] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [medicineInCart, setMedicineInCart] = useState(cart?.medicines);
    const navigate = useNavigate();
    const getNewAccessToken = useAcquireAccessToken();
    const dispatch = useDispatch();
    const isShowCart = useSelector((state) => state.cart?.showCart);

    useEffect(() => {
        dispatch(unShowCartInHeader());
        const load = getAllMedicinesInCart(user?.accessToken, user?.account);
        load.then(
            (e) => {
                if (e.status == 200) {
                    setTotalMedicine(e?.data?.data?.length);
                    dispatch(addMedicinesToCart({ medicines: e?.data?.data }));
                }
            },
            (err) => {
                if (err?.status === 401) {
                    getNewAccessToken();
                } else if (err?.status === 403) {
                    navigate('/signIn');
                } else if (err?.status === 404) {
                } else {
                    console.log(err);
                    navigate('/server_error');
                }
            },
        );
    }, []);

    useEffect(() => {
        // dispatch(removeMedicinesFromCart());
        setMedicineInCart(cart?.medicines);
        setTotalMedicine(cart?.medicines?.length);
        setShowCart(isShowCart);
    }, [useSelector((state) => state.cart)]);

    return (
        <div
            onMouseEnter={() => {
                setShowCart(true);
            }}
            onMouseLeave={() => {
                dispatch(unShowCartInHeader());
                setShowCart(false);
            }}
            className={`cart relative relative flex items-center `}
        >
            <span className="absolute top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f59e0b] text-center text-[10px]">
                {totalMedicine}
            </span>
            {showCart ? (
                <div className="absolute right-[3px] top-full z-[10000] w-[383px] rounded-lg border border-2 bg-white p-5">
                    <div className=" w-full rounded-lg bg-white">
                        <div>
                            <p className="text-[0.875rem] font-[600] text-[#657384]">Giỏ hàng</p>
                            <div className="my-3">
                                {medicineInCart?.map((e, i) => {
                                    return (
                                        <ItemCartHeader
                                            key={i}
                                            medicine={e?.medicine}
                                            unit={e?.unit}
                                            quantity={e?.quantity}
                                            id={e?.id}
                                            setTotalMedicine={setTotalMedicine}
                                            totalMedicine={totalMedicine}
                                            setMedicineInCart={setMedicineInCart}
                                        ></ItemCartHeader>
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[12px] font-bold text-[#657384]">{totalMedicine} sản phẩm</span>
                                <a
                                    href="/cart"
                                    className="h-[36px] rounded-lg bg-[#306de4] py-[8px] px-[12px] text-[0.875rem] font-[500]"
                                >
                                    Xem giỏ hàng
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <NavLink to="/cart">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-10 w-10 "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>
            </NavLink>
        </div>
    );
}

export default CartHeader;
