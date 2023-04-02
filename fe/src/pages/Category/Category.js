import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import * as categoryService from '~/services/categoryService';
import * as medicineService from '~/services/medicineService';
import { FilterBrand, FilterDosage, FilterDrugs, FilterObject, FilterPrice } from '../Filter/FilterList';
import NavModalList from '../Filter/NavModalList';
import BranchPharmacy from '../Home/BranchPharmacy';
import View from '../Home/View';
import BestSeller from './BestSeller/BestSeller';
import FamousProducts from './FamousProducts/FamousProducts';

function Category() {
    const { field } = useParams();
    const fieldFromUrl = field.split('=')[1].trim();
    const [categoriesFromSlugURL, setCategoriesFromSlugURL] = useState([]);

    const [bestSellerByCategoryId, setBestSellerByCategoryId] = useState([]);
    const [medicineByExpensivePrice, setMedicByExpensivePrice] = useState([]);
    const [medicineByCheapPrice, setMedicByCheapPrice] = useState([]);
    const [medicineByNewRelease, setMedicByCNewRelease] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const resultCategoriesByFieldSlug = await categoryService.getCategoriesByFieldSlug(fieldFromUrl);
            const resultBestSellerByCategoryId = await medicineService.bestSellerByCategoryId(
                resultCategoriesByFieldSlug?.data[0]?.id,
            );
            const resultFindMedicineByCategoryIdOrderByExpensivePrice =
                await medicineService.findMedicineByCategoryIdOrderByExpensivePrice(
                    resultCategoriesByFieldSlug?.data[0]?.id,
                );
            const resultFindMedicineByCategoryIdOrderByCheapPrice =
                await medicineService.findMedicineByCategoryIdOrderByCheapPrice(
                    resultCategoriesByFieldSlug?.data[0]?.id,
                );

            const findMedicineByCategoryIdOrderByNewRelease =
                await medicineService.findMedicineByCategoryIdOrderByNewRelease(
                    resultCategoriesByFieldSlug?.data[0]?.id,
                );

            // setCategoriesFromSlugURL(resultCategoriesByFieldSlug);
            setBestSellerByCategoryId(resultBestSellerByCategoryId.data);
            setMedicByExpensivePrice(resultFindMedicineByCategoryIdOrderByExpensivePrice);
            setMedicByCheapPrice(resultFindMedicineByCategoryIdOrderByCheapPrice);
            setMedicByCNewRelease(findMedicineByCategoryIdOrderByNewRelease);
        };
        fetchApi();
    }, [fieldFromUrl]);
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
                        <NavModalList />

                        <BestSeller bestSellerByCategoryId={bestSellerByCategoryId} />
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

export default Category;
