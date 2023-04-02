import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import * as categoryService from '~/services/categoryService';
import * as medicineService from '~/services/medicineService';
import BranchPharmacy from '../Home/BranchPharmacy';
import View from '../Home/View';
import FamousProducts from './FamousProducts';
import FilterCategories from './FilterCategories';
import { FilterBrand, FilterDosage, FilterDrugs, FilterObject, FilterPrice } from './FilterList';
import BestSeller from './BestSeller/BestSeller';

function Filter() {
    const { field } = useParams();
    const fieldFromUrl = field.split('=')[1].trim();
    const [categoriesFromSlugURL, setCategoriesFromSlugURL] = useState([]);

    const [bestSellerByFieldId, setBestSellerByFieldId] = useState([]);
    const [medicineByExpensivePrice, setMedicByExpensivePrice] = useState([]);
    const [medicineByCheapPrice, setMedicByCheapPrice] = useState([]);
    const [medicineByNewRelease, setMedicByCNewRelease] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const resultCategoriesByFieldSlug = await categoryService.getCategoriesByFieldSlug(fieldFromUrl);
            const resultBestSellerByFieldId = await medicineService.bestSellerByFieldId(
                resultCategoriesByFieldSlug?.data[0]?.field,
            );
            const resultFindMedicineByFieldIdOrderByExpensivePrice =
                await medicineService.findMedicineByFieldIdOrderByExpensivePrice(
                    resultCategoriesByFieldSlug?.data[0]?.field,
                );
            const resultFindMedicineByFieldIdOrderByCheapPrice =
                await medicineService.findMedicineByFieldIdOrderByExpensivePrice(
                    resultCategoriesByFieldSlug?.data[0]?.field,
                );
            const findMedicineByFieldIdOrderByNewRelease = await medicineService.findMedicineByFieldIdOrderByNewRelease(
                resultCategoriesByFieldSlug?.data[0]?.field,
            );

            setCategoriesFromSlugURL(resultCategoriesByFieldSlug);
            setBestSellerByFieldId(resultBestSellerByFieldId);
            setMedicByExpensivePrice(resultFindMedicineByFieldIdOrderByExpensivePrice);
            setMedicByCheapPrice(resultFindMedicineByFieldIdOrderByCheapPrice);
            setMedicByCNewRelease(findMedicineByFieldIdOrderByNewRelease);
        };
        fetchApi();
    }, [fieldFromUrl]);

    // const settings3 = {
    //     infinite: true,
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
        <div className="max-w-full overflow-x-hidden">
            <div className="mx-auto my-0 mb-4 max-w-[1200px] ">
                <Breadcrumb />
                <div className="padding-responsive grid gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                    <div className="cs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block 2xl:block">
                        <FilterBrand />

                        <FilterDrugs />

                        <FilterObject />

                        <FilterDosage />

                        <FilterPrice />
                    </div>

                    <div className="xs:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                        {/* list category */}
                        <FilterCategories categoriesFromSlugURL={categoriesFromSlugURL} />
                        <BestSeller bestSellerByFieldId={bestSellerByFieldId} />

                        {/* list famous product  */}
                        <FamousProducts
                            medicineByExpensivePrice={medicineByExpensivePrice}
                            medicineByCheapPrice={medicineByCheapPrice}
                            medicineByNewRelease={medicineByNewRelease}
                        />
                    </div>
                </div>
            </div>

            <View />

            <BranchPharmacy />
        </div>
    );
}

export default Filter;
