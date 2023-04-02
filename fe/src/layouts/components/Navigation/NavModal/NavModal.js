import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import n1 from '~/assets/img/nav/n1.png';
import n2 from '~/assets/img/nav/n2.png';
import n3 from '~/assets/img/nav/n3.png';
import n4 from '~/assets/img/nav/n4.png';
import n5 from '~/assets/img/nav/n5.png';
import ContentNavModalItem from './ContentNavModalItem';
import NavModalItem from './NavModalItem';

import ProductSeller from '~/components/ProductSeller';
import * as categoryDetailService from '~/services/categoryDetailService';
import * as medicineService from '~/services/medicineService';

function NavModal(props) {
    const [categoryId, setCategoryId] = useState(1);
    const [categoryDetailsByCategoryId, setCategoryDetailsByCategoryId] = useState([]);
    const [bestSellerByCategoryId, setBestSellerByCategoryId] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const categoriesByFieldId = await categoryDetailService.getCategoryDetailByCategoryId(categoryId);
            const resultBestSellerByFieldId = await medicineService.bestSellerByFieldId(categoryId);
            setCategoryDetailsByCategoryId(categoriesByFieldId);
            setBestSellerByCategoryId(resultBestSellerByFieldId);
        };
        fetchApi();
    }, [categoryId]);

    return (
        <div className="wrapper-navmodal grid w-[1200px] grid-cols-4  shadow-lg">
            <div className="col-span-1 bg-[#fff] ">
                {props?.categoriesByFid?.data?.map((e) => (
                    <NavModalItem
                        key={e.id}
                        to={`/filter/field=${e.fieldOfCategory.slug}/category=${e.slug}`}
                        img={e.image + 'á'}
                        title={e.category}
                        onMouseOver={() => setCategoryId(e.id)}
                        onMouseOut={() => {}}
                    />
                ))}
            </div>

            {/* content nav modal item  */}
            <div className="col-span-3 px-4 py-4 ">
                <div className="grid grid-cols-4 gap-2 border-b border-[#d8e0e8] ">
                    {categoryDetailsByCategoryId?.data?.map((e) => (
                        <div className="px-1" key={e.id}>
                            <ContentNavModalItem to={e.s} img={e.image + 'a'} title={e.name} />
                        </div>
                    ))}
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
                        {bestSellerByCategoryId?.data?.slice(0, 5)?.map((e) => {
                            return (
                                <div className=" px-1" key={e.id}>
                                    <ProductSeller
                                        img={n5 + 's'}
                                        name="Viên uống Maca M Male Power Nature's Supplements bổ thận, tráng dương (60 viên)"
                                        newPrice="627.000đ"
                                        unit="Hộp"
                                        oldPrice="660.000đ"
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
