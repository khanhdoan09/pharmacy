import { NavLink } from 'react-router-dom';
import FilterCategory from './FilterCategory';

function FilterCategories() {
    return (
        <div className="filters mb-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-2">
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/dinh-duong.png"
                title="Dinh dưỡng"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/sinh-ly-noi-tiet-to.png"
                title="Sinh lý - nội tiết tố"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png"
                title="Cải thiện tăng cường chức năng"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/lam-dep.png"
                title="Hỗ trợ làm đẹp"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/than-kinh-nao.png"
                title="Thần kinh não"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
            <FilterCategory
                img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/ho-tro-tieu-hoa.png"
                title="Hỗ trợ tiêu hóa"
                quantity="134"
                to=""
            >
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Nước rửa tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
                <NavLink to="" className="pb-2 text-sm text-[#1d48ba]">
                    Vệ sinh tay
                </NavLink>
            </FilterCategory>
        </div>
    );
}

export default FilterCategories;
