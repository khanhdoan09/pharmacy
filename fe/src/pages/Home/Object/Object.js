import { useEffect, useState } from 'react';
import ProductMain from '~/components/ProductMain';
import { findMedicinesByObject } from '~/services/medicineService';
import { convertNumberToPrice } from '~/utils/currency';

function Object() {
    const [active, setActive] = useState('1');
    const [medicinesForChildren, setMedicinesForChildren] = useState([]);
    const [medicinesForAdult, setMedicinesForAdult] = useState([]);
    const [medicinesForPregnancy, setMedicinesForPregnancy] = useState([]);

    useEffect(() => {
        findMedicinesByObject('Trẻ từ 12 tháng tuổi').then((e) => {
            setMedicinesForChildren(e?.data);
        });
    }, []);
    const handleClickFilter = (event) => {
        const activeId = event.target.id;
        setActive(activeId);
        if (activeId == 2 && medicinesForAdult.length === 0) {
            findMedicinesByObject('Trên 12 tuổi').then((e) => {
                setMedicinesForAdult(e?.data);
            });
        } else if (activeId == 3 && medicinesForPregnancy.length === 0) {
            findMedicinesByObject('Phụ nữ cho con bú').then((e) => {
                setMedicinesForPregnancy(e?.data);
            });
        }
    };

    return (
        <div className="mx-auto my-0 max-w-[1200px] py-8">
            <div className="xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1 ">
                <div className=" mb-4 flex max-w-full flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-6 w-6 rounded-full bg-[#072d94] px-1 py-1 text-[#fff]"
                        >
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#000] ">Sản Phẩm Theo Đối Tượng</h3>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">Lọc theo</p>
                        <button
                            key={1}
                            className={
                                active === '1'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff] '
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'1'}
                            onClick={handleClickFilter}
                        >
                            Trẻ Em
                        </button>
                        <button
                            key={2}
                            className={
                                active === '2'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'2'}
                            onClick={handleClickFilter}
                        >
                            Người Cao Tuổi
                        </button>
                        <button
                            key={3}
                            className={
                                active === '3'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'3'}
                            onClick={handleClickFilter}
                        >
                            Phụ Nữ Cho Con Bú
                        </button>
                    </div>
                </div>
            </div>
            {active === '1' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    {medicinesForChildren?.map((e, i) => {
                        const price = e?.priceWithUnit?.[0]?.price;
                        return (
                            <ProductMain
                                key={i}
                                to={`detail/medicine=${e?.id}`}
                                id={e?.id}
                                label={e?.priceWithUnit?.[0]?.name}
                                img={e?.avatar}
                                title={e?.name}
                                newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                                oldPrice={`${convertNumberToPrice(price)}đ`}
                                unit={e?.priceWithUnit?.[0]?.name}
                            />
                        );
                    })}
                </div>
            )}
            {active === '2' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    {medicinesForAdult?.map((e, i) => {
                        const price = e?.priceWithUnit?.[0]?.price;
                        return (
                            <ProductMain
                                key={i}
                                to={`detail/medicine=${e?.id}`}
                                id={e?.id}
                                label={e?.priceWithUnit?.[0]?.name}
                                img={e?.avatar}
                                title={e?.name}
                                newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                                oldPrice={`${convertNumberToPrice(price)}đ`}
                                unit={e?.priceWithUnit?.[0]?.name}
                            />
                        );
                    })}
                </div>
            )}
            {active === '3' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    {medicinesForPregnancy?.map((e, i) => {
                        const price = e?.priceWithUnit?.[0]?.price;
                        return (
                            <ProductMain
                                key={i}
                                to={`detail/medicine=${e?.id}`}
                                id={e?.id}
                                label={e?.priceWithUnit?.[0]?.name}
                                img={e?.avatar}
                                title={e?.name}
                                newPrice={`${convertNumberToPrice(price - (price * e?.discount) / 100)}đ`}
                                oldPrice={`${convertNumberToPrice(price)}đ`}
                                unit={e?.priceWithUnit?.[0]?.name}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Object;
