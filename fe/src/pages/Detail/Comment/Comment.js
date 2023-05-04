import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as commentService from '~/services/commentService';
import CommentItem from './CommentItem';
import Reply from './Reply';

function Comment(props) {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.authentication.login.currentUser);
    const [contentComment, setContentComment] = useState('');
    const [alertContentComment, setAlertContentComment] = useState('');

    const [commentByMedicineId, setCommentByMedicineId] = useState([]);
    const [responseCommentContent, setResponseCommentContent] = useState('');
    const [medicineId, setMedicineId] = useState(1);

    useEffect(() => {
        const fetchApi = async () => {
            const resultAllCommentss = await commentService.findCommentsByMedicineIdOrderByCreateDate(1);
            setCommentByMedicineId(resultAllCommentss.data);
        };
        fetchApi();
    }, [medicineId]);

    const handlePostComment = async () => {
        if (contentComment.length < 3 || contentComment === undefined) {
            setAlertContentComment('Mời bạn nhập bình luận. Tối thiểu 3 ký tự!');
        } else {
            await commentService.postComment(2, 1, contentComment);
            setAlertContentComment('');
            setContentComment('');
            notifySuccessComment();
        }
    };

    const handleLikeComment = async (commentId) => {
        const result = await commentService.likeComment(commentId, 2);
        notifySuccessLikeComment(result?.message);
    };
    const handleUnLikeComment = async (commentId) => {
        const result = await commentService.unLikeComment(commentId, 2);
        notifySuccessUnLikeComment(result?.message);
    };

    const handleFindLikeByCommentIdAndUserId = async (commentId, userId) => {
        return await commentService.findLikeByCommentIdAndUserId(commentId, 2).then((result) => result.data);
    };

    const handleLoadReplyComment = (array) => {
        const comments = [];
        // for (let comment of array) {
        //     //duyệt all phần tử
        //     if (comment.replyId) {
        //         // check phần tử có replyId
        //         const index = comments.findIndex((i) => i.id === 23);
        //         console.log(index);

        //         // comments[index].abc.push(comment);
        //         // console.log(comment.id);
        //     } else {
        //         // console.log('gốc' + comment.id);
        //         comments.push({ ...comment, responses: [] });
        //     }
        // }

        // return comments;
        const re = {};
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
        return Object.values(re);
    };

    const handleComments = handleLoadReplyComment(commentByMedicineId);
    const handleSaveReponseComment = (userId, commentId, medicineId, content) => {
        return commentService.responseComment(userId, commentId, medicineId, content);
    };

    const notifySuccessComment = () => {
        toast.success('Bình luận thành công.', {
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
    const notifySuccessLikeComment = (msg) => {
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
    const notifySuccessUnLikeComment = (msg) => {
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

    const notifySuccessResponseComment = () => {
        toast.success('Phản hồi bình luận thành công.', {
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
    const [slideCount, setSlideCount] = useState(1);
    return (
        <div className="comment max-w-full bg-[#edf2f8] px-1 pb-8 ">
            <div className="mx-auto  my-0 max-w-[1200px] rounded-3xl border ">
                <div className="comment-header rounded-t-lg border-[#d1d5da] bg-[#fff] px-3 py-4">
                    <h3 className="text-[20px] font-bold">Bình luận</h3>
                </div>

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
                    <ToastContainer />
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
                    {handleComments?.slice(0, slideCount)?.map((e) => {
                        return (
                            <CommentItem
                                key={e.comment.id}
                                avatar={e.comment.user.name.charAt(0).toUpperCase()}
                                name={e.comment.user.name}
                                time={e.comment.createDate}
                                content={e.comment.content}
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
                                                            3,
                                                            commentId,
                                                            e.comment.medicineId,
                                                            responseCommentContent,
                                                        );
                                                        notifySuccessResponseComment();
                                                        setIsOpen(false);
                                                    } else {
                                                        console.log('nội dung phản hồi không phù hợp');
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
                                            setIsOpen(true);
                                            setCommentId(e.comment.id);
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
                                        <button
                                            className="mr-2 text-sm text-[#1d48ba]"
                                            onClick={() => {
                                                handleLikeComment(e.comment.id);
                                            }}
                                        >
                                            Thích
                                        </button>
                                        <button
                                            className="mr-2 text-sm text-[#1d48ba]"
                                            onClick={() => {
                                                handleUnLikeComment(e.comment.id);
                                            }}
                                        >
                                            Bỏ Thích
                                        </button>

                                        <span className="text-sm text-[#1d48ba]">
                                            {e.likes?.length > 0 ? e.likes?.length : ''}
                                        </span>
                                    </div>
                                </div>

                                {e.reply.map((rep) => (
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

                                            <button
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
                                            </span>
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
                                setSlideCount((prev) => prev + 1);
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
