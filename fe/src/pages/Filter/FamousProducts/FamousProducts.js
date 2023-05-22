import { useState } from 'react';
import ProductMain from '~/components/ProductMain';

function FamousProducts(props) {
    const [active, setActive] = useState('2');
    const [countViewExpensive, setCountViewExpensive] = useState(3);
    const [countViewCheap, setCountViewCheap] = useState(3);
    const [countViewNewRelease, setCountViewNewRelease] = useState(3);

    const handleClick = (event) => {
        setActive(event.target.id);
    };
    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between pb-3">
                <div className="mb-1 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mr-1 h-6 w-6 rounded-full bg-[#ef4444] px-1 py-1 text-[#fff]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                        />
                    </svg>

                    <h3 className="select-none text-[20px] font-bold text-[#000] ">Sản Phẩm Nổi Bật</h3>
                </div>
                <div>
                    <button
                        key={2}
                        className={
                            active === '2'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'2'}
                        onClick={handleClick}
                    >
                        Hàng mới
                    </button>
                    <button
                        key={3}
                        className={
                            active === '3'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'3'}
                        onClick={handleClick}
                    >
                        Giá thấp
                    </button>
                    <button
                        key={4}
                        className={
                            active === '4'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'4'}
                        onClick={handleClick}
                    >
                        Giá cao
                    </button>
                </div>
            </div>

            {active === '2' && (
                <>
                    <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                        {props?.medicineByNewRelease?.data?.slice(0, countViewNewRelease)?.map((e) => (
                            <ProductMain
                                key={e.id}
                                to=""
                                label={e.specification}
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00007318-thuan-linh-chi-ho-tro-nsgua-ung-thu-bao-ve-gan-9752-62af_large.jpg"
                                title={e.name}
                                newPrice="2.744.000đ"
                                oldPrice=""
                                unit={e.category}
                            />
                        ))}
                    </div>
                    {countViewNewRelease < props?.medicineByNewRelease?.data?.length ? (
                        <button
                            className="mx-auto mt-4 flex h-8 items-center rounded-2xl  border border-[#d8e0e8] px-4 transition-all hover:bg-[#718198] hover:text-[#fff]"
                            onClick={() => {
                                setCountViewNewRelease((count) => count + 3);
                            }}
                        >
                            Xem thêm
                        </button>
                    ) : null}
                </>
            )}

            {active === '3' && (
                <>
                    <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                        {props?.medicineByCheapPrice?.data?.slice(0, countViewCheap)?.map((e) => (
                            <ProductMain
                                key={e.id}
                                to=""
                                label={e.specification}
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00007318-thuan-linh-chi-ho-tro-nsgua-ung-thu-bao-ve-gan-9752-62af_large.jpg"
                                title={e.name}
                                newPrice="2.744.000đ"
                                oldPrice=""
                                unit={e.category}
                            />
                        ))}
                    </div>
                    {countViewCheap < props?.medicineByCheapPrice?.data?.length ? (
                        <button
                            className="mx-auto mt-4 flex h-8 items-center rounded-2xl  border border-[#d8e0e8] px-4 transition-all hover:bg-[#718198] hover:text-[#fff]"
                            onClick={() => {
                                setCountViewCheap((count) => count + 3);
                            }}
                        >
                            Xem thêm
                        </button>
                    ) : null}
                </>
            )}

            {active === '4' && (
                <>
                    <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                        {props?.medicineByExpensivePrice?.data?.slice(0, countViewExpensive)?.map((e) => (
                            <ProductMain
                                key={e.id}
                                to=""
                                label={e.specification}
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00007318-thuan-linh-chi-ho-tro-nsgua-ung-thu-bao-ve-gan-9752-62af_large.jpg"
                                title={e.name}
                                newPrice="2.744.000đ"
                                oldPrice=""
                                unit={e.category}
                            />
                        ))}
                    </div>
                    {countViewExpensive < props?.medicineByExpensivePrice?.data?.length ? (
                        <button
                            className="mx-auto mt-4 flex h-8 items-center rounded-2xl  border border-[#d8e0e8] px-4 transition-all hover:bg-[#718198] hover:text-[#fff]"
                            onClick={() => {
                                setCountViewExpensive((count) => count + 3);
                            }}
                        >
                            Xem thêm
                        </button>
                    ) : null}
                </>
            )}
        </div>
    );
}

export default FamousProducts;
