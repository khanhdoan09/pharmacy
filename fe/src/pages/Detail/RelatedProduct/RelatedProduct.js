import { useEffect, useState } from 'react';
import ProductMain from '~/components/ProductMain';
import { findMedicineByCategoryDetailId } from '~/services/medicineService';
import { convertNumberToPrice } from '~/utils/currency';

function RelatedProduct({ categoryDetailId, medicineId }) {
    const [medicinesRelated, setMedicinesRelated] = useState([]);
    useEffect(() => {
        if (categoryDetailId !== undefined) {
            findMedicineByCategoryDetailId(categoryDetailId).then((e) => {
                setMedicinesRelated(e?.data?.filter((e) => e?.id !== medicineId));
            });
        }
    }, [categoryDetailId]);
    // const settings3 = {
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //             breakpoint: 1280,
    //             settings: {
    //                 slidesToShow: 5,
    //                 slidesToScroll: 1,
    //                 infinite: true,
    //             },
    //         },
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //                 infinite: true,
    //             },
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 1,
    //                 initialSlide: 2,
    //             },
    //         },
    //         {
    //             breakpoint: 640,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //             },
    //         },
    //         {
    //             breakpoint: 450,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //             },
    //         },
    //     ],
    // };
    return (
        <div className="max-w-full bg-[#edf2f8] ">
            <div className="padding-responsive mx-auto my-0 max-w-[1200px] py-8">
                <div className="flex flex-wrap ">
                    <div className="mb-4 flex max-w-full flex-[0_0_100%] items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-1 h-6 w-6 rounded-full bg-red-500 px-1 py-1 text-[#fff]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                            />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#000]">Sản phẩm liên quan</h3>
                    </div>
                </div>

                <div className="grid gap-4 cs:grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 ">
                    {/* <Slider {...settings3}> */}
                    {medicinesRelated?.slice(0, 5)?.map((e, i) => {
                        const price = e?.priceWithUnit?.[0]?.price;
                        return (
                            <div className="max-w-full px-1" key={i}>
                                <ProductMain
                                    to={`/detail/slug=${e?.slug}`}
                                    id={e?.id}
                                    label={e?.priceWithUnit?.[0]?.name}
                                    img={e?.avatar}
                                    title={e?.name}
                                    newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                                    oldPrice={`${convertNumberToPrice(price)}đ`}
                                    unit={e?.priceWithUnit?.[0]?.name}
                                />
                            </div>
                        );
                    })}
                    {/* </Slider> */}
                </div>
            </div>
        </div>
    );
}

export default RelatedProduct;
