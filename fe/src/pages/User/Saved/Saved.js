import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductAds from '~/components/ProductAds/ProductAds';
import * as medicineService from '~/services/medicineService';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';

function Saved() {
    const [savedList, setSavedList] = useState([]);
    const [countSeeMore, setCountSeeMore] = useState(4);
    const user = useSelector((state) => state.authentication.login.currentUser);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await medicineService.findSavedByEmail(user?.email);
            setSavedList(response?.data);
        };
        fetchApi();
    }, [user?.email]);

    return (
        <div className="max-w-full">
            <div className="padding-responsive mx-auto max-w-[1200px] ">
                <div className="grid gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                    {savedList?.slice(0, countSeeMore)?.map((saved) => {
                        const price = saved?.medicine?.priceWithUnit?.[0]?.price;
                        return (
                            <div className="max-w-full" key={saved?.id}>
                                <ProductAds
                                    img="ád"
                                    to={`/detail/slug=${saved?.medicine?.slug}`}
                                    label={saved?.medicine?.specification}
                                    title={saved?.medicine?.name}
                                    newPrice={`${convertNumberToPrice(
                                        price - (price * saved?.medicine?.discount) / 100,
                                    )}đ`}
                                    oldPrice={`${convertNumberToPrice(price)}đ`}
                                    unit={saved?.medicine?.category}
                                />
                            </div>
                        );
                    })}
                </div>
                {countSeeMore < savedList?.length ? (
                    <div
                        className="mt-3 flex justify-center transition-all"
                        onClick={() => {
                            setCountSeeMore((prev) => prev + 8);
                        }}
                    >
                        <button className="flex h-8 items-center rounded-full border border-blue-500 bg-blue-500 px-4 font-medium text-[#FFF]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5 font-medium text-[#FFF]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                            <span className="ml-1 text-sm">Xem thêm</span>
                        </button>
                    </div>
                ) : null}
                {countSeeMore > 4 ? (
                    <div
                        className="mt-3 flex justify-center transition-all"
                        onClick={() => {
                            if (countSeeMore < 8) {
                                setCountSeeMore(4);
                            } else {
                                setCountSeeMore(countSeeMore - 8);
                            }
                        }}
                    >
                        <button className="flex h-8 items-center rounded-full border border-blue-500 bg-blue-500 px-4 font-medium text-[#FFF]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5 rotate-180 font-medium text-[#FFF]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                            <span className="ml-1 text-sm">Thu gọn</span>
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Saved;
