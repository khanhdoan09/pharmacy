import { useState } from 'react';
import SliderImageDetail from '../SliderImageDetail';
import { Animation } from 'react-animate-style';

function MainDetail() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <div className="main-detail !grid gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 ">
            <SliderImageDetail />

            <div className="text px-1 animate-fadeBottomMobile">
                <div className="header-text border-b pb-4 ">
                    <p className="text-base">
                        Thương hiệu:
                        <span className="uppercase text-[#1d48ba]"> Thành công</span>
                    </p>
                    <h3 className="text-[28px] font-bold text-[#072d94]">
                        Viên uống Trùng Thảo Gold Thành Công hỗ trợ dễ ngủ, ngủ sâu giấc (30 viên)
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-[#b6c0d7]">(00032348)</span>
                        <div className="text-sm">
                            <span className="cursor-pointer border-r border-[#bb91a5] px-2 hover:underline">
                                0 đánh giá
                            </span>
                            <span className="cursor-pointer px-2 hover:underline">23 bình luận</span>
                        </div>
                    </div>
                </div>
                <div className="center-text pt-4">
                    <div className="price">
                        <h3 className="text-[32px] font-bold">
                            173.000đ &#8260; <span className="text-2xl font-normal text-[#1e293b]">Hộp</span>
                        </h3>
                    </div>
                    <div className="mt-4 flex items-center">
                        <p className="mr-2">Đơn vị bán: </p>

                        <div className="select-unit">
                            <div className="unit-item flex items-center ">
                                <div
                                    onClick={() => toggleTab(1)}
                                    className={
                                        toggleState === 1
                                            ? ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-transparent bg-[#1d48ba] px-2 py-1 text-sm font-bold text-[#fff] hover:-translate-y-1'
                                            : ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-[#1d48ba] bg-transparent px-2 py-1 text-sm font-bold hover:-translate-y-1'
                                    }
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2800/2800607.png"
                                        className="mr-2 h-5 w-5 select-none object-cover"
                                        alt=""
                                    />
                                    <p>Hộp</p>
                                </div>
                                <div
                                    onClick={() => toggleTab(2)}
                                    className={
                                        toggleState === 2
                                            ? ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-transparent bg-[#1d48ba] px-2 py-1 text-sm font-bold text-[#fff] hover:-translate-y-1'
                                            : ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-[#1d48ba] bg-transparent px-2 py-1 text-sm font-bold hover:-translate-y-1'
                                    }
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/4005/4005690.png"
                                        className="mr-2 h-5 w-5 select-none object-cover"
                                        alt=""
                                    />
                                    <p>Gói</p>
                                </div>
                                <div
                                    onClick={() => toggleTab(3)}
                                    className={
                                        toggleState === 3
                                            ? ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-transparent bg-[#1d48ba] px-2 py-1 text-sm font-bold text-[#fff] hover:-translate-y-1'
                                            : ' transition-basic mr-2 flex cursor-pointer items-center rounded-lg border border-[#1d48ba] bg-transparent px-2 py-1 text-sm font-bold hover:-translate-y-1'
                                    }
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/4625/4625809.png"
                                        className="mr-2 h-5 w-5 select-none object-cover"
                                        alt=""
                                    />
                                    <p>Viên</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category mt-4">
                        <p className="font-bold">
                            Danh mục: &#160;
                            <span className="cursor-pointer font-normal text-[#1d48ba] hover:underline">
                                Hỗ trợ giấc ngủ ngon
                            </span>
                        </p>
                    </div>
                    <p className="mt-4 font-bold">
                        Quy cách: &#160;
                        <span className="font-normal">Hộp 30 viên</span>
                    </p>
                    <p className="mt-4 font-bold">
                        Nhà sản xuất: &#160;
                        <span className="font-normal">CÔNG TY DƯỢC PHẨM VÀ THƯƠNG MẠI THÀNH CÔNG - TNHH</span>
                    </p>
                    <p className="mt-4 font-bold">
                        Công dụng: &#160;
                        <span className="text-justify font-normal">
                            Trùng Thảo Gold hỗ trợ dễ ngủ, ngủ sâu giấc trong các trường hợp mất ngủ, ngủ kém. Hỗ trợ
                            tăng cường sức khỏe, nâng cao sức đề kháng.
                        </span>
                    </p>

                    <div className="mt-4 flex items-center">
                        <p className="font-bold">Chọn số lượng &#160;</p>
                        <div className="modify-quantity flex items-center ">
                            <button className="h-9 rounded-l-3xl border  px-[6px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </button>
                            <input
                                className="h-9 w-10 border text-center outline-none hover:border-[#807b7b]"
                                placeholder="1"
                            />
                            <button className="h-9 rounded-r-3xl border  px-[6px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* button buy */}
                    <div className="mt-4 flex items-center ">
                        <button className="animate__fadeInUpBig mr-4 h-[56px] max-w-full grow basis-0 rounded-[100px] bg-[#1d48ba] text-[20px] font-bold uppercase	text-[#fff]">
                            Chọn mua
                        </button>
                        <button className="h-[56px] rounded-[100px] bg-[#f59e0b] px-[36px] font-bold uppercase text-[#fff]">
                            Tìm nhà thuốc
                        </button>
                    </div>
                    <div className="commit mt-4 rounded-2xl border">
                        <div className="commit-header">
                            <p className="border-b py-3 text-center font-bold uppercase">NHÀ THUỐC LONG CHÂU CAM KẾT</p>
                        </div>
                        <div className="commits flex items-center justify-between px-3 py-3">
                            <div className="commit-item flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mb-2 h-11 w-11 rounded-full bg-[#e1e9ff] px-2 py-2 text-[#1d48ba]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                <p className="font-bold">Đổi trả trong 30 ngày</p>
                                <p>kể từ ngày mua hàng</p>
                            </div>
                            <div className="commit-item flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mb-2 h-11 w-11 rounded-full bg-[#e1e9ff] px-2 py-2 text-[#1d48ba]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                    />
                                </svg>

                                <p className="font-bold">Miễn phí 100%</p>
                                <p>đổi thuốc</p>
                            </div>
                            <div className="commit-item flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mb-2 h-11 w-11 rounded-full bg-[#e1e9ff] px-2 py-2 text-[#1d48ba]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                    />
                                </svg>

                                <p className="font-bold">Miễn phí vận chuyển</p>
                                <p>theo chính sách giao hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDetail;
