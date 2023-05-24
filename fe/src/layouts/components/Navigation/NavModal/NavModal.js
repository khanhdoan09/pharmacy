import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductSeller from '~/components/ProductSeller';
import { convertNumberToPrice } from '~/utils/currency';
import ContentNavModalItem from './ContentNavModalItem';
import NavModalItem from './NavModalItem';
import { getImageFromFirebase, getImageList, getImageURL } from '~/utils/firebase';
function NavModal(props) {
    const [categoryId, setCategoryId] = useState();
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [bestSell, setBestSell] = useState([]);
    const [medicinesRoot, setMedicinesRoot] = useState([]);

    const medicine = useSelector((state) => state.medicine);
    useEffect(() => {
        setMedicinesRoot(medicine?.data);
    }, [medicine]);

    useEffect(() => {
        const filterProductByCID = medicinesRoot?.filter((m) => m.categoryDetail.categoryId === categoryId);
        const filterBestSell = filterProductByCID?.slice(0, 5)?.sort((a, b) => b.saleNumber - a.saleNumber);
        setBestSell(filterBestSell);
        const filteredCategory = props?.categories?.filter((category) => {
            const categoryDetails = category.categoryDetails;
            return categoryDetails.some((i) => i?.categoryId === categoryId);
        });
        setCategoryDetails(filteredCategory[0]);
    }, [categoryId]);

    useEffect(() => {
        setCategoryDetails(props?.categories[0]);
    }, [props?.categories]);

    return (
        <div className="wrapper-navmodal grid w-[1200px] grid-cols-4  shadow-lg">
            <div className="col-span-1 bg-[#fff]">
                {props?.categories?.map((e) => (
                    <NavModalItem
                        key={e.id}
                        id={e?.id}
                        to={`/filter/field=${e.fieldOfCategory.slug}/category=${e.slug}`}
                        title={e.category}
                        onMouseOver={() => {
                            setCategoryId(e.id);
                        }}
                        onMouseOut={() => {}}
                    />
                ))}
            </div>

            {/* content nav modal item  */}
            <div className="col-span-3 px-4 py-4 ">
                <div className="grid grid-cols-4 gap-2 border-b border-[#d8e0e8] ">
                    {categoryDetails?.categoryDetails?.map((e) => {
                        return (
                            <div className="px-1" key={e.id}>
                                <ContentNavModalItem
                                    id={e?.id}
                                    to={`/filter/field=${categoryDetails?.fieldOfCategory?.slug}/category=${categoryDetails?.slug}/categoryDetail=${e?.slug}`}
                                    img={e?.image + 'a'}
                                    title={e?.name}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="pt-3  pb-4">
                    <div className="mb-3 flex flex-wrap">
                        <div className="flex max-w-[50%] flex-[0_0_50%] items-center px-1 ">
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
                            <p className="text-sm font-bold">Bán chạy nhất</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {bestSell?.slice(0, 5)?.map((e) => {
                            return (
                                <div className=" px-1" key={e.id}>
                                    <ProductSeller
                                        to={`/detail/slug=${e?.slug}`}
                                        id={e?.id}
                                        img={e?.avatar}
                                        name={e?.name}
                                        unit={e?.category}
                                        newPrice={`${convertNumberToPrice(e?.price - (e?.price * e?.discount) / 100)}đ`}
                                        oldPrice={`${convertNumberToPrice(e?.price)}đ`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavModal;
