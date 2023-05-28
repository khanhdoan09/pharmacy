import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as medicineService from '~/services/medicineService';

function SavedButton(props) {
    const user = useSelector((state) => state.authentication.login.currentUser);
    const [openModal, setOpenModal] = useState(false);
    const [saved, setSaved] = useState(false);
    const handleMedicineId = useSelector(state => state.medicine.selectedMedicineId);
    useEffect(() => {
        const fetchApi = async () => {
            if (user?.email === undefined) {
            } else {
                const re = await medicineService.findSavedByEmailAndMedicineId(user?.email, handleMedicineId || 1);
                setSaved(re?.data);
            }
        };
        fetchApi();
    }, [handleMedicineId]);

    useEffect(() => {
        if (openModal) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [openModal]);

    const handleLikeClick = async () => {
        if (user?.email === undefined) {
            setOpenModal(true);
        } else {
            if (saved === false) {
                setSaved(true);
                await medicineService.savedMedicine(user?.accessToken, user?.account, user?.email, handleMedicineId);
                console.log(saved);
            } else {
                setSaved(false);
                await medicineService.unsavedMedicine(user?.accessToken, user?.account, user?.email, handleMedicineId);
                console.log(saved);
            }
        }
    };

    return (
        <>
            <div
                className="flex h-[56px] cursor-pointer select-none items-center rounded-[100px] border border-blue-400 bg-transparent px-[36px] font-bold uppercase text-[#fff]"
                onClick={() => {
                    handleLikeClick();
                }}
            >
                {saved ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-blue-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-blue-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                    </svg>
                )}
                <span className="text-blue-400">{saved ? `Bỏ lưu` : ` Lưu sản phẩm`}</span>
            </div>

            {openModal && (
                <>
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                        <div className="relative top-1/2 mx-auto w-full max-w-lg -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                            <div className="mt-5">
                                <h2 className="mb-4 text-center text-xl font-semibold">
                                    Vui lòng đăng nhập để sử dụng tính năng này
                                </h2>
                                <div className="p-6">
                                    <div className="flex items-start justify-center">
                                        <NavLink to="/sign-in">
                                            <button
                                                type="button"
                                                className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                            >
                                                Đăng Nhập
                                            </button>
                                        </NavLink>
                                        <button
                                            onClick={() => setOpenModal(false)}
                                            type="button"
                                            className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                                        >
                                            Thoát
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SavedButton;
