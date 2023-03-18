import { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import ResultSearchItem from '~/components/ResultSearchItem';

function SearchHome() {
    const ref = useRef(null);
    const [showHintSearch, setShowHintSearch] = useState('');
    const [showSearchMobile, setShowSearchMobile] = useState(false);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setShowSearchMobile(true);
    };
    const handleChange = (e) => {
        setShowHintSearch(e.target.value);
    };
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 750px)' });
    return (
        <div
            className="search mx-auto my-8  h-[252px] max-w-[1200px] rounded-md bg-[#fff]  px-[80px] py-6 shadow-md  "
            ref={ref}
            onClick={handleClick}
        >
            <h1 className="mb-4 text-[32px] font-bold line-clamp-1 ">Tra Cứu Thuốc, TPCN, Bệnh Lý...</h1>

            {/* search form pc */}
            <form className="flex min-w-[110px] mx-auto ">
                <div className="relative w-full">
                    <input
                        placeholder="Nhập từ khóa..."
                        className="w-full rounded-3xl rounded-r-none border border-[#d8e0e8] pl-6 pr-4 outline-0 focus:border-[#072d94] cs:h-[40px] xs:h-[40px] sm:h-[40px] md:h-[54px] lg:h-[54px] xl:h-[54px] 2xl:h-[54px] "
                        onChange={handleChange}
                    />
                    {/* modal result search  */}
                    {showHintSearch.length !== 0 && (
                        <div className="results absolute left-0 z-10 w-full rounded-lg bg-[#ffffff] shadow-2xl">
                            <ResultSearchItem
                                to=""
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                                name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                                title="Thuốc"
                                oldPrice="123.000đ"
                                newPrice="12.123đ"
                                unit="Hộp"
                            />
                            <ResultSearchItem
                                to=""
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                                name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                                title="Thuốc"
                                oldPrice="123.000đ"
                                newPrice="12.123đ"
                                unit="Hộp"
                            />
                            <ResultSearchItem
                                to=""
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                                name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                                title="Thuốc"
                                oldPrice="123.000đ"
                                newPrice="12.123đ"
                                unit="Hộp"
                            />
                            <ResultSearchItem
                                to=""
                                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                                name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                                title="Thuốc"
                                oldPrice="123.000đ"
                                newPrice="12.123đ"
                                unit="Hộp"
                            />

                            <NavLink
                                to=""
                                className="flex items-center justify-center py-2 text-sm text-[#1d48ba] hover:underline"
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </NavLink>
                        </div>
                    )}
                </div>

                <button
                    className="rounded-3xl rounded-l-none bg-[#1d48ba] 2xl:px-[38px] xl:px-[38px] lg:px-[38px] md:px-[30px] sm:px-[30px] xs:px-[20px] cs:px-[10px] cs:block cs:h-[40px] xs:block xs:h-[40px] sm:block sm:h-[40px] md:block md:h-[54px] lg:block lg:h-[54px] xl:block xl:h-[54px] 2xl:block 2xl:h-[54px]"
                    type="button"
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </form>

            {/* search form mobile  */}
            {isTabletOrMobile && showSearchMobile && showHintSearch.length !== 0 && (
                <form className="fixed top-0 left-0 z-50 h-screen w-screen bg-[#fff]">
                    <div className="search-form__header flex items-center py-2 pl-[34px] pr-[10px] shadow-xl cs:px-4 xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1 ">
                        <div className="flex w-full items-center rounded-l-3xl  border border-[#d8e0e8] ">
                            <input
                                placeholder="Nhập từ khóa..."
                                className=" h-[34px] w-[93%] bg-transparent pr-3 pl-4 text-sm leading-[34px] outline-none"
                                value={showHintSearch}
                                onChange={(e) => {
                                    setShowHintSearch(e.target.value);
                                }}
                            />
                            {showHintSearch.length !== 0 && (
                                <button
                                    className="top-3/2 absolute right-5 z-10 bg-[#fff] px-1"
                                    onClick={(e) => setShowHintSearch('')}
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
                        </div>
                    </div>
                    <div className="results absolute left-0 w-full rounded-lg bg-[#ffffff] shadow-2xl">
                        <ResultSearchItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                            name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                            title="Thuốc"
                            oldPrice="123.000đ"
                            newPrice="12.123đ"
                            unit="Hộp"
                        />
                        <ResultSearchItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                            name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                            title="Thuốc"
                            oldPrice="123.000đ"
                            newPrice="12.123đ"
                            unit="Hộp"
                        />
                        <ResultSearchItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                            name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                            title="Thuốc"
                            oldPrice="123.000đ"
                            newPrice="12.123đ"
                            unit="Hộp"
                        />
                        <ResultSearchItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/03/00033518-vita-gummies-vitamin-d3-1000iu-120v-7608-6226_large.jpg"
                            name="Kẹo dẻo Vita Gummies Vitamin D3 Nature's Way hỗ trợ xương khớp (120 viên)"
                            title="Thuốc"
                            oldPrice="123.000đ"
                            newPrice="12.123đ"
                            unit="Hộp"
                        />

                        <NavLink
                            to="/filter"
                            className="flex items-center justify-center py-2 text-sm text-[#1d48ba] hover:underline"
                            onClick={() => setShowSearchMobile(!showSearchMobile)}
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </NavLink>
                    </div>
                </form>
            )}
        </div>
    );
}

export default SearchHome;
