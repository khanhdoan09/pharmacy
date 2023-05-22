import { useState } from 'react';
import ProductMain from '~/components/ProductMain';

function FamousProducts(props) {
    const [sortOrder, setSortOrder] = useState('ascending');
    const [visibleProducts, setVisibleProducts] = useState(4);

    function handleSortOrderChange(event) {
        setSortOrder(event.target.value);
    }
    const sortedProducts = props?.medicineList?.sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    return (
        <div>
            <div className="mb-4 mt-2 flex flex-wrap items-center justify-between pb-3">
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

                    <h3 className=" text-[20px] font-bold text-[#000] ">Danh sách sản phẩm</h3>
                </div>
                <select
                    id="small"
                    className="mb-6 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                >
                    <option value="ascending">Giá tăng dần</option>
                    <option value="descending">Giá giảm dần</option>
                </select>
            </div>

            <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                {sortedProducts?.slice(0, visibleProducts)?.map((e) => (
                    <ProductMain
                        key={e.id}
                        to={`/detail/medicineId=${e?.id}`}
                        label={e.specification}
                        img=""
                        title={e.name}
                        newPrice={e?.price}
                        oldPrice=""
                        unit={e.category}
                    />
                ))}
            </div>
            {visibleProducts < sortedProducts?.length ? (
                <button
                    className="mx-auto mt-4 flex h-8 items-center rounded-2xl  border border-[#d8e0e8] px-4 transition-all hover:bg-[#718198] hover:text-[#fff]"
                    onClick={() => {
                        setVisibleProducts((visibleProducts) => visibleProducts + 1);
                    }}
                >
                    Xem thêm
                </button>
            ) : null}
            {visibleProducts > 4 ? (
                <button
                    className="mx-auto mt-4 flex h-8 items-center rounded-2xl  border border-[#d8e0e8] px-4 transition-all hover:bg-[#718198] hover:text-[#fff]"
                    onClick={() => {
                        if (visibleProducts < 8) {
                            setVisibleProducts(4);
                        } else {
                            setVisibleProducts(visibleProducts - 8);
                        }
                    }}
                >
                    Thu gọn
                </button>
            ) : null}
        </div>
    );
}

export default FamousProducts;
