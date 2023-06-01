import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as categoryService from '~/services/categoryService';
import BranchPharmacy from '../Home/BranchPharmacy';
import View from '../Home/View';
import FilterCategories from './FilterCategories';

function Filter() {
    const [categories, setCategories] = useState([]);
    const [categoriesRoot, setCategoriesRoot] = useState([]);
    const[categoriesSlug, setCategoriSlug] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const getCategories = await categoryService.getCategories();
            const getCategoriesByFieldSlug = await categoryService.getCategoriesByFieldSlug(slug.split('=')[1])
            setCategoriSlug(getCategoriesByFieldSlug?.data)
            setCategoriesRoot(getCategories?.data);

        };
        fetchApi();
    }, []);

   
    const filterCategory = categoriesRoot?.filter((c) => c.fieldOfCategory?.slug === slug.split('=')[1]);
    
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
            <div className="mx-auto my-0 mb-4 max-w-[1200px] padding-responsive ">
                {/* <Breadcrumb /> */}
                {/* <div className=" grid gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5"> */}
                    {/* <div className="xs:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 2xl:col-span-4"> */}
                        {/* list category */}
                        <FilterCategories categories={filterCategory} categoriesSlug={categoriesSlug}/>
                    {/* </div> */}
                {/* </div> */}
            </div>

            <View />

            <BranchPharmacy />
        </div>
    );
}

export default Filter;
