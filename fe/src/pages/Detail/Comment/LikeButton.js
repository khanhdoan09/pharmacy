import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as commentService from '~/services/commentService';

function LikeButton(props) {
    const [liked, setLiked] = useState(false);
    const user = useSelector((state) => state.authentication.login.currentUser);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            if (user?.email === undefined) {
            } else {
                const re = await commentService.findLikeByCommentIdAndUserId(props.itemId, user?.email);
                setLiked(re?.data);
            }
        };
        fetchApi();
    }, [props.itemId]);

    const handleLikeClick = async () => {
        if (user?.email === undefined) {
            setOpenModal(true);
        } else {
            if (liked === false) {
                await commentService.likeComment(user?.accessToken, user?.account, props.itemId, user?.email);
                setLiked(true);
            } else {
                await commentService.unLikeComment(user?.accessToken, user?.account, props.itemId, user?.email);
                setLiked(false);
            }
        }
    };

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
    return (
        <>
            <button
                className="mr-2 text-sm text-[#1d48ba]"
                onClick={() => {
                    handleLikeClick();
                }}
            >
                {liked ? `Bỏ thích` : `Thích`}
            </button>
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
                                        <NavLink to="/signin">
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

export default LikeButton;
