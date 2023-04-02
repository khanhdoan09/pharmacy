import { NavLink } from 'react-router-dom';
import FilterCategory from './FilterCategory';

function FilterCategories(props) {
    return (
        <div className="filters mb-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-2">
            {props.categoriesFromSlugURL?.data?.map((e) => (
                <FilterCategory
                    key={e.id}
                    img="https://cdn.nhsathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/dinh-duong.png"
                    title={e.category}
                    quantity="134"
                    to=""
                >
                    {e.categoryDetails.map((detail) => (
                        <NavLink to="" className="pb-2 text-sm text-[#1d48ba]" key={detail.id}>
                            {detail.name}
                        </NavLink>
                    ))}
                </FilterCategory>
            ))}
        </div>
    );
}

export default FilterCategories;
