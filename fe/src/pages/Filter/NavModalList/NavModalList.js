import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContentNavModalItem } from '~/components/NavModal';
import * as categoryDetailService from '~/services/categoryDetailService';

function NavModalList() {
    const { category,field } = useParams();
    const categoryFromUrl = category.split('=')[1].trim();
    

    const [categoriesFromSlugURL, setCategoriesFromSlugURL] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryDetailService.findCategoryDetailBySlugCategory(categoryFromUrl);
            setCategoriesFromSlugURL(result);
        };
        fetchApi();
    }, [categoryFromUrl]);

    return (
        <>
            <div className="mb-4 flex items-center">
             
            </div>
            <div className="mb-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                {categoriesFromSlugURL?.data?.map((e) => (
                    <ContentNavModalItem
                    id={e?.id}
                        key={e?.id}
                        to={`/filter/field=${field.split("=")[1]}/category=${category.split("=")[1]}/categoryDetail=${e?.slug}`}
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/than-tien-liet-tuyen.png"
                        title={e?.name}
                    />
                ))}
            </div>
        </>
    );
}

export default NavModalList;
