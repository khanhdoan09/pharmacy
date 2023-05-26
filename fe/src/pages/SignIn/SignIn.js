import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import CryptoJS from 'crypto-js';
import { signInWithPopup } from 'firebase/auth';
import { Form, Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Animation } from 'react-animate-style';
import { useCookies } from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginRequest } from '~/config/authConfig';
import { auth, provider } from '~/config/firebase';
import { loginSuccess } from '~/redux/authSlice';
import { addMedicinesToCart } from '~/redux/cartSlice';
import { getAllMedicinesInCart } from '~/services/cartServices';
import { loginNormal, loginWithAccessToken, registerWithAccessToken } from '~/services/userServices';

function SignIn() {
    const user = useSelector((state) => state.authentication.login.currentUser);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['access_token']);
    const [msgLoginFail, setMsgLoginFail] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Thông tin bắt buộc')
                .matches('/^[^s@]+@[^s@]+.[^s@]+$/', 'Email không đúng định dạng'),
            password: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(
                    '/^(?=.*[A-Z])(?=.*[a-z])(?=.*d).{8,}$/',
                    'Mật khẩu không đúng định dạng',
                ),
        }),
        onSubmit: (values) => {
            const encryptedPassword = '' + encrypt(values?.password);
            loginNormal(values?.email, encryptedPassword)
                .then((response) => {
                    setMsgLoginFail('');
                    if (response?.data !== null) {
                        dispatch(
                            loginSuccess({
                                id: response?.data?.id,
                                username: response?.data?.name,
                                email: response?.data?.email,
                                accessToken: response?.data?.jwt,
                                account: 'Normal',
                                role: response?.data?.role,
                            }),
                        );
                        setCookieLogin(response?.data?.jwt, 'Normal');
                        navigate('/');
                    }
                    console.log(response?.data);
                })
                .catch((error) => {
                    setMsgLoginFail('Sai thông tin đăng nhập');
                    console.log(error);
                });
        },
    });

    const { instance, accounts } = useMsal();

    const handleLoginWithGoogleFirebase = async () => {
        await signInWithPopup(auth, provider)
            .then((data) => {
                console.log(data);
                const name = data?.user?.displayName;
                const email = data?.user?.email;
                const accessToken = data?.user?.accessToken;
                const idToken = data?.user?.uid;
                const avatar = data?.user?.photoURL;
                dispatch(
                    loginSuccess({
                        username: name,
                        email: email,
                        accessToken: accessToken,
                        idToken: idToken,
                        account: 'Google',
                        role: 'client',
                    }),
                );
                setCookieLogin(accessToken, 'Google');
                registerWithAccessToken(accessToken, 'Google');
                navigate('/');
            })
            .catch((error) => {
                console.log(error?.code);
                navigate('server-error');
            });
    };

    const handleLoginWithMicrosoft = () => {
        instance
            .loginPopup(loginRequest)
            .then((e) => {
                const name = e?.account?.name;
                const email = e?.account?.username;
                const accessToken = e?.accessToken;
                dispatch(
                    loginSuccess({
                        username: name,
                        email: email,
                        accessToken: accessToken,
                        account: 'Microsoft',
                    }),
                );
                setCookieLogin(accessToken, 'Microsoft');
                registerWithAccessToken(accessToken, 'Microsoft');
                setUpCartForUser();
                navigate('/');
            })
            .catch((e) => {
                console.log(e);
                navigate('server-error');
            });
    };

    const handleErrorLoginWithFacebook = () => {
        console.log(213);
        navigate('server-error');
    };

    const handleLoginWithFacebook = (response) => {
        dispatch(
            loginSuccess({
                username: response?.name,
                accessToken: response?.accessToken,
                avatar: response?.picture?.data?.url,
                account: 'Facebook',
            }),
        );
        setCookieLogin(response?.accessToken, 'Facebook');
        registerWithAccessToken(response?.accessToken, 'Facebook');
        setUpCartForUser();
        navigate('/');
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        const accountType = cookies.accountType;
        const accessToken = cookies.accessToken;
        if (accountType && accessToken) {
            // handleLoginWithAccessToken(accessToken, accountType).then(
            //     () => {
            //         navigate('/');
            //     },
            //     (e) => {
            //         console.log('cannot login with cookie');
            //     },
            // );
        }
    }, []);

    function handleLoginWithAccessToken(accessToken, accountType) {
        if (accessToken === 'null' || accountType === 'null') {
            return Promise.reject('fail');
        }
        return loginWithAccessToken(accessToken, accountType).then(
            (response) => {
                const statusCode = response?.data?.status;
                if (statusCode === 200) {
                    dispatch(
                        loginSuccess({
                            username: response?.data?.data,
                            email: '',
                            accessToken: accessToken,
                            account: accountType,
                        }),
                    );
                }
            },
            (err) => {
                const statusCode = err?.status;
                if (statusCode === 401) {
                    if (err?.status === 'token has expired') {
                        console.log('expired');
                        handleRefreshTokenToGetNewAccessToken(accountType);
                    } else {
                        navigate('/sign-in');
                    }
                } else {
                    navigate('server-error');
                }
            },
        );
    }

    function handleRefreshTokenToGetNewAccessToken(accountType) {
        if (accountType === 'Microsoft') {
            const accessTokenRequest = {
                scopes: ['api://a0009c06-17e5-438c-8fa8-a076d28644ce/user.read'],
                account: accounts[0],
            };
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    handleLoginWithAccessToken(accessTokenResponse.accessToken, accountType).then(() => {
                        navigate('/');
                        setCookieLogin(accessTokenResponse.accessToken, accountType);
                    });
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(accessTokenRequest);
                    }
                    console.log(error);
                });
        }
    }

    function setCookieLogin(accessToken, accountType) {
        setCookie('accessToken', accessToken, { path: '/', maxAge: 31536000 }); // 1 year
        setCookie('accountType', accountType, { path: '/', maxAge: 31536000 });
    }

    function setUpCartForUser() {
        getAllMedicinesInCart().then((e) => {
            dispatch(addMedicinesToCart({ medicines: e?.data?.data }));
        });
    }

    function encrypt(password) {
        const key = CryptoJS.enc.Latin1.parse('1234567812345678');
        const iv = CryptoJS.enc.Latin1.parse('1234567812345678');
        var encrypted = CryptoJS.AES.encrypt(password, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
        });
        return encrypted;
    }

    return (
        !user && (
            <div className="max-w-full py-10">
                <div className="padding-responsive mx-auto grid max-w-[1200px] gap-4 cs:grid-cols-1 xs:grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-3 ">
                    <div className="relative my-auto flex flex-col  justify-between cs:col-span-1 xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2  2xl:col-span-2">
                        <Animation animationIn="slideInLeft" isVisible>
                            <h1 className="shadow-text-login border-none text-5xl font-bold text-[#016cc9] cs:hidden xs:hidden sm:hidden md:block lg:block xl:block 2xl:block">
                                Đăng nhập để <br /> mua sắm tại Pharmacy
                            </h1>
                            <h3 className="mt-8 text-xl font-bold text-[#868484] line-clamp-1">
                                Nếu bạn chưa có tài khoản
                            </h3>
                            <div className="text-xl font-bold text-[#868484]">
                                Bạn có thể
                                <NavLink className="text-xl font-bold text-[#016cc9] transition-all " to="/sign-up">
                                    &#160;Đăng Ký Tại Đây!
                                </NavLink>
                            </div>
                        </Animation>
                        <Animation
                            animationIn="fadeInDown"
                            isVisible
                            className="absolute -top-20 right-0 -z-10 w-[300px] object-cover object-center cs:hidden xs:block sm:block md:block lg:block xl:block 2xl:block"
                        >
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/signup%2Fyoung-beautiful-successful-female-doctor-with-stethoscope-isolated.jpg?alt=media&token=c2c31c54-e5f0-4568-9147-f93bbc98152d"
                                alt="doctor"
                            />
                        </Animation>
                    </div>

                    <Animation animationIn="slideInRight" isVisible className=" rounded-xl">
                        <Formik className="my-3" initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
                            <Form className="my-3">
                                {msgLoginFail.length > 0 ? (
                                    <div className="mb-2 flex h-10 items-center justify-center rounded-lg bg-[#f18b8b]">
                                        <p className="text-center ">{msgLoginFail}</p>
                                    </div>
                                ) : null}

                                <div className="pb-2">
                                    <label className="py-1 font-bold text-[#016cc9]">Email</label>
                                    <input
                                        autoComplete="off"
                                        className={
                                            formik.touched.email && formik.errors.email
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        placeholder="Ví dụ: user@gmail.com"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    ></input>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="mt-2 flex items-center text-sm font-bold text-red-600">
                                            <span className="mx-1">{formik.errors.email}</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="relative">
                                    <label className="py-1 font-bold text-[#016cc9]">Mật khẩu</label>
                                    <input
                                        autoComplete="off"
                                        placeholder="••••••••••"
                                        className={
                                            formik.touched.password && formik.errors.password
                                                ? 'focus:shadow-input transition-basic h-12 w-full rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                                : 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#f5f5f5] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#d6d0d0]'
                                        }
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    ></input>
                                    
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
                                    <div
                                        className="mt-1 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center">
                                            <input type="checkbox" id="showPassword" name="showPassword"  onClick={() => setShowPassword(!showPassword)}/>
                                            <label htmlFor="showPassword" className="ml-2">
                                                Hiện mật khẩu
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <NavLink
                                    to="/reset-password"
                                    className="transition-basic cursor-pointer select-none   text-zinc-500 hover:underline "
                                >
                                    <p className="hover:transition-basic py-1">Quên mật khẩu</p>
                                </NavLink>
                                <button
                                    type="submit"
                                    className="transition-basic shadow-button my-3 h-12 w-full select-none rounded-lg bg-sky-400 text-base font-bold text-[#fff] hover:bg-sky-500"
                                >
                                    Đăng Nhập
                                </button>
                            </Form>
                        </Formik>

                        <div className="my-8 flex items-center">
                            <div className="w-2/4 border"></div>
                            <span className="mx-4">Hoặc</span>
                            <div className="w-2/4 border"></div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <img
                                onClick={handleLoginWithGoogleFirebase}
                                className="cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                                width={58}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2Fgoogle.png?alt=media&token=95e6f738-c86c-43d8-adfd-229d50412c16"
                                alt="gg"
                            />

                            <FacebookLogin
                                appId="1298203157783120"
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,user_friends, email"
                                callback={handleLoginWithFacebook}
                                icon="fa-facebook"
                                textButton=""
                                returnScopes="true"
                                onFailure={handleErrorLoginWithFacebook}
                                cssClass="cursor-pointer rounded-full border-sky-300 duration-300 hover:border-4 hover:ease-in w-[58px] h-full text-[34px] hover:text-[30px] text-sky-600 mx-3"
                            />

                            <img
                                onClick={handleLoginWithMicrosoft}
                                className="cursor-pointer rounded-full border-sky-300 p-2 duration-300 hover:border-4 hover:ease-in"
                                width={58}
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2Fmicrosoft.png?alt=media&token=d0ec01c8-8e64-4445-bb99-2307f944ed74"
                                alt="msc"
                            />
                        </div>
                    </Animation>
                </div>
            </div>
        )
    );
}

export default SignIn;
