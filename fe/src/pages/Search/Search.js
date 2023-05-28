import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDebounce from '~/hooks/useDebounce';
import * as searchService from '~/services/searchServices';
import SearchProduct from './SearchProduct';
import { convertNumberToPrice } from '~/utils/currency';

function Search() {
    const { keyword, page } = useParams();
    const keywordFromUrl = keyword.split('=')[1]; //get value search from url
    const pageValue = page.split('=')[1] - 1; // get value page from url
    const navigate = useNavigate();

    const [resultSearch, setResultSearch] = useState([]);
    const [pageSize] = useState(10); // total product appear one page
    const [totalProduct, setTotalProduct] = useState(1); // total result product search
    const [numberPage, setNumberPage] = useState([]);
    const totalPage = [];
    const debouncedSearchTerm = useDebounce(keywordFromUrl, 800);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await searchService.search(keywordFromUrl, pageValue, pageSize);
            setResultSearch(result?.data?.content);
            setTotalProduct(result?.data?.totalElements);

            for (let index = 0; index < result?.data?.totalPages; index++) {
                totalPage.push(index);
            }
            setNumberPage(totalPage);
        };
        fetchApi();
    }, [debouncedSearchTerm, pageValue]);

    const prevPage = () => {
        const currentPage = parseInt(pageValue) === 0 ? 0 : parseInt(pageValue) - 1;
        navigate(`/search/keyword=${keywordFromUrl}/page=${currentPage + 1}`);
    };

    const nextPage = () => {
        const currentPage =
            parseInt(pageValue) < Math.ceil(totalProduct / pageSize) - 1
                ? parseInt(pageValue) + 1
                : parseInt(pageValue);
        navigate(`/search/keyword=${keywordFromUrl}/page=${currentPage + 1}`);
    };

    return (
        <div className=" padding-responsive mx-auto max-w-[1200px]">
            {resultSearch?.length > 0 ? (
                <div className="search-successfully">
                    <div className=" flex items-center  pt-6 pb-3">
                        <h3>Tìm thấy {`${totalProduct}`} kết quả với từ khóa </h3>
                        <p className="font-bold"> &#160;"{`${keywordFromUrl}`}"</p>
                    </div>
                </div>
            ) : (
                //  not found alert
                <div className="not-found">
                    <div className=" flex items-center border-b border-[#e4e6eb] pt-6 pb-3">
                        <h3>Không tìm thấy kết quả với từ khóa </h3>
                        <p className="font-bold"> &#160;"{`${keywordFromUrl}`}"</p>
                    </div>
                    <div className="py-6">
                        <p className="font-bold">Hãy thử lại bằng cách:</p>
                        <ul className="list-disc">
                            <li className="ml-4">Kiểm tra lỗi chính tả của từ khoá đã nhập</li>
                            <li className="ml-4">Thử lại bằng từ khoá khác</li>
                            <li className="ml-4">Thử lại bằng những từ khoá tổng quát hơn</li>
                            <li className="ml-4">Thử lại bằng những từ khoá ngắn gọn hơn</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="mb-8 grid gap-4 transition-all cs:px-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-4 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                {resultSearch?.map((e) => {
                    const price = e?.priceWithUnit?.[0]?.price;
                    return (
                        <SearchProduct
                            key={e?.id}
                            id={e?.id}
                            to={`/detail/slug=${e?.slug}`}
                            label={e.specification}
                            img="a"
                            title={e?.name}
                            newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                            oldPrice={`${convertNumberToPrice(price)}đ`}
                            unit={e?.category}
                            dosage={e?.itemForm}
                            country={e?.country}
                        />
                    );
                })}
            </div>
            <div className="flex items-center justify-center">
                {resultSearch?.length > 0 ? (
                    <button
                        onClick={prevPage}
                        className="mx-1 flex  h-8 w-8 items-center justify-center rounded-sm bg-[#eeeeee] text-sm text-[#bbb9b9] disabled:cursor-not-allowed"
                        disabled={parseInt(pageValue) === 0}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                ) : null}
                {numberPage.map((e, index) => {
                    if (parseInt(pageValue) === index) {
                        return (
                            <button
                                key={index}
                                id={index}
                                className="mx-1 h-8 w-8 rounded-sm bg-[#597bd9] text-sm text-[#fff]"
                                onClick={(e) => {
                                    navigate(`/search/keyword=${keywordFromUrl}/page=${index + 1}`);
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                id={index}
                                className="mx-1 h-8 w-8 rounded-sm transition-all hover:bg-[#dbdbdb]"
                                onClick={(e) => {
                                    navigate(`/search/keyword=${keywordFromUrl}/page=${index + 1}`);
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    }
                })}
                {resultSearch?.length > 0 ? (
                    <button
                        onClick={nextPage}
                        className="mx-1 flex  h-8 w-8 items-center justify-center rounded-sm bg-[#eeeeee] text-sm text-[#bbb9b9] disabled:cursor-not-allowed "
                        disabled={parseInt(pageValue) === numberPage?.length - 1}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default Search;
