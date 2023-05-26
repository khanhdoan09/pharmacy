import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ConfirmEmail() {
    const [showLoader, setShowLoader] = useState(false);
    const [successfullyConfirm, setSuccessfullyConfirm] = useState(false);

    return (
        <div className="max-w-[1200px] mx-auto padding-responsive overflow-hidden bg-[#fff]">
            <div className="grid place-content-center text-center border-4 border-sky-200 rounded-3xl my-4 py-8">
                <div className="py-8 px-16">
                    <span className="flex justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="rgb(12 74 110)"
                            className="w-24 h-24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                            />
                        </svg>
                    </span>
                    <p className="text-3xl my-5">Xác nhận email của bạn</p>
                    <div className="w-full flex justify-center">
                        <div className="w-4/5 h-4 border-t-2"></div>
                    </div>
                    <p>Một khi xác nhận thành công, email này xác được liên kết với tài khoản Long Châu của bạn</p>
                    <p>Hãy kiểm tra email của bạn và nhập mã số xác nhận</p>
                </div>
                <div>
                    {showLoader ? (
                        <div className="w-full flex justify-center">
                            <svg
                                aria-hidden="true"
                                class="w-20 h-20 my-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    ) : successfullyConfirm ? (
                        <div className="flex justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="rgb(12 74 110)"
                                className="w-24 h-24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                />
                            </svg>
                        </div>
                    ) : (
                        <input
                            onClick={() => {
                                setShowLoader(true);
                                setTimeout(() => {
                                    setShowLoader(false);
                                    setSuccessfullyConfirm(true);
                                }, 1500);
                            }}
                            placeholder="Nhập mã xác nhận"
                            className="cursor-pointer outline-0 bg-blue-100 hover:bg-sky-200 ring-2 my-8 py-2 px-8 rounded-xl border w-6/12"
                        ></input>
                    )}
                </div>
                {successfullyConfirm ? (
                    <div className="">
                        <p>Xác nhận thành công</p>
                        <NavLink to="/sign-in" className="cursor-pointer text-emerald-500 text-xl">
                            Quay về trang đăng nhập
                        </NavLink>
                    </div>
                ) : (
                    <div className="px-16">
                        <p>Mã xác nhận này chỉ có giá trị trong 3 phút</p>
                        <p className="my-1">
                            Không nhận được mã ?
                            <span className="text-blue-900 text-center px-1 font-bold cursor-pointer">
                                Gửi lại mã xác nhận
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConfirmEmail;
