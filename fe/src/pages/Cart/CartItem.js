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
    const [image, setImage] = useState('');
    const [active, setActive] = useState(data?.medicine?.active == 1);
    const [units, setUnits] = useState({});
    const [currentUnit, setCurrentUnit] = useState(data?.unit);
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
        imagePromise
            .then((url) => {
                setImage(url);
                return url;
            })
            .catch((error) => {
                setImage(
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBWOxDZ6-zuaW-Bp6x8aw3FNAdI_x90UpUNJhSrd1&s',
                );
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
        deleteAMedicineInCart(data?.id, user?.idToken, user?.account).then(
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
            updateMedicineQuantityInCart(data?.id, quantity, currentUnit?.level, user?.idToken, user?.account).then(
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
                updateUnitMedicineInCart(data?.id, e?.id, user?.idToken, user?.account).then(
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
            const tmp = cartChecked.filter((e) => e != data?.id);
            setCartChecked(tmp);
        } else {
            setChecklist(checklist + 1);
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
        <div ref={medicineInCartRef} className="border-t flex items-center py-3 px-2 hover:bg-[#f5f5f5] transition-all">
            <div className="flex mr-1">
                <div className="flex items-center text-sm my-3">
                    <span
                        onClick={setCheckCartItem}
                        className={`rounded-full p-1 mr-3 w-5 h-5 flex items-center justify-center text-white cursor-pointer ${
                            check ? 'bg-sky-700 border border-sky-700' : 'border border-black'
                        }`}
                    >
                        {check ? <i className="fa-solid fa-check"></i> : null}
                    </span>
                </div>
                <div className="border border-gray-100 p-1 rounded-md mr-2 max-w-sm	 w-12 h-fit">
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                <div className="flex flex-wrap items-center justify-between">
                    <span className="text-xs w-56 sm:mr-10">{data?.medicine?.name}</span>
                    <span className="text-blue-900 text-base font-bold w-24 my-2">{price}đ</span>
                </div>
                <div className="flex justify-between max-sm:justify-start w-44">
                    <div className="text-center p-0 mr-2">
                        <button
                            className="border px-1 rounded-l-full text-sm text-gray-500 cursor-pointer"
                            onClick={() => {
                                if (quantity > 1) {
                                    updateQuantity(Number(quantity) - 1);
                                }
                            }}
                        >
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                            className="text-sm w-6 border-t border-b text-center outline-0 border-border-slate-100 text-gray-500"
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
                            className="border px-1 rounded-r-full text-sm cursor-pointer"
                            onClick={() => {
                                updateQuantity(Number(quantity) + 1);
                            }}
                        >
                            <i className="fa-solid fa-plus  text-gray-500"></i>
                        </button>
                    </div>
                    <div className="px-2 py-1 w-16 rounded-full  border text-sm cursor-pointer relative">
                        <div className="flex justify-between items-center" onClick={() => setShowUnit(!showUnit)}>
                            <span className="text-xs">{currentUnit?.name}</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
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
                            } ease-in-out duration-300 px-1 text-sm rounded-lg cursor-pointer w-56 border py-2 bg-white absolute z-20 right-0 top-8`}
                        >
                            {units?.data?.map((e, i) => {
                                return (
                                    <div key={i} className="flex justify-between px-2 border-b py-2">
                                        <div className="flex">
                                            <span
                                                onClick={() => chooseUnit(e?.level)}
                                                className={`rounded-full w-5 h-5 flex items-center justify-center mr-2 ${
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
            <div className="pt-1 sm:ml-3 max-sm:mr-1 max-sm:self-start">
                <button onClick={handlerDeleteThisMedicineInCart}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
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
