import { useState } from 'react';

function Tab() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <>
            <ul className="grid gap-4 rounded-2xl border border-[#d8e0e8]  bg-[#edf2f8]  px-1 py-1  cs:grid-cols-1 xs:grid-cols-1  sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                <li
                    onClick={() => toggleTab(1)}
                    className={
                        toggleState === 1
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Tất cả
                </li>
                <li
                    onClick={() => toggleTab(2)}
                    className={
                        toggleState === 2
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Chưa hoàn tất
                </li>
                <li
                    onClick={() => toggleTab(3)}
                    className={
                        toggleState === 3
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Hoàn tất
                </li>
                <li
                    onClick={() => toggleTab(4)}
                    className={
                        toggleState === 4
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Đã hủy
                </li>
                <li
                    onClick={() => toggleTab(5)}
                    className={
                        toggleState === 5
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Trả hàng
                </li>
            </ul>
            <div className="tab-content">
                <div
                    className={
                        toggleState === 1
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/empty-chitiet.png" alt="non-order" />
                    <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào 1</p>
                </div>
                <div
                    className={
                        toggleState === 2
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/empty-chitiet.png" alt="non-order" />
                    <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào 2</p>
                </div>
                <div
                    className={
                        toggleState === 3
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/empty-chitiet.png" alt="non-order" />
                    <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào 3</p>
                </div>
                <div
                    className={
                        toggleState === 4
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/empty-chitiet.png" alt="non-order" />
                    <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào 4</p>
                </div>
                <div
                    className={
                        toggleState === 5
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    <img src="https://nhathuoclongchau.com.vn/frontend_v3/images/empty-chitiet.png" alt="non-order" />
                    <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào 5</p>
                </div>
            </div>
        </>
    );
}

export default Tab;
