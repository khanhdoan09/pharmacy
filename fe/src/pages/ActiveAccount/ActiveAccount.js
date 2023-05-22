import { useState, useEffect } from 'react';
import { activeCode, sendActiveCodeAgain } from '~/services/userServices';
import { useNavigate } from 'react-router-dom';

function ActiveAccount() {
    const [code, setCode] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    const [encryptedEmail, setEncryptedEmail] = useState('');

    useEffect(() => {
        alert(localStorage.getItem('encryptedEmail'));
        setEncryptedEmail(localStorage.getItem('encryptedEmail'));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (showLoading) {
            return;
        }
        if (code === '') {
            setErrorMessage('yêu cầu nhập mã kích hoạt');
            setShowErrorMessage(true);
        } else {
            activeCode(encryptedEmail, code).then(
                (e) => {
                    if (e?.status === 200) {
                        localStorage.removeItem('encryptedEmail');
                        alert('kích hoạt tài khoản thành công');
                        navigate('/signIn');
                    }
                },
                (err) => {
                    if (err?.status === 410) {
                        setErrorMessage('mã đã hết hạn');
                    } else if (err?.status === 400) {
                        if (err?.message === "email doesn't exist") {
                            setErrorMessage('email không tồn tại');
                        } else if (err?.message === 'code is not correct') {
                            setErrorMessage('mã kích hoạt không chính xác');
                        } else if (err?.message === 'email cannot active') {
                            setErrorMessage('email không thể kích hoạt');
                        }
                    } else {
                        navigate('/serverError');
                    }
                    setShowErrorMessage(true);
                },
            );
        }
    }

    function getActiveCodeAgain() {
        if (showLoading) {
            return;
        }
        activeShowLoading();
        sendActiveCodeAgain(encryptedEmail).then(
            (e) => {
                setShowErrorMessage(false);
                unActiveShowLoading();
            },
            (err) => {
                console.log(err);
                navigate('/serverError');
            },
        );
    }

    function activeShowLoading() {
        document.body.style.overflow = 'hidden';
        setShowLoading(true);
    }

    function unActiveShowLoading() {
        document.body.style.overflow = 'block';
        setShowLoading(false);
    }

    return (
        <div className="my-5 flex w-full items-center justify-center border py-5">
            <div
                className={`absolute left-[47%] top-[45%] z-50 rounded-xl bg-[#edf0f3] p-5  ${
                    showLoading ? 'block' : 'hidden'
                }`}
            >
                <span className="flex w-full items-center justify-center ">
                    <svg className="h-16 w-16 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            className="opacity-40"
                            cx={'12'}
                            cy={'12'}
                            r="10"
                            stroke="#454545"
                            strokeWidth={'2'}
                        ></circle>
                        <path
                            fill="#FFFFFF"
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </span>
            </div>
            <div className="w-10/12">
                <div className="text-center">
                    <h1 className="my-5 text-3xl font-bold">Kích hoạt tài khoản của bạn</h1>
                </div>
                <div className="flex w-full items-center justify-center">
                    <div className="my-5 flex w-6/12 items-center justify-center border pr-5">
                        <div className="grid justify-items-center text-center">
                            <p className="text-zinc-950 pb-3 text-xl">Tạo tài khoản</p>
                            <span className="p flex items-center rounded-full border border-2 border-[rgb(90,194,248)] p-3 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="relative mt-7 flex w-2/12 items-center justify-center">
                            <div className="absolute -top-6 mt-7 flex w-[155%] items-center justify-center border"></div>
                        </div>
                        <div className="grid justify-items-center text-center">
                            <p className="text-zinc-950 pb-3 text-xl">Xác minh email</p>
                            <span className="p  flex items-center rounded-full border border-4 border-[rgb(90,194,248)] p-3 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="rgb(0,174,251)"
                                    stroke="white"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    className="h-9 w-9"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="relative mt-7 flex w-2/12 items-center justify-center">
                            <div className="absolute -top-6 -left-8 mt-7 flex w-[145%] items-center justify-center border"></div>
                        </div>
                        <div className="grid justify-items-center text-center">
                            <p className="text-zinc-950 pb-3 text-xl">Đăng nhập</p>
                            <span className="border-[rgb(162, 165, 168)] flex items-center	rounded-full border border-2 p-3 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-5 flex items-center justify-center">
                    <p>Cảm ơn bạn đã đăng kí tài khoản chúng tôi</p>
                </div>
                <form onSubmit={handleSubmit} className="my-3 flex flex-col items-center justify-center">
                    <input
                        type="text"
                        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 outline-0"
                        placeholder="mã kích hoạt"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    ></input>
                    {showErrorMessage ? <p className="text-red-600">{errorMessage}</p> : null}
                    <div className="my-5 flex items-center justify-center">
                        <button
                            type="submit"
                            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        >
                            Kích hoạt
                        </button>
                    </div>
                </form>
                <div className="my-5 flex items-center justify-center">
                    <p>Nếu bạn chưa nhận được mã? </p>
                    <p className="mx-2 cursor-pointer text-sky-800" onClick={getActiveCodeAgain}>
                        Gửi lại mã
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ActiveAccount;
