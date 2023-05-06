import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as rateService from '~/services/rateService';
import { convertNumberToPrice } from '~/utils/currency';
import HistoryImage from './HistoryImage';
import { encrypt } from '~/utils/cryptoUtils';

function HistoryItem(props) {
    const orderDetails = props?.orderDetails;
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.authentication.login.currentUser);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [medicineId, setMedicineId] = useState('');

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (comment.length > 0 && medicineId !== undefined) {
            await rateService.saveRate(medicineId, encrypt(user?.email), rating, encrypt(comment));
            notifySuccessRate('Đánh giá thành công');
            setIsOpen(false);
            setComment('');
            setRating(5);
        } else {
            notifyWarningRate('Vui lòng điền nội dung đánh giá');
        }
    };

    const notifySuccessRate = (msg) => {
        toast.success(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    const notifyWarningRate = (msg) => {
        toast.warning(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    return (
        <div className="absolute z-40 w-full rounded-2xl border  border-indigo-400 bg-white shadow-lg shadow-indigo-500/50 ">
            <button
                onClick={() => {
                    props?.setShowDetail(-1);
                }}
                className="absolute -top-4 -right-5 flex h-9 w-9 cursor-pointer items-center rounded-full bg-rose-700 p-3 text-center text-white"
            >
                X
            </button>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                            <div className="relative top-1/2 mx-auto w-full max-w-lg -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-0 right-0 my-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Đóng
                                </button>

                                <div className="mt-5">
                                    <div className="p-6">
                                        <h2 className="mb-4 text-xl font-semibold">Đánh giá sản phẩm</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="rating" className="mb-2 block font-medium">
                                                    Đánh giá của bạn
                                                </label>
                                                <select
                                                    id="rating"
                                                    name="rating"
                                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    value={rating}
                                                    onChange={handleRatingChange}
                                                >
                                                    <option value="1">1 sao</option>
                                                    <option value="2">2 sao</option>
                                                    <option value="3">3 sao</option>
                                                    <option value="4">4 sao</option>
                                                    <option value="5">5 sao</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="comment" className="mb-2 block font-medium">
                                                    Nhận xét của bạn
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    rows="4"
                                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    value={comment}
                                                    onChange={handleCommentChange}
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                            >
                                                Gửi đánh giá
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
            {orderDetails.map((e, i) => {
                const medicine = e?.medicine;
                return (
                    <div key={i} className="my-5 flex items-center">
                        <div className="px-2">
                            <HistoryImage productId={medicine?.id} avatar={medicine?.avatar}></HistoryImage>
                        </div>
                        {orderDetails?.length % 2 === 0 ? <div className="absolute top-1/2 w-full border"></div> : null}
                        <div className="px-3">
                            <div className="font-bold">{medicine?.name}</div>
                            <div className="flex">
                                <span className="font-bold">Nhãn hàng: </span>
                                <span className="px-2">{medicine?.brandDetail?.name}</span>
                            </div>
                            <div className="flex">
                                <span className="font-bold">Số lượng: </span>
                                <span className="px-2">
                                    {e?.quantity} {e?.unit}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="font-bold">Giá: </span>
                                <span className="px-2">{convertNumberToPrice(e?.price * e?.quantity)} đ</span>
                            </div>
                        </div>
                        <div className="float-right">
                            <button
                                onClick={() => {
                                    setIsOpen(true);
                                    setMedicineId(e?.medicine?.id);
                                }}
                                type="button"
                                className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 "
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HistoryItem;
