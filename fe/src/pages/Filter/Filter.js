
import Breadcrumb from '~/components/Breadcrumb';
import BestSeller from './BestSeller';
import View from '../Home/View';
import FilterCategories from './FilterCategories';
import FamousProducts from './FamousProducts';
import NavModalList from './NavModalList';
import { FilterBrand, FilterDosage, FilterDrugs, FilterObject, FilterPrice } from './FilterList';
import BranchPharmacy from '../Home/BranchPharmacy';

function Filter() {
    const settings3 = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="max-w-full overflow-x-hidden">
            <div className="max-w-[1200px] mx-auto my-0 mb-4 ">
                <Breadcrumb />
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 cs:grid-cols-1 gap-4 padding-responsive">
                    <div className="2xl:block xl:block lg:block md:hidden sm:hidden xs:hidden cs:hidden">
                        <FilterBrand />

                        <FilterDrugs />

                        <FilterObject />

                        <FilterDosage />

                        <FilterPrice />
                    </div>

                    <div className="2xl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-2 sm:col-span-2 xs:col-span-2">
                        <NavModalList />

                        {/* list category */}
                        <FilterCategories />

                        <BestSeller />

                        {/* list famous product  */}
                        <FamousProducts />
                    </div>
                </div>
            </div>

            <View />

            <BranchPharmacy />
        </div>
    );
}

export default Filter;
