import { Reply } from '../Comment';
import ReviewItem from './ReviewItem';

function Review() {
    return (
        <div className="max-w-full bg-[#edf2f8] pb-8 px-1">
            <div className="max-w-[1200px] mx-auto my-0 bg-[#fff] rounded-xl border border-[#d8e0e8]">
                <div className="px-4 py-3 border-b border-[#d8e0e8]">
                    <h3 className="text-xl font-bold">Đánh Giá & Nhận Xét</h3>
                </div>
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 gap-4 py-4 border-b border-[#d8e0e8]">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-base mb-1">Đánh Giá Trung Bình</p>
                        <h1 className="text-[44px] text-[#1d48ba] font-bold mb-1">4/5</h1>
                        <div className="flex items-center mb-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-[#718198]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className="text-[#718198] text-sm">4 đánh giá</p>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4">
                        <div className="flex items-center mb-1">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-[#f59e0b] mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-1 ">
                                <div className="bg-[#4cb816] h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-[#718198]">3</span>
                        </div>
                        <div className="flex items-center mb-1">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-[#f59e0b] mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-1 ">
                                <div className="bg-[#4cb816] h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-[#718198]">3</span>
                        </div>
                        <div className="flex items-center mb-1">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-[#f59e0b] mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-1 ">
                                <div className="bg-[#4cb816] h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-[#718198]">3</span>
                        </div>
                        <div className="flex items-center mb-1">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-[#f59e0b] mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-1 ">
                                <div className="bg-[#4cb816] h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-[#718198]">3</span>
                        </div>
                        <div className="flex items-center mb-1">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-[#f59e0b] mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-1 ">
                                <div className="bg-[#4cb816] h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-[#718198]">3</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center my-auto">
                        <p className="mb-2">Bạn đã dùng sản phẩm này?</p>
                        <button className="px-8 text-base bg-[#1d48ba] rounded-3xl text-[#fff] leading-9">
                            GỬI ĐÁNH GIÁ
                        </button>
                    </div>
                </div>
                <div className="px-4 py-3">
                    <ReviewItem
                        avatar="T"
                        name="Thủy"
                        time="1 tuần trước"
                        content="Sản phẩm này có thể pha vào sữa cho trẻ em uống được không ah"
                    >
                        <button className="mr-2 text-sm text-[#1d48ba]">Trả lời</button>

                        {/* {isOpen && (
                            <div className="fixed z-40 overflow-y-auto top-0 w-full left-0" id="modal">
                                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity" onClick={() => setIsOpen(false)}>
                                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                                    </div>
                                    <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                                    <div
                                        className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby="modal-headline"
                                    >
                                        <div className="bg-[#fff] px-4 py-4 rounded-2xl shadow-xl min-w-[400px]">
                                            <div className="flex items-center justify-between py-2 ">
                                                <h3 className="font-bold text-2xl">Trả Lời "Thủy"</h3>
                                                <button onClick={() => setIsOpen(false)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div>
                                                <div className="flex mb-2">
                                                    <div className="mr-2">
                                                        <input type="radio" className="mr-1" name="anh" id="anh" defaultChecked/>
                                                        <label htmlFor="anh">Anh</label>
                                                    </div>
                                                    <div className="mr-2">
                                                        <input type="radio" className="mr-1" name="chi" id="chi" />
                                                        <label htmlFor="chi">Chị</label>
                                                    </div>
                                                </div>
                                                <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mb-2 ">
                                                    <div className="flex flex-col">
                                                        <input
                                                            type="text"
                                                            placeholder="Nhập họ và tên"
                                                            className="px-2 py-2 border outline-none rounded-lg mb-1"
                                                        />
                                                        <span className="text-[#ef4444]">Thông tin bắt buộc</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <input
                                                            type="text"
                                                            placeholder="Nhập số điện thoại"
                                                            className="px-2 py-2 border outline-none rounded-lg mb-1"
                                                        />
                                                        <span className="text-[#ef4444]">Thông tin bắt buộc</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col  mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập email (không bắt buộc)"
                                                        className="px-2 py-2 border outline-none rounded-lg"
                                                    />
                                                    <span className="text-[#ef4444]">Thông tin bắt buộc</span>
                                                </div>
                                                <div className="flex flex-col  mb-2">
                                                    <textarea
                                                        placeholder="Nhập nội dung câu hỏi (Vui lòng gõ tiếng Việt có dấu)..."
                                                        className="px-2 py-2 border outline-none rounded-lg resize-none"
                                                    />
                                                    <span className="text-[#ef4444]">
                                                        Mời bạn viết bình luận.(Tối thiểu 3 ký tự)
                                                    </span>
                                                </div>
                                                <button
                                                    className="px-8 bg-[#1d48ba] text-[#fff] rounded-3xl py-1 flex mx-auto my-2"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    GỬI NGAY
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1 text-[#1d48ba]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                />
                            </svg>

                            <button className="text-sm mr-2 text-[#1d48ba]">Thích</button>
                            <span className="text-sm text-[#1d48ba]">(11)</span>
                        </div>
                    </ReviewItem>
                    <Reply
                        name="Thaont135"
                        label="Quản trị viên"
                        time="1 tuần trước"
                        content="Chào bạn Thủy !
                    Dạ khi dùng mình nên uống riêng không nên pha lẫn vào sữa ạ. Bạn vui lòng liên hệ tổng đài miễn phí 18006928 để được tư vấn và hỗ trợ. 
                    Thân mến!"
                    >
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1 text-[#1d48ba]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                />
                            </svg>

                            <button className="text-sm mr-2 text-[#1d48ba]">Thích</button>
                            <span className="text-sm text-[#1d48ba]">(11)</span>
                        </div>
                    </Reply>
                    <Reply
                        name="Thaont135"
                        label="Quản trị viên"
                        time="1 tuần trước"
                        content="Chào bạn Thủy !
                    Dạ khi dùng mình nên uống riêng không nên pha lẫn vào sữa ạ. Bạn vui lòng liên hệ tổng đài miễn phí 18006928 để được tư vấn và hỗ trợ. 
                    Thân mến!"
                    >
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1 text-[#1d48ba]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                />
                            </svg>

                            <button className="text-sm mr-2 text-[#1d48ba]">Thích</button>
                            <span className="text-sm text-[#1d48ba]">(11)</span>
                        </div>
                    </Reply>
                </div>
            </div>
        </div>
    );
}

export default Review;
