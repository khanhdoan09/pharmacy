import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [showLoader, setShowLoader] = useState(false);
    const [successfullyConfirm, setSuccessfullyConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Yêu cầu mật khẩu')
                .min(8, 'Mật khẩu quá ngắn')
                .max(16, 'Mật khẩu quá dài'),
            confirmPassword: Yup.string()
                .required('Yêu cầu xác nhận mật khẩu')
                .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không đúng.'),
        }),
        onSubmit: (values) => {
            navigate('/sign-in');
        },
    });
    return (
        <div className="max-w-[1200px] mx-auto padding-responsive overflow-hidden bg-[#fff]">
            <div className="grid place-content-center text-center border-4 border-sky-200 rounded-3xl my-4 py-8">
                <div className="p4-8 px-16">
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
                    <p className="text-3xl my-5">Tạo lại mật khẩu của bạn</p>
                    <div className="w-full flex justify-center">
                        <div className="w-4/5 h-4 border-t-2"></div>
                    </div>
                    <p>
                        Hãy kiểm tra email của bạn và nhập mã số xác nhận để tạo
                        lại mật khẩu
                    </p>
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
                    ) : successfullyConfirm ? null : (
                        <input
                            onClick={() => {
                                setShowLoader(true);
                                setTimeout(() => {
                                    setShowLoader(false);
                                    setSuccessfullyConfirm(true);
                                }, 1500);
                            }}
                            placeholder="Nhập mã xác nhận"
                            className="cursor-pointer text-center outline-0 bg-blue-100 hover:bg-sky-200  ring-2 my-8 py-2 px-8 rounded-xl border w-6/12"
                        ></input>
                    )}
                </div>
                {successfullyConfirm ? (
                    <Formik
                        initialValues={formik.initialValues}
                        onSubmit={formik.handleSubmit}
                    >
                        <Form>
                            <div className="my-3 relative">
                                <input
                                    autoComplete="off"
                                    placeholder="Mật khẩu của bạn"
                                    className="block h-12 outline-0 rounded-xl w-full border-b focus:border-b-2 focus:border-sky-500 duration-100 ease-in px-2"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                ></input>
                                {formik.values.password ? (
                                    <span
                                        className="text-zinc-600 absolute top-3 right-2 cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
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
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
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
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                ) : null}

                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <span className="flex items-center mt-2 text-red-600 text-sm">
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
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <span className="mx-1">
                                            {formik.errors.password}
                                        </span>
                                    </span>
                                ) : null}
                            </div>
                            <div className="my-3 relative">
                                <input
                                    autoComplete="new-password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="block h-12 outline-0 rounded-xl w-full border-b focus:border-b-2 focus:border-sky-500 duration-100 ease-in px-2 "
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                ></input>
                                {formik.values.confirmPassword ? (
                                    <span
                                        className="text-zinc-600 absolute top-3 right-2 cursor-pointer"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
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
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
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
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                ) : null}

                                {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword ? (
                                    <span className="flex items-center mt-2 text-red-600 text-sm">
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
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <span className="mx-1">
                                            {formik.errors.confirmPassword}
                                        </span>
                                    </span>
                                ) : null}
                            </div>
                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    className="my-3 px-4 py-2 bg-sky-400 hover:bg-sky-800 text-white text-x rounded-xl"
                                >
                                    Lưu
                                </button>
                            </div>
                        </Form>
                    </Formik>
                ) : null}
            </div>
        </div>
    );
}

export default ForgotPassword;
