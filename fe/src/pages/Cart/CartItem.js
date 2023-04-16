import { useEffect, useRef, useState } from 'react';
import { deleteAMedicineInCart, updateMedicineQuantityInCart, updateUnitMedicineInCart } from '~/services/cartServices';
import { useNavigate } from 'react-router-dom';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';
import { getImageFromFirebase } from '~/utils/firebase';
import { getAllUnitsInAMedicine } from '~/services/unitServices';
import { useSelector } from 'react-redux';

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
}) {
    const [price, setPrice] = useState(convertNumberToPrice(data?.unit?.price * data?.quantity));
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

    useEffect(() => {
        if (!active) {
            return;
        }
        setCheck(checkAll);
    }, [checkAll]);

    useEffect(() => {
        const imagePromise = getImageFromFirebase(`product/${data?.medicine?.id}`, `${data?.medicine?.avatar}`);
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
            (e) => {
                navigate('/server_error');
            },
        );
    }, []);

    function handlerDeleteThisMedicineInCart() {
        activeShowLoading();
        deleteAMedicineInCart(data?.id, user?.accessToken, user?.account).then(
            () => {
                medicineInCartRef.current.remove();
                unActiveShowLoading();
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

    function updateQuantity(quantity) {
        if (!active) {
            return;
        }
        activeShowLoading();
        setTimeout(() => {
            updateMedicineQuantityInCart(data?.id, quantity, currentUnit?.level, user?.accessToken, user?.account).then(
                () => {
                    let newPrice = convertPriceToNumber(currentUnit?.price) * quantity;
                    let newTotalPrice =
                        convertPriceToNumber(totalPrice?.replace('.', '')) -
                        convertPriceToNumber(price?.replace('.', '')) +
                        newPrice;
                    setPrice(convertNumberToPrice(newPrice));
                    setTotalPrice(convertNumberToPrice(newTotalPrice));
                    setQuantity(quantity);
                    setShowLoading(false);
                    unActiveShowLoading();
                },
                (err) => {
                    const statusCode = err?.status;
                    if (statusCode === 413) {
                        alert('not enough');
                    } else if (statusCode === 410) {
                        alert('not active');
                    } else if (statusCode === 403 || statusCode === 401) {
                        console.log(err);
                        // navigate('/signIn');
                    } else {
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
                updateUnitMedicineInCart(data?.id, e?.id, user?.accessToken, user?.account).then(
                    () => {
                        setCurrentUnit(e);
                        setPrice(convertNumberToPrice(e?.price * quantity));
                        let newPrice = convertPriceToNumber(e?.price) * quantity;
                        let newTotalPrice =
                            convertPriceToNumber(totalPrice?.replace('.', '')) -
                            convertPriceToNumber(e?.price) +
                            newPrice;
                        setPrice(convertNumberToPrice(newPrice));
                        setTotalPrice(convertNumberToPrice(newTotalPrice));
                        unActiveShowLoading();
                    },
                    (err) => {
                        const statusCode = err?.status;
                        if (statusCode === 413) {
                            alert('not enough');
                        } else if (statusCode === 410) {
                            alert('not active');
                        } else if (statusCode === 403 || statusCode === 401) {
                            navigate('/signIn');
                        } else {
                            navigate('/server_error');
                        }
                    },
                );
                break;
            }
        }
        setShowUnit(false);
    }

    function setCheckCartItem() {
        if (!active) {
            return;
        }
        let newTotalPrice = 0;
        let totalPriceTmp = convertPriceToNumber(totalPrice?.replace('.', ''));
        let priceTmp = convertPriceToNumber(price?.replace('.', ''));
        newTotalPrice = check ? totalPriceTmp - priceTmp : totalPriceTmp + priceTmp;
        setTotalPrice(convertNumberToPrice(newTotalPrice));
        if (check) {
            setChecklist(checklist - 1);
            const tmpChecked = cartChecked.filter((e) => e?.id !== data?.id);
            const tmpUnChecked = cartChecked.filter((e) => e?.id === data?.id);
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
        document.body.style.overflow = 'block';
        setShowLoading(false);
    }

    return (
        <div ref={medicineInCartRef} className="flex items-center border-t py-3 px-2 transition-all hover:bg-[#f5f5f5]">
            <div className="mr-1 flex">
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
            <div className="flex flex-wrap items-center">
                <div className="flex flex-wrap items-center justify-between">
                    <span className="w-56 text-xs sm:mr-10">{data?.medicine?.name}</span>
                    <span className="my-2 w-24 text-base font-bold text-blue-900">{price}đ</span>
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
                        <div className="flex items-center justify-between" onClick={() => setShowUnit(!showUnit)}>
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
                                                    currentUnit?.id == e?.id ? 'bg-sky-700' : 'border border-black'
                                                } text-white`}
                                            >
                                                {currentUnit?.id == e?.id ? (
                                                    <i className="fa-solid fa-check"></i>
                                                ) : null}
                                            </span>
                                            <span className="capitalize">{e?.name}</span>
                                        </div>
                                        <span>{convertNumberToPrice(quantity * e?.price)}đ</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-1 max-sm:mr-1 max-sm:self-start sm:ml-3">
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
    );
}
export default CartItem;
