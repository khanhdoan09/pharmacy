import { useMsal } from '@azure/msal-react';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import bgLeftMenu from '~/assets/img/bg/bg-left-menu.jpg';
import CartHeader from '~/components/CartHeader/CartHeader';
import ResultSearchItem from '~/components/ResultSearchItem';
import useDebounce from '~/hooks/useDebounce';
import { logoutSuccess } from '~/redux/authSlice';
import { removeMedicinesFromCart } from '~/redux/cartSlice';
import * as searchService from '~/services/searchServices';
import { logOut } from '~/services/userServices';
import { encrypt } from '~/utils/cryptoUtils';
import { convertNumberToPrice } from '~/utils/currency';

function HeaderSearch() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.authentication.login.currentUser);
    const cart = useSelector((state) => state.cart?.medicines);
    const dispatch = useDispatch();
    const [showItemMobile, setShowItemMobile] = useState(false);
    const [showMenuMobiles, setShowMenuMobiles] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const { instance } = useMsal();

    //search logic
    const [keyword, setKeyword] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const inputRef = useRef();
    const [page, setPage] = useState(0);
    const [pageSize] = useState(3); // total product appear one page
    const [cookies, setCookie] = useCookies(['access_token']);
    const fields = useSelector((state) => state.fields.fields);
    const categories = useSelector((state) => state.categories.categories);
    const debouncedSearchTerm = useDebounce(keyword, 800);

    const toogleLock = () => {
        setShowMenuMobiles(!showMenuMobiles);
    };

    useEffect(() => {
        const fetchApi = async () => {
            if (keyword?.length > 0) {
                const result = await searchService.search(keyword, page, pageSize);
                setResultSearch(result?.data);
            }
        };

        fetchApi();
    }, [debouncedSearchTerm, page]);

    //set page 0 when keyword change
    useEffect(() => {
        setPage(0);
    }, []);

    const handleNewPrice = (price, discount) => {
        return parseInt(price) - (parseInt(price) * discount) / 100;
    };

    const auth = getAuth();
    const handleSignOutWithGoogleFirebase = async () => {
        await signOut(auth)
            .then(() => {
                dispatch(logoutSuccess(null));
                dispatch(removeMedicinesFromCart());
                setCookie('accessToken', null);
                setCookie('accountType', null);
            })
            .catch((err) => {
                console.log('Lỗi đăng xuất google');
                console.log(err?.code);
                navigate('server-error');
            });
    };

    const handleSignOutWithNormal = async () => {
        dispatch(logoutSuccess(null));
        dispatch(removeMedicinesFromCart());
        setCookie('accessToken', null);
        setCookie('accountType', null);
        await logOut().then((response) => {
            console.log(response);
        });
    };

    function handleSignOutWithMicrosoft() {
        instance
            .logoutPopup({
                postLogoutPopupUri: '/sign-in',
            })
            .then(
                () => {
                    dispatch(logoutSuccess(null));
                    dispatch(removeMedicinesFromCart());
                    setCookie('accessToken', null);
                    setCookie('accountType', null);
                    logOut();
                },
                (err) => {
                    navigate('server-error');
                },
            );
    }

    const [fieldId, setFieldId] = useState('');
    const [categoryByFieldId, setCategoryByFieldId] = useState([]);
    useEffect(() => {
        const filteredCategory = categories?.data?.filter((c) => c.field === fieldId);
        setCategoryByFieldId(filteredCategory);
    }, [fieldId]);

    const backgroundImage =
        'url("https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/header%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=d2b42b7e-12e5-440f-9932-e156b6751b66")';

    function signOutAccount() {
        setCookie('accessToken', null);
        setCookie('accountType', null);
        navigate('/sign-in');
        dispatch(removeMedicinesFromCart());
    }

    return (
        <div className="wrapper h-20 bg-cover bg-center" style={{ backgroundImage }}>
            <div className="padding-responsive m-auto h-20 max-w-[1200px] items-center justify-between cs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex ">
                <NavLink to="/">
                    <img src="https://cdn1.nhathuoclongchau.com.vn/logo_front_big_c58fec2dc9.svg" alt="logo" />
                </NavLink>

                <div className="relative flex w-1/2 items-center">
                    <input
                        ref={inputRef}
                        placeholder="Nhập tìm thuốc..."
                        name="search"
                        id="search"
                        value={keyword}
                        onChange={(e) => {
                            if (e.target.value?.length > 0) {
                                setKeyword(e.target.value);
                            } else {
                                setKeyword('');
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                navigate(`/search/keyword=${keyword}/page=1`);
                                setResultSearch([]);
                            }
                        }}
                        className="h-10 w-full rounded-l-3xl pl-4 pr-8 outline-none"
                    />
                    {keyword?.length !== 0 && (
                        <button
                            className="top-3/2 absolute right-16 z-10 bg-[#fff] px-1"
                            onClick={() => {
                                setKeyword('');
                                inputRef.current.focus();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-[#bebebe] "
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                    {resultSearch?.content?.content?.length !== 0 && keyword?.length !== 0 && (
                        <div className="absolute top-11 left-0 z-20 w-full rounded-lg bg-[#ffffff] shadow-2xl">
                            {resultSearch?.content?.map((e) => {
                                const price = e?.priceWithUnit?.[0]?.price;
                                return (
                                    <ResultSearchItem
                                        key={e.id}
                                        id={e.id}
                                        to={`/detail/slug=${e.slug}`}
                                        img="https://cdn.nhathuoclongchau.scom.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-s7608-6226_large.jpg"
                                        name={e.name}
                                        title={e.category}
                                        newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                                        oldPrice={`${convertNumberToPrice(price)}đ`}
                                        unit={e.category}
                                        onClick={() => {
                                            setKeyword('');
                                        }}
                                    />
                                );
                            })}

                            {resultSearch?.content?.length > 0 && (
                                <NavLink
                                    to={resultSearch?.content?.length > 0 ? `/search/keyword=${keyword}/page=1` : ''}
                                    className="flex items-center justify-center py-2 text-sm text-[#1d48ba] hover:underline"
                                    onClick={() => {
                                        setResultSearch([]);
                                    }}
                                >
                                    Xem tất cả
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </NavLink>
                            )}
                        </div>
                    )}

                    <NavLink
                        to={`/search/keyword=${keyword}/page=1`}
                        className="h-10 rounded-r-3xl border border-[#f59e0b] bg-[#f59e0b] px-4 leading-9 outline-none"
                        onClick={() => {
                            setResultSearch([]);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-10 w-6 text-[#fff]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </NavLink>
                </div>

                <div className="right flex  text-white">
                    {!user ? (
                        <NavLink to="/signin" className="track mr-3 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-7 w-7 rounded-full border-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <div className="track-title">
                                <p>Đăng nhập</p>
                            </div>
                        </NavLink>
                    ) : (
                        <div
                            className="user-section relative flex cursor-pointer items-center"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <img
                                src={
                                    user.avatar
                                        ? user.avatar
                                        : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                                }
                                alt="user-img"
                                className="mr-1 h-10 w-10 object-cover"
                            />
                            <div className="flex flex-col">
                                <p>Tài khoản</p>
                                <p className="w-32 line-clamp-1">{user?.username}</p>
                            </div>
                            {isHovering && user && (
                                <div className="fucn-user absolute top-11 right-0 z-10 w-60 animate-fadeBottomMobile rounded-lg border border-[#ccc] bg-[#ffffff]">
                                    <NavLink
                                        to={`/user/uid=${encrypt(user?.email)}`}
                                        className="transition-basic flex items-center  rounded-t-lg px-2 py-2 text-[#333] hover:bg-[#edf2f8] "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-6 w-6 text-[#7c808e]"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <p className="ml-1 select-none text-[#333]">Thông tin cá nhân</p>
                                    </NavLink>

                                    <div className="transition-basic flex items-center  rounded-b-lg px-2  py-2 text-[#333] hover:bg-[#edf2f8]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6 text-[#7c808e]"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                            />
                                        </svg>

                                        <p
                                            className="ml-1 select-none text-[#7c808e]"
                                            onClick={() => {
                                                switch (user?.account) {
                                                    case 'Microsoft':
                                                        handleSignOutWithMicrosoft();
                                                        signOutAccount();
                                                        break;
                                                    case 'Google':
                                                        handleSignOutWithGoogleFirebase();
                                                        signOutAccount();
                                                        break;
                                                    case 'Normal':
                                                        handleSignOutWithNormal();
                                                        signOutAccount();
                                                        break;
                                                    default:
                                                        dispatch(removeMedicinesFromCart());
                                                        signOutAccount();
                                                        logOut();
                                                }
                                            }}
                                        >
                                            Thoát tài khoản
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isHovering && !user && (
                                <div className="fucn-user absolute top-11 right-0 z-10 w-60 animate-fadeBottomMobile rounded-lg border border-[#ccc] bg-[#ffffff]">
                                    <NavLink
                                        to="/signin"
                                        className="transition-basic flex items-center  rounded-t-lg px-2 py-2 text-[#333] hover:bg-[#edf2f8] "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-6 w-6 text-[#7c808e]"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <p className="ml-1 select-none text-[#333]">Đăng nhập</p>
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="transition-basic flex items-center rounded-t-lg px-2 py-2 text-[#333] hover:bg-[#edf2f8] "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-6 w-6 text-[#7c808e]"
                                        >
                                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                        </svg>

                                        <p className="ml-1 select-none text-[#333]">Đăng ký tài khoản</p>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    )}

                    <CartHeader></CartHeader>
                </div>
            </div>

            <div className="padding-responsive relative h-20 items-center justify-between cs:flex xs:flex sm:flex md:flex lg:hidden xl:hidden 2xl:hidden">
                <div className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-[#fff]"
                        onClick={toogleLock}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>

                    {showMenuMobiles && (
                        <>
                            <div
                                className="fixed top-0 left-0 z-10 h-full w-full overflow-y-hidden bg-[rgb(24,24,24,0.6)]"
                                onClick={toogleLock}
                            ></div>

                            <div
                                className={
                                    showMenuMobiles
                                        ? ' menu-mobile fixed top-0 left-0 z-20 h-screen w-[89%] animate-fadeLeftMobile bg-[#e8f5fd] '
                                        : ' menu-mobile fixed top-0 left-0 z-20 h-screen w-[89%] animate-fadeRightMobile bg-[#e8f5fd] '
                                }
                            >
                                <div
                                    className="header-menu flex justify-between bg-[#072d94] px-6 py-3  "
                                    onClick={toogleLock}
                                >
                                    <NavLink to="/" className="center">
                                        <img
                                            src="https://nhathuoclongchau.com.vn/frontend_v3/images/longchau-logo.svg"
                                            alt="img-logo"
                                        />
                                    </NavLink>
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6 text-[#fff]  "
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="content-menu bg-[#fff] ">
                                    {/* search mobile start */}
                                    <div className="relative flex w-full items-center px-3 py-3">
                                        <input
                                            placeholder="Nhập tìm thuốc..."
                                            name="search"
                                            id="search"
                                            value={keyword}
                                            onChange={(e) => {
                                                if (e.target.value?.length > 0) {
                                                    setKeyword(e.target.value);
                                                } else {
                                                    setKeyword('');
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    navigate(`/search/keyword=${keyword}/page=1`);
                                                    setResultSearch([]);
                                                    setShowMenuMobiles(!showMenuMobiles);
                                                }
                                            }}
                                            className="h-10 w-full rounded-l-3xl border border-[#bebebe] pl-4 pr-8 outline-none"
                                        />
                                        {keyword.length !== 0 && (
                                            <button
                                                className="top-3/2 absolute right-16 z-10 bg-[#fff] px-1"
                                                onClick={() => setKeyword('')}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-5 w-5 text-[#bebebe] "
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        )}

                                        <NavLink
                                            to={`/search/keyword=${keyword}/page=1`}
                                            onClick={() => {
                                                setResultSearch([]);
                                                toogleLock();
                                            }}
                                        >
                                            <button className="h-10 rounded-r-3xl border border-[#f59e0b] bg-[#f59e0b] px-4 leading-9 outline-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-6 w-6 text-[#fff]"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                    />
                                                </svg>
                                            </button>
                                        </NavLink>
                                    </div>
                                    {user === null ? (
                                        <div
                                            className="menu-item  flex flex-col border-b border-[#e4eaf1] bg-cover bg-no-repeat  px-3  py-3 text-sm"
                                            style={{ backgroundImage: `url(${bgLeftMenu})` }}
                                        >
                                            <div className="px-3 py-1">
                                                <p className="font-medium text-[#fff]">
                                                    Đăng nhập để hưởng những đặc quyền dành riêng cho thành viên.
                                                </p>
                                                <div className="mt-3  inline-flex items-center text-sm">
                                                    <button
                                                        className="h-8 rounded-full border-blue-100 bg-[#fff] px-3 font-medium text-[#125odc]"
                                                        onClick={() => {
                                                            toogleLock();
                                                        }}
                                                    >
                                                        <NavLink to="/sign-in">Đăng nhập</NavLink>
                                                    </button>
                                                    <button
                                                        className="ml-2 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-3 font-medium text-[#fff]"
                                                        onClick={() => {
                                                            toogleLock();
                                                        }}
                                                    >
                                                        <NavLink to="/sign-up">Đăng ký</NavLink>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="menu-item  flex flex-col border-b border-[#e4eaf1] bg-cover bg-no-repeat  px-3  py-3 text-sm"
                                            style={{ backgroundImage: `url(${bgLeftMenu})` }}
                                        >
                                            <div className="mt-3 inline-flex items-center justify-between text-sm">
                                                <div
                                                    className=" px-3 font-medium text-[#125odc] "
                                                    onClick={() => {
                                                        toogleLock();
                                                    }}
                                                >
                                                    <NavLink to="/user" className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 52 52"
                                                            width={48}
                                                            height={48}
                                                        >
                                                            <g clipPath="url(#clip0_7940_243129)">
                                                                <rect width={52} height={52} fill="#95B2F0" rx={26} />
                                                                <path
                                                                    fill="url(#paint0_linear_7940_243129)"
                                                                    d="M18.292 23.14c-1.058 0-1.783.24-1.373 2.986.41 2.745.94 3.522 1.853 3.177.482 2.263 1.637 3.948 2.595 4.82.049 2.793 0 4.044 0 4.044-4.283.337-5.968 3.804-4.862 6.788 1.107 2.984 11.17 7.414 16.562 4.334 5.392-3.081 7.077-10.495.186-11.026-.434-.048-1.157-.096-1.157-.096 0-2.552-.048-4.044-.048-4.044a7.385 7.385 0 002.41-4.67c.433.29 1.444.145 1.974-2.938.53-3.082-.977-2.669-.964-3.37.096-4.862-.24-8.569-7.23-8.376-6.99.193-9.608-.871-9.946 8.37z"
                                                                />
                                                                <path
                                                                    fill="url(#paint1_linear_7940_243129)"
                                                                    d="M36.442 26.51c-.53 3.082-1.54 3.227-1.974 2.938a7.385 7.385 0 01-2.41 4.669s.034 1.029.045 2.842c-1.142 1.136-2.662 2.239-4.28 2.26-3.003.044-4.898-1.749-6.432-3.09 0-.557 0-1.217-.02-2.006 1.528 1.438 3.45 2.74 5.247 2.74 2.745 0 5.44-3.66 6.404-5.923.964-2.264 1.034-11.493-.337-13.096-1.507-1.757-3.033-.048-5.489-.185s-3.175-1.318-5.053-1.207c-2.932.169-3.032 8.473-3.707 8.425l-.32-1.732h.175c.338-9.244 2.985-8.183 9.967-8.376 6.983-.193 7.316 3.522 7.23 8.376-.023.695 1.484.284.954 3.365z"
                                                                />
                                                                <path
                                                                    fill="url(#paint2_linear_7940_243129)"
                                                                    d="M33.499 11.906c-2.903-3.325-10.037-6.408-13.181-4.11-1.692.763-1.692 2.659-2.595 3.324-.903.666-2.484 1.81-2 3.267.484 1.457 1.405 2.024 1.51 3.566.106 1.542-1.39 2.903-.24 3.87 1.51-1.996 3.384-8.465 5.985-8.222 2.6.242 10.521-1.695 10.521-1.695z"
                                                                />
                                                                <path
                                                                    fill="url(#paint3_linear_7940_243129)"
                                                                    d="M18.505 25.33c.967 0-.371-7.74 2.54-9.251 2.48-1.15 2.78.37 5.864.37s4.172-1.391 6.117.544c1.944 1.935.786 7.739 1.994 7.86.545 0 .425-1.33 1.03-1.753.603-.422 1.087-.185 1.269-4.897 0-3.99.361-6.117-3.151-6.893-1.633-.423-1.694-1.331-3.326-1.15-1.63.182-2.947-2.307-6.53-1.39-2.595.666-1.952 1.711-3.448 2.478-2.478.371-3.203.786-3.203 1.876 0 1.09.664 1.813.605 3.507-.06 1.695-1.876 3.982-1.272 5.196.604 1.214 1.088 1.209 1.088 2.056s-.181 1.568.423 1.447z"
                                                                />
                                                                <path
                                                                    fill="url(#paint4_linear_7940_243129)"
                                                                    d="M6.5 44.78c3.018-3.49 7.303-6.197 14.872-6.62-4.82 1.06-4.264 6.506 5.686 6.8 9.002-.49 9.213-5.953 6.206-6.703 4.73.255 12.39 2.73 17.111 8.69-.843 9.284-16.847 9.594-23.272 9.356C20.678 56.066 7.893 51.28 6.5 44.78z"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <linearGradient
                                                                    id="paint0_linear_7940_243129"
                                                                    x1="15.818"
                                                                    x2="25.251"
                                                                    y1="39.578"
                                                                    y2="11.681"
                                                                    gradientUnits="userSpaceOnUse"
                                                                >
                                                                    <stop stopColor="#FBDAD0" />
                                                                    <stop offset={1} stopColor="#FDE5DE" />
                                                                </linearGradient>
                                                                <linearGradient
                                                                    id="paint1_linear_7940_243129"
                                                                    x1="18.956"
                                                                    x2="51.533"
                                                                    y1="36.188"
                                                                    y2="-0.012"
                                                                    gradientUnits="userSpaceOnUse"
                                                                >
                                                                    <stop stopColor="#FAD2C6" />
                                                                    <stop offset={1} stopColor="#FBDAD0" />
                                                                </linearGradient>
                                                                <linearGradient
                                                                    id="paint2_linear_7940_243129"
                                                                    x1="20.512"
                                                                    x2="24.252"
                                                                    y1="16.38"
                                                                    y2="6.369"
                                                                    gradientUnits="userSpaceOnUse"
                                                                >
                                                                    <stop offset="0.008" stopColor="#20588C" />
                                                                    <stop offset="0.924" stopColor="#054178" />
                                                                </linearGradient>
                                                                <linearGradient
                                                                    id="paint3_linear_7940_243129"
                                                                    x1="22.458"
                                                                    x2="26.654"
                                                                    y1="19.183"
                                                                    y2="7.82"
                                                                    gradientUnits="userSpaceOnUse"
                                                                >
                                                                    <stop offset="0.008" stopColor="#19446D" />
                                                                    <stop offset="0.924" stopColor="#05427B" />
                                                                </linearGradient>
                                                                <linearGradient
                                                                    id="paint4_linear_7940_243129"
                                                                    x1="43.95"
                                                                    x2="34.848"
                                                                    y1="53.687"
                                                                    y2="31.735"
                                                                    gradientUnits="userSpaceOnUse"
                                                                >
                                                                    <stop stopColor="#306DE4" />
                                                                    <stop offset={1} stopColor="#769DEA" />
                                                                </linearGradient>
                                                                <clipPath id="clip0_7940_243129">
                                                                    <rect width={52} height={52} fill="#fff" rx={26} />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <p className="ml-2 text-[#fff]">{user?.username}</p>
                                                    </NavLink>
                                                </div>
                                                <button
                                                    className=" rounded-full border border-[#fff] bg-transparent px-4 py-1 font-medium text-[#fff] transition-all hover:border-blue-400"
                                                    onClick={() => {
                                                        toogleLock();
                                                        switch (user?.account) {
                                                            case 'Microsoft':
                                                                handleSignOutWithMicrosoft();
                                                                break;
                                                            case 'Google':
                                                                handleSignOutWithGoogleFirebase();
                                                                break;
                                                            case 'Normal':
                                                                handleSignOutWithNormal();
                                                                break;
                                                            default:
                                                                dispatch(logoutSuccess(null));
                                                                setCookie('accessToken', null);
                                                                setCookie('accountType', null);
                                                                logOut();
                                                        }
                                                    }}
                                                >
                                                    <NavLink to="/sign-up">Đăng xuất</NavLink>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className="menu-item flex items-center justify-between border-b border-[#e4eaf1] px-3 py-3 pl-3 text-sm"
                                        onClick={toogleLock}
                                    >
                                        <NavLink to="/">Trang chủ</NavLink>
                                    </div>
                                    {fields?.data?.map((field, index) => {
                                        return (
                                            <div key={index}>
                                                <div
                                                    className="menu-item flex items-center justify-between border-b border-[#e4eaf1] px-3 py-3 pl-3 text-sm"
                                                    onClick={() => {
                                                        setShowItemMobile(!showItemMobile);
                                                        setFieldId(field?.id);
                                                    }}
                                                    onMouseEnter={() => {
                                                        setFieldId(field?.id);
                                                    }}
                                                >
                                                    <NavLink
                                                        to={`/filter/slug=${field?.slug}`}
                                                        className="select-none"
                                                        onClick={toogleLock}
                                                    >
                                                        {field?.name}
                                                    </NavLink>
                                                    {showItemMobile && fieldId === field?.id ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="h-6 w-6 rotate-180 transition-all"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="h-6 w-6 transition-all"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                {showItemMobile && fieldId === field?.id && (
                                                    <ul className="menu-item__childs mt-3 rounded-lg bg-[#e8f5fd] transition-opacity delay-1000">
                                                        {categoryByFieldId?.map((category) => {
                                                            return (
                                                                <li
                                                                    className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]"
                                                                    key={category?.id}
                                                                    onClick={toogleLock}
                                                                >
                                                                    <NavLink
                                                                        to={`/filter/field=${category?.fieldOfCategory?.slug}/category=${category?.slug}`}
                                                                        className="block"
                                                                    >
                                                                        {category?.category}
                                                                    </NavLink>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="footer-menu flex items-center pt-4 pb-6 pl-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="mr-2 h-7 w-7 text-[#072d94]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                                        />
                                    </svg>
                                    <div className="info-contact">
                                        <h3 className="text-base font-bold text-[#072d94]">1800 6928</h3>
                                        <p className="text-sm text-[#072d94]">Tư vấn miễn phí</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <NavLink to="/" className="center">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/logo%2Flogo_front_big_c58fec2dc9.svg?alt=media&token=829a536a-047e-4264-ab9a-f277904a0c7a"
                        alt="img-logo"
                    />
                </NavLink>
                <NavLink
                    to="/cart"
                    className={`cart relative flex items-center before:absolute before:-top-2 before:-right-2 before:flex before:h-5 before:w-5 before:items-center before:justify-center before:rounded-full before:bg-[#f59e0b] before:text-center before:text-[10px] before:text-[#fff] before:content-['${cart?.medicines?.length}']`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-[#fff]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>
                </NavLink>
            </div>
        </div>
    );
}

export default HeaderSearch;
