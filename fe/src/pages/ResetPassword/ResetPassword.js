import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as userService from '~/services/userServices';
import * as verifyService from '~/services/verifyService';
import { notifyWarning } from '~/utils/toastUtils';
function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isOpenOtp, setIsOpenOtp] = useState(false);
    const [isOpenNewPassword, setIsOpenNewPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [successOtp, setSuccessOtp] = useState('');

    const [timeLeft, setTimeLeft] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        if (timeLeft <= 0) {
            setShowResendButton(true);
        }
        if (timeLeft === 0) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isOpenOtp) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [isOpenOtp]);
    const [alert, setAlert] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setErrorPassword('Mật khẩu cần có ít nhất 6 ký tự');
        } else if (password !== confirmPassword) {
            setErrorPassword('Mật khẩu không khớp');
        } else {
            setErrorPassword('');
            await verifyService
                .resetPassword(confirmPassword, email)
                .then((response) => {
                    console.log(response);
                    if (response?.status === 200) {
                        setIsOpenNewPassword(false);
                        setIsSuccess(true);
                    } else {
                        setIsOpenNewPassword(true);
                        setIsSuccess(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="max-w-full">
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
            <div className="padding-responsive mx-auto max-w-[1200px]">
                {isOpenOtp && (
                    <>
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                            <div className="relative top-1/2 mx-auto w-full max-w-xl -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setIsOpenOtp(false)}
                                        className="absolute top-0 right-0 my-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Đóng
                                    </button>
                                    <h2 className="mb-4 text-xl font-semibold">Xác Thực OTP</h2>
                                </div>
                                <div className="">
                                    <div className="p-6">
                                        <form>
                                            <div className="mb-4">
                                                <p
                                                    htmlFor="rating"
                                                    className=" mb-2 block text-center font-medium text-slate-700"
                                                >
                                                    Mã OTP đã được gửi đến email {email}
                                                </p>
                                                {timeLeft ? (
                                                    <p
                                                        htmlFor="rating"
                                                        className=" mb-2 block text-center font-medium text-slate-700"
                                                    >
                                                        Mã OTP có hiệu lực trong vòng {formatTime(timeLeft)}
                                                    </p>
                                                ) : (
                                                    <p className="text-center font-medium text-red-400">
                                                        Mã OTP đã hết thời gian sử dụng
                                                    </p>
                                                )}

                                                <label htmlFor="email">
                                                    <input
                                                        id="otp"
                                                        name="otp"
                                                        type="text"
                                                        className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-blue-500 focus:outline-none"
                                                        placeholder="Nhập mã OTP của bạn"
                                                        onChange={(e) => {
                                                            setOtp(e.target.value);
                                                        }}
                                                    />
                                                </label>
                                            </div>

                                            <button
                                                type="button"
                                                className="mx-auto flex rounded bg-blue-500 py-2 px-4 font-bold uppercase text-white hover:bg-blue-700"
                                                onClick={async () => {
                                                    if (timeLeft) {
                                                        await verifyService
                                                            .verificationCode(otp, email)
                                                            .then((response) => {
                                                                if (response?.status === 200) {
                                                                    setIsOpenOtp(false);
                                                                    setIsOpenNewPassword(true);
                                                                    setSuccessOtp('');
                                                                } else {
                                                                    setIsOpenOtp(true);
                                                                    setIsOpenNewPassword(false);
                                                                    notifyWarning('Mã OTP không hợp lệ');
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                setIsOpenOtp(true);
                                                                setIsOpenNewPassword(false);
                                                            });
                                                    }
                                                }}
                                            >
                                                XÁC NHẬN
                                            </button>
                                            {showResendButton ? (
                                                <p
                                                    className=" mt-4 cursor-pointer text-center font-medium text-blue-500"
                                                    onClick={async () => {
                                                        setTimeLeft(60);
                                                        setShowResendButton(false);
                                                        await verifyService.generateCode(email);
                                                    }}
                                                >
                                                    Gửi lại mã OTP cho tôi
                                                </p>
                                            ) : (
                                                <p className="mt-4 text-center font-medium">
                                                    Sau 1 phút mới gửi yêu cầu lấy mã
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isOpenNewPassword && (
                    <>
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                            <div className="relative top-1/2 mx-auto w-full max-w-xl -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setIsOpenNewPassword(false)}
                                        className="absolute top-0 right-0 my-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Đóng
                                    </button>
                                    <h2 className="mb-4 text-xl font-semibold">Khởi Tạo Mật Khẩu</h2>
                                </div>
                                <div className="">
                                    <div className="p-6">
                                        <div>
                                            <form className="mb-4">
                                                <p
                                                    htmlFor="rating"
                                                    className=" mb-2 block text-center font-medium text-slate-700"
                                                >
                                                    Mật khẩu có ít nhất 6 ký tự và tối đa 16 ký tự
                                                </p>

                                                <label htmlFor="password">
                                                    <p className=" font-medium text-slate-700">Mật khẩu mới</p>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="text"
                                                        className="mb-2 w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-blue-500 focus:outline-none"
                                                        placeholder="Nhập mật khẩu mới"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </label>
                                                <label htmlFor="confirm-password">
                                                    <p className="font-medium text-slate-700">Nhập lại mật khẩu mới</p>
                                                    <input
                                                        id="confirm-password"
                                                        name="confirm-password"
                                                        type="text"
                                                        className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-blue-500 focus:outline-none"
                                                        placeholder="Nhập lại mật khẩu mới"
                                                        onChange={(e) => {
                                                            setConfirmPassword(e.target.value);
                                                        }}
                                                    />
                                                    <p className="mt-1 font-medium text-[#fc6969]">{errorPassword}</p>
                                                </label>
                                            </form>

                                            <button
                                                type="submit"
                                                className="mx-auto flex rounded bg-blue-500 py-2 px-4 font-bold uppercase text-white hover:bg-blue-700"
                                                onClick={handleSubmit}
                                            >
                                                XÁC NHẬN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isSuccess && (
                    <>
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                            <div className="relative top-1/2 mx-auto w-full  max-w-xl -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                <div className="flex items-center justify-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="mt-4 mb-2 h-16 w-16 animate-bounce text-green-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                            />
                                        </svg>
                                        <h2 className="mb-4 select-none text-center text-2xl font-semibold">
                                            Đổi Mật Khẩu Thành Công
                                        </h2>
                                        <NavLink
                                            to="/sign-in"
                                            className="select-none rounded-md bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-blue-600"
                                        >
                                            Quay về trang đăng nhập
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="my-10 mx-auto max-w-lg">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="email">
                            <p className="pb-2 font-medium text-slate-700">Địa chỉ email</p>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-blue-500 focus:outline-none"
                                placeholder="Nhập địa chỉ email của bạn"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <p className="mt-1 font-medium text-[#fc6969]">{alert}</p>
                        </label>
                        <button
                            className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-blue-500 bg-blue-600 py-3 font-medium text-white hover:bg-blue-500 hover:shadow"
                            type="button"
                            onClick={async () => {
                                if (email.length > 5) {
                                    await userService
                                        .findUserByEmail(email)
                                        .then((response) => {
                                            const res = response.data.data;
                                            if (res.accountType === 'Normal') {
                                                setAlert('');
                                                setIsOpenOtp(true);
                                                setTimeLeft(60);
                                                verifyService.generateCode(email);
                                            }else{
                                                setAlert('Bạn có thể dùng tài khoản liên kết để đăng nhập');
                                            }
                                        })
                                        .catch((error) => {
                                            setAlert('Không tìm thầy tài khoản phù hợp với email');
                                            setIsOpenOtp(false);
                                            setIsOpenNewPassword(false);
                                        });
                                } else {
                                    setAlert('Vui lòng điền địa chỉ email chính xác');
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                />
                            </svg>
                            <span>Đặt lại mật khẩu</span>
                        </button>
                        <p className="text-center">
                            Bạn chưa có tài khoản?
                            <NavLink
                                to="/sign-up"
                                className="inline-flex items-center space-x-1 font-medium text-indigo-600"
                            >
                                <span>Đăng Ký Ngay</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </span>
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
