import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useBodyScrollLock from '~/hooks/useBodyScrollLock';
import ResultSearchItem from '~/components/ResultSearchItem';
import * as searchService from '~/services/searchServices';

function HeaderSearch() {
    const navigate = useNavigate();

    const [showItemMobile, setShowItemMobile] = useState(false);
    const [showMenuMobiles, setShowMenuMobiles] = useState(false);
    const [user, setUser] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [lock, toogle] = useBodyScrollLock();

    //search logic
    const [keyword, setKeyword] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const inputRef = useRef();
    const [page, setPage] = useState(0);
    const [pageSize] = useState(3); // total product appear one page

    const toogleLock = () => {
        setShowMenuMobiles(!showMenuMobiles);
        toogle();
    };

    useEffect(() => {
        const fetchApi = async () => {
            if (keyword?.length > 0) {
                const result = await searchService.search(keyword, page, pageSize);
                setResultSearch(result?.data);
            }
        };

        fetchApi();
    }, [keyword, page]);

    //set page 0 when keyword change
    useEffect(() => {
        setPage(0);
    }, [keyword]);

    const handleNewPrice = (price, discount) => {
        return parseInt(price) - (parseInt(price) * discount) / 100;
    };

    return (
        <div className="wrapper h-20 bg-[#072d94]">
            <div className="padding-responsive m-auto h-20 max-w-[1200px] items-center justify-between cs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex ">
                <NavLink to="/">
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/longchau-logo.svg" alt="logo" />
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
                            {resultSearch?.content?.map((e) => (
                                <ResultSearchItem
                                    key={e.id}
                                    to={`detail/${e.slug}`}
                                    img="https://cdn.nhathuoclongchau.scom.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-s7608-6226_large.jpg"
                                    name={e.name}
                                    title={e.category}
                                    oldPrice={`${e.discount !== 0 ? `${e.price.toString().replace(',', '.')}đ` : ''}`}
                                    newPrice={`${
                                        e.discount !== 0
                                            ? `${handleNewPrice(e.price, e.discount).toFixed(3)}đ`
                                            : `${e.price.toString().replace(',', '.')}đ`
                                    }`}
                                    unit="Hộp"
                                    onClick={() => {
                                        setKeyword('');
                                    }}
                                />
                            ))}

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
                    {user ? (
                        <NavLink to="/signin" className="track mr-3 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
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
                                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                                alt="user-img"
                                className="mr-1 h-10 w-10 object-cover"
                            />
                            <div className="flex flex-col">
                                <p>Tài khoản</p>
                                <p className="w-32 line-clamp-1">MinhChanh</p>
                            </div>
                            {isHovering && (
                                <div className="fucn-user absolute top-11 right-0 z-10 w-60 animate-fadeBottomMobile rounded-lg border border-[#ccc] bg-[#ffffff]">
                                    <NavLink
                                        to="/user"
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

                                        <p className="ml-1 select-none text-[#7c808e]">Thoát tài khoản</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <NavLink
                        to="/cart"
                        className="cart relative flex items-center before:absolute before:top-1 before:-right-1 before:flex before:h-5 before:w-5 before:items-center before:justify-center before:rounded-full before:bg-[#f59e0b] before:text-center before:text-[10px] before:content-['100']"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-10 w-10 "
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
                                <div className="content-menu bg-[#fff] px-3 py-3">
                                    {/* search mobile start */}
                                    <div className="relative flex w-full items-center">
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
                                    <div className="menu-item flex items-center justify-between border-b border-[#e4eaf1] py-[14px] pl-3 text-sm">
                                        <NavLink to="">Trang chủ</NavLink>
                                    </div>
                                    <div className="menu-item border-b border-[#e4eaf1] py-[14px] pl-3 text-sm ">
                                        <div
                                            className="flex items-center justify-between"
                                            onClick={() => setShowItemMobile(!showItemMobile)}
                                        >
                                            <NavLink to="/filter" className="select-none">
                                                Thực phẩm chức năng
                                            </NavLink>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={
                                                    showItemMobile
                                                        ? 'h-6 w-6 rotate-[180deg] transition-all'
                                                        : 'h-6 w-6 rotate-[360deg] transition-all'
                                                }
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </div>
                                        {showItemMobile && (
                                            <ul className="menu-item__childs mt-3 rounded-lg bg-[#e8f5fd] transition-opacity delay-1000">
                                                <li className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]">
                                                    <NavLink to="/filter">Chức năng gan</NavLink>
                                                </li>
                                                <li className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]">
                                                    <NavLink to="/filter">Hỗ trợ trao đổi chất</NavLink>
                                                </li>
                                                <li className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]">
                                                    <NavLink to="/filter">Giải rượu, cai rượu</NavLink>
                                                </li>
                                                <li className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]">
                                                    <NavLink to="/filter">Chống lão hóa</NavLink>
                                                </li>
                                                <li className="item select-none px-3 py-3 text-sm transition-all hover:bg-[#bed5e4]">
                                                    <NavLink to="/filter">Bổ mắt, bảo vệ mắt</NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </div>

                                    <div className="menu-item flex items-center justify-between border-b border-[#e4eaf1] py-[14px] pl-3 text-sm">
                                        <NavLink to="" className="select-none">
                                            Dược mỹ phẩm
                                        </NavLink>
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
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>
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
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/longchau-logo.svg" alt="img-logo" />
                </NavLink>
                <NavLink
                    to="/cart"
                    className="cart relative flex items-center before:absolute before:-top-2 before:-right-2 before:flex before:h-5 before:w-5 before:items-center before:justify-center before:rounded-full before:bg-[#f59e0b] before:text-center before:text-[10px] before:text-[#fff] before:content-['100']"
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
