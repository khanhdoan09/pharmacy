import { NavLink } from 'react-router-dom';
import FilterCategory from './FilterCategory';

function FilterCategories(props) {
    return (
        <>
            <h3 className='text-[#020b27] font-medium text-lg my-4'>{props?.categories[0]?.fieldOfCategory?.name}</h3>
            <div className="filters mb-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                {props.categories?.map((e) => (
                    <FilterCategory
                        key={e.id}
                        img="https://cdn.nhsathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/dinh-duong.png"
                        title={e.category}
                        // quantity="134"
                        to={`/filter/field=${e?.fieldOfCategory?.slug}/category=${e?.slug}`}
                    >
                        {e.categoryDetails?.map((detail) => (
                            <NavLink
                                to={`/filter/field=${e?.fieldOfCategory?.slug}/category=${e?.slug}/categoryDetail=${detail?.slug}`}
                                className="pb-2 text-sm font-medium text-[#1250DC] hover:underline"
                                key={detail.id}
                            >
                                {detail.name}
                            </NavLink>
                        ))}
                    </FilterCategory>
                ))}
            </div>
        </>
    );
}

export default FilterCategories;
