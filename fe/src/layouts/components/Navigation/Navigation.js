import { useState } from 'react';
import NavModal from '~/components/NavModal';
import NavItem from './NavItem';

function Navigation() {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="nav grid-cols-42 padding-responsive relative m-auto grid max-w-[1200px] items-center justify-between bg-[#ff] cs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex">
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <NavItem>
                    <p className="text-xs font-bold uppercase">THỰC PHẨM CHỨC NĂNG</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </NavItem>
            </div>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <NavItem>
                    <p className="text-xs font-bold uppercase">DƯỢC MỸ PHẨM</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </NavItem>
            </div>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <NavItem>
                    <p className="text-xs font-bold uppercase">CHĂM SÓC CÁ NHÂN</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </NavItem>
            </div>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <NavItem>
                    <p className="text-xs font-bold uppercase">THUỐC</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </NavItem>
            </div>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <NavItem>
                    <p className="text-xs font-bold uppercase">THIẾT BỊ Y TẾ</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </NavItem>
            </div>
            <NavItem>
                <p className="text-xs font-bold uppercase">BỆNH</p>
            </NavItem>
            <NavItem>
                <p className="text-xs font-bold uppercase">GÓC SỨC KHỎE</p>
            </NavItem>
            <NavItem>
                <p className="text-xs font-bold uppercase">HỆ THỐNG NHÀ THUỐC</p>
            </NavItem>

            {isHovering && (
                <div
                    className="nav-content absolute top-10 left-0 z-10  animate-fadeBottomMobile rounded-md bg-[#edf2f8]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <NavModal />
                </div>
            )}
        </div>
    );
}

export default Navigation;
