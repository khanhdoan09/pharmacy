import { signInWithPopup } from 'firebase/auth';
import { Form, Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Animation } from 'react-animate-style';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import * as Yup from 'yup';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';
import { auth, provider } from '~/config/firebase';
import { loginSuccess } from '~/redux/authSlice';
import { registerByForm } from '~/services/userServices';
import { encrypt } from '~/utils/cryptoUtils';
import { useSelector } from 'react-redux';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [messageEmailExists, setMessageEmailExist] = useState(null);

    const user = useSelector((state) => state.authentication.login.currentUser);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Thông tin bắt buộc').matches("/^[A-Za-zs'-]+$/", 'Tên không đúng định dạng'),
            email: Yup.string()
                .required('Thông tin bắt buộc')
                .matches('/^[^s@]+@[^s@]+.[^s@]+$/', 'Email không đúng định dạng'),
            password: Yup.string()
                .required('Thông tin bắt buộc')
                .matches('/^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,}$/', 'Mật khẩu không đúng định dạng'),
            confirmPassword: Yup.string()
                .required('Thông tin bắt buộc')
                .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không đúng.'),
        }),
        onSubmit: (values) => {
            registerByForm(values?.name, values?.email, encrypt(values?.password)).then(
                (e) => {
                    if (e?.status === 200) {
                        localStorage.setItem('encryptedEmail', encrypt(values?.email));
                        navigate('/active-account');
                    }
                },
                (err) => {
                    if (err?.status === 409) {
                        setMessageEmailExist('email đã tồn tại');
                    } else {
                        navigate('/serverError');
                    }
                },
            );
        },
    });
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLoginWithGoogleFirebase = async () => {
        await signInWithPopup(auth, provider)
            .then((data) => {
                const name = data?.user?.displayName;
                const email = data?.user?.email;
                const accessToken = data?.user?.accessToken;
                const idToken = data?.user?.uid;
                dispatch(
                    loginSuccess({
                        username: name,
                        email: email,
                        accessToken: accessToken,
                        idToken: idToken,
                        account: 'Google',
                    }),
                );
                navigate('/');
            })
            .catch((error) => {
                console.log(error?.code);
                navigate('server-error');
            });
    };
    return (
        !user && (
            <div className="sm::bg-[#fff] my-2 flex max-w-full animate-fadeBottomMobile justify-center px-4 cs:bg-[#fff] xs:bg-[#fff] md:bg-[#f5f5f5] lg:bg-[#f5f5f5] xl:bg-[#f5f5f5] 2xl:bg-[#f5f5f5]">
                <div className="mx-auto grid max-w-[1200px] place-content-center gap-10 py-10 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                    <Animation
                        animationIn="slideInLeft"
                        isVisible
                        className="sm::bg-[#fff] rounded-xl p-8 cs:bg-[#fff] xs:bg-[#fff]  md:bg-[#f5f5f5] lg:bg-[#f5f5f5] xl:bg-[#f5f5f5] 2xl:bg-[#f5f5f5]"
                    >
                        <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                            <Form className="my-3">
                                <Animation animationIn="slideInLeft" isVisible>
                                    <h1 className="shadow-text-login border-none font-bold text-[#016cc9] cs:text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl ">
                                        Đăng ký tài khoản <br /> mua sắm tại Pharmacy
                                    </h1>
                                </Animation>
                                <div className="my-3">
                                    <label htmlFor="name" className="py-1 font-bold text-[#016cc9] ">
                                        Họ và tên
                                    </label>
                                    <input
                                        autoComplete="off"
                                        className={
                                            formik.touched.name && formik.errors.name
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        placeholder="Tên của bạn"
                                        name="name"
                                        id="name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    ></input>
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="mt-2 flex items-center text-sm font-bold text-red-600">
                                            <span className="mx-1">{formik.errors.name}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-3">
                                    <label htmlFor="email" className="py-1 font-bold text-[#016cc9] ">
                                        Địa chỉ email
                                    </label>
                                    <input
                                        autoComplete="off"
                                        className={
                                            (formik.touched.email && formik.errors.email) || messageEmailExists
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        placeholder="Ví dụ: user@gmail.com"
                                        name="email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    ></input>
                                    {(formik.touched.email && formik.errors.email) || messageEmailExists ? (
                                        <div className="mt-2 flex items-center text-sm font-bold text-red-600">
                                            <span className="mx-1">
                                                {formik.errors.email ? formik.errors.email : messageEmailExists}{' '}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="relative my-3">
                                    <label htmlFor="password" className="py-1 font-bold text-[#016cc9] ">
                                        Mật khẩu
                                    </label>
                                    <input
                                        autoComplete="off"
                                        placeholder="••••••••••"
                                        className={
                                            formik.touched.password && formik.errors.password
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        name="password"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    ></input>
                                    {formik.values.password ? (
                                        <span
                                            className="absolute top-9 right-3 cursor-pointer text-[#b6b6b6]"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
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
                                                    className="h-6 w-6"
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

                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="mt-2 flex items-center text-sm font-bold text-red-600">
                                            <span className="mx-1">{formik.errors.password}</span>
                                        </div>
                                    ) : null}
                                    <ul className="list-disc text-[13px] text-gray-500 ml-6 mt-2">
                                            <li>Ít nhất một chữ cái viết hoa</li>
                                            <li>Ít nhất một chữ cái viết thường</li>
                                            <li>Ít nhất một chữ số</li>
                                            <li>Độ dài tối thiểu là 8 ký tự</li>
                                        </ul>
                                </div>
                                <div className="relative my-3">
                                    <label htmlFor="confirmPassword" className="py-1 font-bold text-[#016cc9] ">
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        autoComplete="new-password"
                                        placeholder="••••••••••"
                                        className={
                                            formik.touched.confirmPassword && formik.errors.confirmPassword
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                    ></input>
                                    {formik.values.confirmPassword ? (
                                        <span
                                            className="absolute top-9 right-3 cursor-pointer text-[#b6b6b6]"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
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
                                                    className="h-6 w-6"
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

                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="mt-2 flex items-center text-sm font-bold text-red-600">
                                            <span className="mx-1">{formik.errors.confirmPassword}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="transition-basic shadow-button my-3 h-12 w-full select-none rounded-lg bg-sky-400 text-base font-bold text-[#fff] hover:bg-sky-500"
                                >
                                    Đăng Ký
                                </button>
                            </Form>
                        </Formik>

                        <div className="text-lg">
                            <span className="font-bold">Bạn đã có tài khoản. </span>
                            <NavLink to="/sign-in" className="cursor-pointer font-bold text-blue-800">
                                Đăng nhập ngay
                            </NavLink>
                        </div>
                        <div className="my-8 flex items-center">
                            <div className="w-2/4 border"></div>
                            <span className="mx-4">Hoặc</span>
                            <div className="w-2/4 border"></div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <img
                                className="cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                                width={58}
                                onClick={handleLoginWithGoogleFirebase}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2Fgoogle.png?alt=media&token=95e6f738-c86c-43d8-adfd-229d50412c16"
                                alt="gg"
                            />

                            <img
                                className="mx-4 cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                                width={58}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2Ffacebook.png?alt=media&token=4826baa9-1745-4e1f-9ef1-b81e7d9fae2f"
                                alt="fb"
                            />
                            <img
                                className="cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                                width={58}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2Fmicrosoft.png?alt=media&token=d0ec01c8-8e64-4445-bb99-2307f944ed74"
                                alt="msc"
                            />
                        </div>
                    </Animation>

                    <div className=" relative my-auto flex-col  justify-between rounded-xl cs:hidden xs:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
                        <Animation animationIn="slideInRight" isVisible className="rounded-xl ">
                            <Slider {...settings} className="rounded-xl">
                                <div className="rounded-xl outline-none">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/signup%2Ffemale-doctor-hospital-with-stethoscope.jpg?alt=media&token=e6188aa6-4135-483a-8cb4-fe853a884862  "
                                        alt="img"
                                        className="h-[700px] w-full rounded-xl object-cover object-center"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = placehoder600;
                                        }}
                                    />
                                </div>

                                <div className="rounded-xl outline-none">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/signup%2Fsuccessful-doctor-working-office.jpg?alt=media&token=ef37c520-93dd-4f8c-acda-e3844a860e89"
                                        alt="img"
                                        className="h-[700px] w-full rounded-xl object-cover"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = placehoder600;
                                        }}
                                    />
                                </div>
                                <div className="rounded-xl outline-none">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/signup%2Fyoung-beautiful-successful-female-doctor-with-stethoscope-isolated.jpg?alt=media&token=c2c31c54-e5f0-4568-9147-f93bbc98152d"
                                        alt="img"
                                        className="h-[700px] w-full rounded-xl object-cover object-center"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = placehoder600;
                                        }}
                                    />
                                </div>
                            </Slider>
                        </Animation>
                    </div>
                </div>
            </div>
        )
    );
}

export default SignUp;
