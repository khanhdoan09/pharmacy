import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as commentService from '~/services/commentService';
import CommentItem from './CommentItem';
import LikeButton from './LikeButton';
import Reply from './Reply';

function Comment(props) {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.authentication.login.currentUser);
    const [contentComment, setContentComment] = useState('');
    const [alertContentComment, setAlertContentComment] = useState('');

    const [responseCommentContent, setResponseCommentContent] = useState('');
    const { medicineId } = useParams();
    const handleMedicineId = medicineId.split('=')[1];


    const handlePostComment = async () => {
        if (user?.email === undefined) {
            setOpenModal(true);
        } else if (contentComment.length < 3) {
            setAlertContentComment('Vui lòng nhập ít nhất 3 ký tự');
        } else {
            await commentService.postComment(user?.email, handleMedicineId, contentComment);
            setAlertContentComment('');
            setContentComment('');
            notifySuccess('Bình luận thành công.');
        }
    };

    const handleLoadReplyComment = (array) => {
        const re = {};
        if (props?.commentByMedicineId !== undefined) {
            for (let comment of array) {
                if (comment.replyId !== 0) {
                    if (re[comment.replyId] === undefined) {
                        re[comment.replyId] = { reply: [comment], comment: {} };
                    } else {
                        re[comment.replyId]?.reply?.push(comment);
                    }
                } else {
                    if (re[comment.id] === undefined) {
                        re[comment.id] = { reply: [], comment: comment };
                    } else {
                        re[comment.id].comment = comment;
                    }
                }
            }
        }
        return Object.values(re);
    };

    const handleComments = handleLoadReplyComment(props?.commentByMedicineId);
    const handleSaveReponseComment = (userEmail, commentId, medicineId, content) => {
        if (user?.role.toLowerCase() === 'client') {
            notifyWarning('Tài khoản của bạn không có quyền sử dụng chức năng này.');
        } else {
            commentService.responseComment(userEmail, commentId, medicineId, content);
            setIsOpen(false);
            notifySuccess('Phản hồi thành công');
        }
    };

    const notifySuccess = (msg) => {
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

    const notifyWarning = (msg) => {
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


    const [commentId, setCommentId] = useState('');
    const [slideCount, setSlideCount] = useState(5);

    const [openModal, setOpenModal] = useState(false);
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
        <div className="comment max-w-full bg-[#edf2f8] px-1 pb-8 ">
            <div className="mx-auto  my-0 max-w-[1200px] rounded-3xl border ">
                <div className="comment-header rounded-t-lg border-[#d1d5da] bg-[#fff] px-3 py-4">
                    <h3 className="text-[20px] font-bold">Bình luận</h3>
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
                <div className="comment-form relative mx-4 my-4 mb-4 h-[90px] rounded-lg border border-[#d8e0e8]  bg-[#fff] px-4 py-1">
                    <textarea
                        className="h-full w-full outline-none"
                        placeholder="Nhập nội dung câu hỏi (Vui lòng gõ tiếng Việt có dấu)..."
                        onChange={(e) => {
                            setContentComment(e.target.value);
                        }}
                        value={contentComment}
                    />
                    <button
                        className="absolute bottom-1 right-2 h-8 rounded-3xl bg-[#1d48ba] px-5 text-base uppercase text-[#fff]"
                        onClick={() => {
                            handlePostComment();
                        }}
                    >
                        gửi bình luận
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
                </div>
                {alertContentComment && (
                    <div className="mb-4 flex items-center px-4 text-[#ef4444]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-1 h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>{alertContentComment}</span>
                    </div>
                )}

                <div className="comment-detail rounded-b-lg bg-[#fff] px-4 py-4">
                    {handleComments?.slice(0, slideCount)?.map((e,index) => {
                        return (
                            <CommentItem
                                key={index}
                                avatar={e?.comment?.user?.name.charAt(0).toUpperCase() || 'A'}
                                name={e?.comment?.user?.name}
                                time={e?.comment?.createDate}
                                content={e?.comment?.content}
                            >
                                {isOpen && commentId === e.comment.id && (
                                    <>
                                        <div className="mb-2 flex items-center">
                                            <input
                                                className="xs-w-[200px] cs-w-[100px] border-b border-[#333] outline-none sm:w-[300px] md:w-[500px] lg:w-[800px] xl:w-[800px] 2xl:w-[800px]"
                                                onChange={(contentReply) => {
                                                    setResponseCommentContent(contentReply.target.value);
                                                }}
                                            />
                                            <button
                                                className="disabled:cursor-not-allowed"
                                                disabled={responseCommentContent.trim().length === 0 ? true : false}
                                                onClick={() => {
                                                    if (
                                                        responseCommentContent.trim().length > 0 &&
                                                        responseCommentContent !== undefined &&
                                                        responseCommentContent !== null
                                                    ) {
                                                        handleSaveReponseComment(
                                                            user?.email,
                                                            commentId,
                                                            e.comment.medicineId,
                                                            responseCommentContent,
                                                        );
                                                    } else {
                                                        notifyWarning('Hệ thống bảo trì');
                                                    }
                                                }}
                                            >
                                                Trả lời
                                            </button>
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center">
                                    <button
                                        className="mr-2 text-sm text-[#1d48ba]"
                                        onClick={() => {
                                            if (user?.email === undefined) {
                                                setOpenModal(true);
                                            } else if (user?.role.toLowerCase() === 'client') {
                                                notifyWarning('Tài khoản của bạn không có quyền sử dụng chức năng này.')
                                                setIsOpen(false);
                                            } else {
                                                setIsOpen(true);
                                                setCommentId(e.comment.id);
                                            }
                                        }}
                                    >
                                        Trả lời
                                    </button>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="mr-1 h-4 w-4 text-[#1d48ba]"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                            />
                                        </svg>
                                        <LikeButton itemId={e.comment.id} />

                                        <p className="mr-2 text-sm text-[#1d48ba]">({e?.comment?.likes?.length})</p>

                                        {/* <button
                                            className="mr-2 text-sm text-[#1d48ba]"
                                            onClick={() => {
                                                handleLikeClick(e.comment.id);
                                            }}
                                        >
                                            {liked ? 'Bỏ thích' : 'Thích'}
                                        </button> */}
                                        {/* <button
                                            className="mr-2 text-sm text-[#1d48ba]"
                                            onClick={() => {
                                                handleUnLikeComment(e.comment.id);
                                            }}
                                        >
                                            Bỏ Thích
                                        </button> */}

                                        <span className="text-sm text-[#1d48ba]">
                                            {e.likes?.length > 0 ? e.likes?.length : ''}
                                        </span>
                                    </div>
                                </div>

                                {e?.reply?.map((rep) => (
                                    <Reply
                                        key={rep.id}
                                        name={rep.user.name}
                                        label={rep.user.role === 'staff' ? 'Quản trị viên' : ''}
                                        time={rep.createDate}
                                        content={rep.content}
                                    >
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="mr-1 h-4 w-4 text-[#1d48ba]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                                />
                                            </svg>
                                            <LikeButton itemId={rep.id} />
                                            <p className="mr-2 text-sm text-[#1d48ba]">({rep?.likes?.length})</p>
                                            {/* <button
                                                className="mr-2 text-sm text-[#1d48ba]"
                                                onClick={() => {
                                                    handleLikeComment(rep.id);
                                                }}
                                            >
                                                Thích
                                            </button>
                                            <button
                                                className="mr-2 text-sm text-[#1d48ba]"
                                                onClick={() => {
                                                    handleUnLikeComment(rep.id);
                                                }}
                                            >
                                                Bỏ Thích
                                            </button>
                                            <span className="text-sm text-[#1d48ba]">
                                                {rep.likes?.length > 0 ? rep.likes?.length : ''}
                                            </span> */}
                                        </div>
                                    </Reply>
                                ))}
                            </CommentItem>
                        );
                    })}

                    {slideCount < handleComments.length ? (
                        <button
                            className="mx-auto mt-8 flex h-8 w-[192px] items-center justify-center rounded-lg border border-[#d8e0e8] hover:bg-[#777272] hover:text-[#fff]"
                            onClick={() => {
                                setSlideCount((prev) => prev + 5);
                            }}
                        >
                            <p className="mr-1 font-bold"> Xem thêm bình luận</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Comment;
