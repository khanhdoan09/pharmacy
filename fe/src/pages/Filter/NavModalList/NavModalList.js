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
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-7 w-7 rounded-full bg-[#1d48ba] px-1 text-[#fff]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>

                <h3 className="font-bold">Chăm sóc cá nhân</h3> */}
            </div>
            <div className="mb-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                {categoriesFromSlugURL?.data?.map((e) => (
                    <ContentNavModalItem
                        key={e.id}
                        to={`/filter/field=${field.split("=")[1]}/category=${category.split("=")[1]}/categoryDetail=${e?.slug}`}
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/than-tien-liet-tuyen.png"
                        title={e.name}
                    />
                ))}
            </div>
        </>
    );
}

export default NavModalList;
