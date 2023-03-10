import { useState } from 'react';
import Address from './Address';
import InfoUpdate from './InfoUpdate';
import PasswordUser from './PasswordUser';
import Tab from './Tab';

function User() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <div className="max-w-full">
            <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/banner-html/banner-QLTK.png" alt="banner" className='h-[264px] object-cover'/>
            <div className="max-w-[1200px] mx-auto my-0">
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 gap-4 padding-responsive">
                    <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-1 xs:col-span-1 cs:col-span-1">
                        <InfoUpdate />
                        <div className="flex flex-col mt-[52px]">
                            <div
                                onClick={() => toggleTab(1)}
                                className={
                                    toggleState === 1
                                        ? 'flex items-center bg-[#edf2f8] border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer transition-basic '
                                        : 'flex items-center bg-transparent border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer transition-basic'
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={
                                        toggleState === 1
                                            ? 'w-6 h-6 mr-2 text-[#072d94]'
                                            : 'w-6 h-6 mr-2 text-[#c1bcbd] rounded-full bg-[#edf2f8]'
                                    }
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                                </svg>
                                <p className="text-[#334155]">Đơn hàng của tôi</p>
                            </div>
                            <div
                                onClick={() => toggleTab(2)}
                                className={
                                    toggleState === 2
                                        ? 'flex items-center bg-[#edf2f8] border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer transition-basic '
                                        : 'flex items-center bg-transparent border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer transition-basic'
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={
                                        toggleState === 2
                                            ? 'w-6 h-6 mr-2 text-[#072d94]'
                                            : 'w-6 h-6 mr-2 text-[#c1bcbd] rounded-full bg-[#edf2f8]'
                                    }
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <p className="text-[#334155]">Sổ địa chỉ nhận hàng</p>
                            </div>
                            <div
                                onClick={() => toggleTab(3)}
                                className={
                                    toggleState === 3
                                        ? 'flex items-center bg-[#edf2f8] border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer hover:transition-basic'
                                        : 'flex items-center bg-transparent border border-transparent hover:border-[#072d94] rounded-lg mb-3 px-2 py-2 cursor-pointer hover:transition-basic'
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={
                                        toggleState === 3
                                            ? 'w-6 h-6 mr-2 text-[#072d94]'
                                            : 'w-6 h-6 mr-2 text-[#c1bcbd] rounded-full bg-[#edf2f8]'
                                    }
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                    />
                                </svg>

                                <p className="text-[#334155]">Thay đổi mật khẩu</p>
                            </div>
                        </div>
                    </div>
                    {/* tab content */}
                    <div
                        className={
                            toggleState === 1 ? '2xl:col-span-3 xl:col-span-3  lg:col-span-3 xm mt-8 block' : 'hidden'
                        }
                    >
                        <Tab />
                    </div>
                    <div
                        className={
                            toggleState === 2 ? '2xl:col-span-3 xl:col-span-3 lg:col-span-3 pt-8 pb-10 block' : 'hidden'
                        }
                    >
                        <Address />
                    </div>
                    <div
                        className={
                            toggleState === 3 ? '2xl:col-span-3 xl:col-span-3 lg:col-span-3 pt-8 pb-10 block' : 'hidden'
                        }
                    >
                        <PasswordUser />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
