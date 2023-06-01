import { Form, Formik, useFormik } from 'formik';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { logoutSuccess } from '~/redux/authSlice';
import { changePassword, logOut } from '~/services/userServices';

function PasswordUser() {
    const [oldpwdShow, setOldPwdShow] = useState(false);
    const [newPwdShow, setNewPwdShow] = useState(false);
    const [confirmPwdShow, setConfirmPwdShow] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authentication.login.currentUser);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['access_token']);

    const formik = useFormik({
        initialValues: {
            email: user?.email,
            opwd: '',
            pwd: '',
            cpwd: '',
        },
        validationSchema: Yup.object({
            opwd: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,}$/, 'Mật khẩu không đúng định dạng'),
            pwd: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,}$/, 'Mật khẩu không đúng định dạng'),
            cpwd: Yup.string()
                .required('Thông tin bắt buộc')
                .oneOf([Yup.ref('pwd')], 'Xác nhận mật khẩu không đúng.'),
        }),
        onSubmit: (values) => {
            changePassword(user?.accessToken, user?.account, user?.email, values.opwd, values.cpwd)
                .then((response) => {
                    if (response?.data !== null) {
                        notifySuccess('Đổi mật khẩu thành công.');
                        setOldPwdShow('');
                        setNewPwdShow('');
                        setConfirmPwdShow('');
                        values.opwd = '';
                        values.pwd = '';
                        values.cpwd = '';
                        setTimeout(() => {
                            dispatch(logoutSuccess(null));
                            setCookie('accessToken', null);
                            setCookie('accountType', null);
                            logOut().then((response) => {
                                console.log(response);
                            });
                            navigate('/');
                        }, 3000);
                    }
                })
                .catch((err) => {
                    notifyWarning('Mật khẩu cũ không chính xác');
                });
        },
    });
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
        toast.warn(msg, {
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
        <>
            <h1 className="mb-4 text-[28px] font-bold text-[#1e293b]">Thay đổi mật khẩu</h1>
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
            <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                <Form className="relative  max-w-xl flex-auto animate-fadeBottomMobile">
                    <div className="relative mb-2 flex flex-col ">
                        <label htmlFor="opwd" className="text-base">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            name="opwd"
                            id="opwd"
                            type={oldpwdShow ? 'text' : 'password'}
                            className={
                                formik.touched.opwd && formik.errors.opwd
                                    ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                    : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                            }
                            onChange={formik.handleChange}
                            value={formik.values.opwd}
                        />
                        {oldpwdShow ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setOldPwdShow(!oldpwdShow)}
                            >
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setOldPwdShow(!oldpwdShow)}
                            >
                                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>
                        )}

                        {formik.touched.opwd && formik.errors.opwd ? (
                            <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                {formik.errors.opwd}
                            </span>
                        ) : null}
                    </div>
                    <div className="relative mb-1 flex flex-col">
                        <label htmlFor="pwd" className="text-base">
                            Mật khẩu mới
                        </label>
                        <input
                            name="pwd"
                            id="pwd"
                            type={newPwdShow ? 'text' : 'password'}
                            className={
                                formik.touched.pwd && formik.errors.pwd
                                    ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                    : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                            }
                            onChange={formik.handleChange}
                            value={formik.values.pwd}
                        />
                        {newPwdShow ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setNewPwdShow(!newPwdShow)}
                            >
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setNewPwdShow(!newPwdShow)}
                            >
                                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>
                        )}

                        {formik.touched.pwd && formik.errors.pwd ? (
                            <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                {formik.errors.pwd}
                            </span>
                        ) : null}
                    </div>
                    <div className="relative mb-1 flex flex-col">
                        <label htmlFor="cpwd" className="text-base ">
                            Nhập lại mật khẩu mới
                        </label>
                        <input
                            name="cpwd"
                            id="cpwd"
                            type={confirmPwdShow ? 'text' : 'password'}
                            className={
                                formik.touched.cpwd && formik.errors.cpwd
                                    ? 'mb-1 h-10 rounded-md border border-[#ff4742] px-4 py-1 outline-0'
                                    : 'mb-1 h-10 rounded-md border border-[#bebebe] px-4 py-1 outline-0'
                            }
                            onChange={formik.handleChange}
                            value={formik.values.cpwd}
                        />
                        {confirmPwdShow ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setConfirmPwdShow(!confirmPwdShow)}
                            >
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="absolute top-8 right-2 h-6 w-6 cursor-pointer text-[#b6b6b6]"
                                onClick={() => setConfirmPwdShow(!confirmPwdShow)}
                            >
                                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                            </svg>
                        )}

                        {formik.touched.cpwd && formik.errors.cpwd ? (
                            <span className="flex items-center text-sm font-bold text-[#ff4742]">
                                {formik.errors.cpwd}
                            </span>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-center rounded-b  p-6">
                        <button
                            className="mr-1 mb-1 rounded bg-[#1D48BA] px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-[#1D48BA]"
                            type="submit"
                        >
                            CẬP NHẬT
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default PasswordUser;
