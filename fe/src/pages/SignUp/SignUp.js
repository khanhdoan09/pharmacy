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

    useEffect(()=>{
        if (user) {
            navigate("/")
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Yêu cầu đặt tên người dùng').min(4, 'Tên quá ngắn').max(16, 'Tên quá dài'),
            email: Yup.string().email('Email không hợp lệ').required('Yêu cầu email'),
            password: Yup.string().required('Yêu cầu mật khẩu').min(8, 'Mật khẩu quá ngắn').max(16, 'Mật khẩu quá dài'),
            confirmPassword: Yup.string()
                .required('Yêu cầu xác nhận mật khẩu')
                .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không đúng.'),
        }),
        onSubmit: (values) => {
            registerByForm(values?.name, values?.email, encrypt(values?.password)).then(
                (e) => {
                    if (e?.status === 200) {
                        localStorage.setItem('encryptedEmail', encrypt(values?.email));
                        navigate('/activeAccount');
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
                navigate('/server_error');
            });
    };
    return (
        !user &&
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
                        <NavLink to="/signIn" className="cursor-pointer font-bold text-blue-800">
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
                            src="data:image/png;base64,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"
                            alt=""
                        />

                        <img
                            className="mx-4 cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                            width={58}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                            alt=""
                        />
                        <img
                            className="cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                            width={58}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8ig7Ys914TypBbWofcsBDRQe9Ha2jIa2z4PEyPHVPw&s"
                            alt=""
                        />
                    </div>
                </Animation>

                <div className=" relative my-auto flex-col  justify-between rounded-xl cs:hidden xs:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
                    <Animation animationIn="slideInRight" isVisible className="rounded-xl ">
                        <Slider {...settings} className="rounded-xl">
                            <div className="rounded-xl outline-none">
                                <img
                                    src="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?w=2000"
                                    alt="img"
                                    className="h-[700px] rounded-xl object-cover object-center"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = placehoder600;
                                    }}
                                />
                            </div>

                            <div className="rounded-xl outline-none">
                                <img
                                    src="https://images.everydayhealth.com/images/how-menopause-worsens-rheumatoid-arthritis-alt-1440x810.jpg?sfvrsn=b247f01d_1"
                                    alt="img"
                                    className="h-[700px] rounded-xl object-cover object-center"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = placehoder600;
                                    }}
                                />
                            </div>
                            <div className="rounded-xl outline-none">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88433.jpg"
                                    alt="img"
                                    className="h-[700px] rounded-xl object-cover object-center"
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
    );
}

export default SignUp;
