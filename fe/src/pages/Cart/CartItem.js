import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMedicinesToCart } from '~/redux/cartSlice';
import { deleteAMedicineInCart, updateMedicineQuantityInCart, updateUnitMedicineInCart } from '~/services/cartServices';
import { getAllUnitsInAMedicine } from '~/services/unitServices';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';
import { getImageFromFirebase } from '~/utils/firebase';

function CartItem({
    checkAll,
    data,
    totalPrice,
    setTotalPrice,
    checklist,
    setChecklist,
    cartChecked,
    setCartChecked,
    setShowLoading,
    discount,
    totalPriceWithoutDiscount,
    setTotalPriceWithoutDiscount,
}) {
    const [price, setPrice] = useState((data?.unit?.price - (data?.unit?.price * discount) / 100) * data?.quantity);
    const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(data?.unit?.price * data?.quantity);
    const [quantity, setQuantity] = useState(data?.quantity);
    const [check, setCheck] = useState(data?.medicine?.active == 1);
    const [showUnit, setShowUnit] = useState(false);
    const [image, setImage] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBWOxDZ6-zuaW-Bp6x8aw3FNAdI_x90UpUNJhSrd1&s',
    );
    const [active, setActive] = useState(data?.medicine?.active == 1);
    const [units, setUnits] = useState({});
    const [currentUnit, setCurrentUnit] = useState(data?.unit);
    const [listMedicinesUnchecked, setListMedicinesUnchecked] = useState({});
    const navigate = useNavigate();
    const medicineInCartRef = useRef({});
    const user = useSelector((state) => state.authentication.login.currentUser);
    let cart = useSelector((state) => state.cart.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!active) {
            return;
        }
        setCheck(checkAll);
    }, [checkAll]);

    useEffect(() => {
        const imagePromise = getImageFromFirebase('product', data?.medicine?.id, 'avatar');
        imagePromise.then((url) => {
            setImage(url);
            let tmp = cartChecked.map((e) => {
                if (e?.medicine?.id == data?.medicine?.id) {
                    e.avatar = url;
                    return e;
                } else return e;
            });
            setCartChecked(tmp);
            return url;
        });
    }, []);

    useEffect(() => {
        const load = getAllUnitsInAMedicine(data?.medicine?.id);
        load.then(
            (e) => {
                if (e.status == 200) {
                    setUnits(e?.data);
                }
            },
            (err) => {
                console.log(err);
                navigate('/server_error');
            },
        );
    }, []);

    function handlerDeleteThisMedicineInCart() {
        activeShowLoading();

        setTimeout(() => {
            deleteAMedicineInCart(data?.id, user?.accessToken, user?.account).then(
                () => {
                    medicineInCartRef.current.remove();
                    activeShowLoading();
                    let newPrice =
                        convertPriceToNumber(data?.unit?.price - (data?.unit?.price * discount) / 100) * quantity;
                    let newTotalPrice = totalPrice - newPrice;
                    setTotalPrice(newTotalPrice);
                    let newPriceWithoutDiscount = convertPriceToNumber(data?.unit?.price) * quantity;
                    let newTotalPriceWithoutDiscount = totalPriceWithoutDiscount - newPriceWithoutDiscount;
                    setTotalPriceWithoutDiscount(newTotalPriceWithoutDiscount);
                    dispatch(addMedicinesToCart({ medicines: cart?.medicines?.filter((e) => e?.id != data?.id) }));
                    unActiveShowLoading();
                },
                (err) => {
                    if (err?.status === 403 || err?.status === 401) {
                        navigate('/signIn');
                    } else {
                        console.log(err);
                        navigate('/server_error');
                    }
                },
            );
        }, 1000);
    }

    function updateQuantity(quantity) {
        if (!active) {
            return;
        }
        activeShowLoading();
        setTimeout(() => {
            updateMedicineQuantityInCart(data?.id, quantity, currentUnit?.level, user?.accessToken, user?.account).then(
                () => {
                    const unitPrice = convertPriceToNumber(currentUnit?.price);
                    const newPrice = (unitPrice - (unitPrice * discount) / 100) * quantity;
                    const newTotalPrice = totalPrice - price + newPrice;
                    setPrice(newPrice);
                    setTotalPrice(newTotalPrice);
                    const newPriceWithoutDiscount = unitPrice * quantity;
                    const newTotalPriceWithoutDiscount =
                        totalPriceWithoutDiscount - priceWithoutDiscount + newPriceWithoutDiscount;
                    setPriceWithoutDiscount(newPriceWithoutDiscount);
                    setTotalPriceWithoutDiscount(newTotalPriceWithoutDiscount);
                    setQuantity(quantity);
                    setShowLoading(false);
                    unActiveShowLoading();
                    let arr = [];
                    cart?.medicines?.forEach((e) => {
                        let t = { ...e };
                        if (e?.id === data?.id) {
                            t.quantity = quantity;
                        }
                        arr.push(t);
                    });
                    dispatch(addMedicinesToCart({ medicines: arr }));                    
                },
                (err) => {
                    const statusCode = err?.status;
                    unActiveShowLoading();
                    if (statusCode === 413) {
                        alert('not enough');
                    } else if (statusCode === 410) {
                        alert('not active');
                    } else if (statusCode === 403 || statusCode === 401) {
                        console.log(err);
                        // navigate('/signIn');
                    } else {
                        console.log(err);
                        navigate('/server_error');
                    }
                },
            );
        }, 1000);
    }

    function chooseUnit(level) {
        for (let i = 0; i < units?.data?.length; i++) {
            let e = units?.data[i];
            if (e?.level === level) {
                activeShowLoading();
                setTimeout(() => {
                    updateUnitMedicineInCart(data?.id, e?.id, user?.accessToken, user?.account).then(
                        () => {
                            setCurrentUnit(e);
                            setPrice((e?.price - (e?.price * discount) / 100) * quantity);
                            let newPrice = convertPriceToNumber(e?.price - (e?.price * discount) / 100) * quantity;
                            let newTotalPrice = totalPrice - price + newPrice;
                            setPrice((e?.price - (e?.price * discount) / 100) * quantity);
                            setTotalPrice(newTotalPrice);
                            let newPriceWithoutDiscount = convertPriceToNumber(e?.price) * quantity;
                            let newTotalPriceWithoutDiscount =
                                totalPriceWithoutDiscount - priceWithoutDiscount + newPriceWithoutDiscount;
                            setPriceWithoutDiscount(newPriceWithoutDiscount);
                            setTotalPriceWithoutDiscount(newTotalPriceWithoutDiscount);
                            let arr = [];
                            cart?.medicines?.forEach((e) => {
                                let t = { ...e };
                                arr.push(t);
                            });
                            arr[0].unit = e;
                            dispatch(addMedicinesToCart({ medicines: arr }));
                            unActiveShowLoading();
                        },
                        (err) => {
                            const statusCode = err?.status;
                            unActiveShowLoading();
                            if (statusCode === 413) {
                                alert('không đủ sản phẩm để bán');
                            } else if (statusCode === 410) {
                                alert('sản phẩm không còn được bán');
                            } else if (statusCode === 403 || statusCode === 401) {
                                navigate('/signIn');
                            } else {
                                navigate('/server_error');
                            }
                        },
                    );
                }, 1000);
                break;
            }
        }
        setShowUnit(false);
    }

    function setCheckCartItem() {
        if (!active) {
            return;
        }
        let newTotalPrice = check ? totalPrice - price : totalPrice + price;
        let newTotalPriceWithoutDiscount = check
            ? totalPriceWithoutDiscount - priceWithoutDiscount
            : totalPriceWithoutDiscount + priceWithoutDiscount;
        setTotalPrice(newTotalPrice);
        setTotalPriceWithoutDiscount(newTotalPriceWithoutDiscount);
        if (check) {
            setChecklist(checklist - 1);
            const tmpChecked = cartChecked?.filter((e) => e?.id !== data?.id);
            const tmpUnChecked = cartChecked?.filter((e) => e?.id === data?.id);
            setCartChecked(tmpChecked);
            setListMedicinesUnchecked(tmpUnChecked);
        } else {
            setChecklist(checklist + 1);
            let tmp = cartChecked;
            listMedicinesUnchecked.forEach((e) => {
                tmp.unshift(e);
            });
            setCartChecked(tmp);
        }
        setCheck(!check);
    }

    function activeShowLoading() {
        document.body.style.overflow = 'hidden';
        setShowLoading(true);
    }

    function unActiveShowLoading() {
        document.body.style.overflow = 'scroll';
        setShowLoading(false);
    }

    return (
        <div className="py-2">
            <div
                ref={medicineInCartRef}
                className="flex items-center border-t py-3 px-2 transition-all hover:bg-[#f5f5f5]"
            >
                <div className="flex">
                    <div className="mr-1 flex h-fit">
                        <div className="my-3 flex items-center text-sm">
                            <span
                                onClick={setCheckCartItem}
                                className={`mr-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-1 text-white ${
                                    check ? 'border border-sky-700 bg-sky-700' : 'border border-black'
                                }`}
                            >
                                {check ? <i className="fa-solid fa-check"></i> : null}
                            </span>
                        </div>
                        <div className="mr-2 h-fit w-12 max-w-sm rounded-md border	 border-gray-100 p-1">
                            <img src={image} alt="" />
                        </div>
                    </div>

                    <div>
                        <div className="flex">
                            <div className="flex flex-wrap items-center">
                                <div className="flex flex-wrap items-center justify-between">
                                    <span className="w-56 text-xs sm:mr-10">{data?.medicine?.name}</span>
                                    <div>
                                        <p className="my-2 w-24 text-base font-bold text-blue-900">
                                            {convertNumberToPrice(price)}đ
                                        </p>
                                        <p className="text-xs font-light text-slate-400	 line-through">
                                            {convertNumberToPrice(priceWithoutDiscount)}đ
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-44 justify-between max-sm:justify-start">
                                    <div className="mr-2 p-0 text-center">
                                        <button
                                            className="cursor-pointer rounded-l-full border px-1 text-sm text-gray-500"
                                            onClick={() => {
                                                if (quantity > 1) {
                                                    updateQuantity(Number(quantity) - 1);
                                                }
                                            }}
                                        >
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <input
                                            className="border-border-slate-100 w-6 border-t border-b text-center text-sm text-gray-500 outline-0"
                                            type="text"
                                            value={quantity}
                                            onBlur={(e) => {
                                                updateQuantity(e.target.value);
                                            }}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        ></input>
                                        <button
                                            className="cursor-pointer rounded-r-full border px-1 text-sm"
                                            onClick={() => {
                                                updateQuantity(Number(quantity) + 1);
                                            }}
                                        >
                                            <i className="fa-solid fa-plus  text-gray-500"></i>
                                        </button>
                                    </div>
                                    <div className="relative w-16 cursor-pointer rounded-full  border px-2 py-1 text-sm">
                                        <div
                                            className="flex items-center justify-between"
                                            onClick={() => setShowUnit(!showUnit)}
                                        >
                                            <span className="text-xs">{currentUnit?.name}</span>
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-3 w-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                        <div
                                            className={`${
                                                showUnit ? 'block' : 'hidden'
                                            } absolute right-0 top-8 z-20 w-56 cursor-pointer rounded-lg border bg-white px-1 py-2 text-sm duration-300 ease-in-out`}
                                        >
                                            {units?.data?.map((e, i) => {
                                                return (
                                                    <div key={i} className="flex justify-between border-b px-2 py-2">
                                                        <div className="flex">
                                                            <span
                                                                onClick={() => chooseUnit(e?.level)}
                                                                className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full ${
                                                                    currentUnit?.id == e?.id
                                                                        ? 'bg-sky-700'
                                                                        : 'border border-black'
                                                                } text-white`}
                                                            >
                                                                {currentUnit?.id == e?.id ? (
                                                                    <i className="fa-solid fa-check"></i>
                                                                ) : null}
                                                            </span>
                                                            <span className="capitalize">{e?.name}</span>
                                                        </div>
                                                        <span>
                                                            {convertNumberToPrice(
                                                                quantity * (e?.price - (e?.price * discount) / 100),
                                                            )}
                                                            đ
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center max-sm:mr-1 max-sm:self-start sm:ml-3">
                                <button onClick={handlerDeleteThisMedicineInCart}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="rounded border">
                <div className="flex justify-between bg-[rgb(255,243,225)] p-1 text-[13px]">
                    <div>
                        <span className="flex items-center">
                            <span className="mx-2">
                                <i className="fa-solid fa-tag"></i>
                            </span>
                            <span className="font-medium">Khuyến mại</span>
                        </span>
                    </div>
                    <span className="cursor-pointer text-[#1250dc]">Chọn khuyến mại</span>
                </div>
                <div className="m- mx-2 flex items-center py-2">
                    <span className="rounded border p-1">
                        <img
                            src="https://s3-sgn09.fptcloud.com/lc-public/web-lc/default/promotion_used.webp"
                            width="30"
                            height="30"
                            className="transparent"
                        />
                    </span>
                    <span className="mx-2 text-[14px]">Giảm ngay 20% khi mua theo Hộp áp dụng đến 30/04</span>
                </div>
            </div> */}
        </div>
    );
}
export default CartItem;
