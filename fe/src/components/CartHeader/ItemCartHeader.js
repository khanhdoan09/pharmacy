import { useSelector, useDispatch } from 'react-redux';
import { deleteAMedicineInCart } from '~/services/cartServices';
import { convertNumberToPrice } from '~/utils/currency';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { addMedicinesToCart } from '~/redux/cartSlice';
import { useState, useEffect } from 'react';
import { getImageFromFirebase } from '~/utils/firebase';

function ItemCartHeader(props) {
    const medicineInCartRef = useRef({});
    const navigate = useNavigate();
    const user = useSelector((state) => state.authentication.login.currentUser);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart?.medicines);
    const [image, setImage] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBWOxDZ6-zuaW-Bp6x8aw3FNAdI_x90UpUNJhSrd1&s',
    );
    function removeInCart(id) {
        deleteAMedicineInCart(id, user?.accessToken, user?.account).then(
            () => {
                medicineInCartRef.current.remove();
                props.setTotalMedicine(props.totalMedicine - 1);
                dispatch(addMedicinesToCart({ medicines: cart?.medicines?.filter((e) => e?.id != id) }));
            },
            (err) => {
                if (err?.status === 403 || err?.status === 401) {
                    navigate('/signIn');
                } else if (err?.status === 404) {
                    medicineInCartRef.current.remove();
                    props.setTotalMedicine(props.totalMedicine - 1);
                    dispatch(addMedicinesToCart({ medicines: cart?.filter((e) => e?.id !== id) }));
                } else {
                    console.log(err);
                    navigate('/server_error');
                }
            },
        );
    }
    
    useEffect(() => {      
        const imagePromise = getImageFromFirebase('product', props?.medicine?.id, 'avatar');
        imagePromise.then((url) => {
            setImage(url);
        });
    }, []);

    return (
        <div className="my-3 flex items-center" ref={medicineInCartRef}>
            <a
                href="/"
                className="flex h-[56px] w-[80px] items-center justify-center rounded-lg border border-2 border-[#e4e8ed] p-1"
            >
                <img src={image} />
            </a>
            <div className="mx-4">
                <p className="text-[0.875rem] text-[#020b27] line-clamp-2">{props?.medicine?.name}</p>
                <span className="flex justify-between">
                    <span>
                        <span className="text-[14px] font-semibold text-[#1250dc]">
                            {convertNumberToPrice(
                                (props?.unit?.price - (props?.unit?.price * props?.medicine?.discount) / 100) *
                                    props?.quantity,
                            )}
                            đ
                        </span>
                        <span className="mx-1 text-[12px] text-[#657384] line-through">
                            {convertNumberToPrice(props?.unit?.price * props?.quantity)}đ
                        </span>
                    </span>
                    <span className="text-[14px] text-[#657384]">
                        x{props?.quantity} {props?.unit?.name}
                    </span>
                </span>
            </div>
            <div
                className="cursor-pointer text-[#657384]"
                onClick={() => {
                    removeInCart(props?.id);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </div>
        </div>
    );
}

export default ItemCartHeader;
