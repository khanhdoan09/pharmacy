import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';

function FilterCategory({ img, title, quantity, to, children }) {
    return (
        <div className="filter-category flex h-[196px] rounded-lg border">
            <div className="flex w-[163.44px] flex-col items-center justify-center bg-[#edf2f8] ">
                <NavLink to={to}>
                    <img
                        src={img}
                        alt="category-img"
                        className="mx-auto my-0 flex h-20 w-20 object-cover"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = placehoder600;
                        }}
                    />
                    <h3 className="px-[10px] text-center font-bold line-clamp-2">{title}</h3>
                    {/* <p className="text-[#a7b2c2]">{quantity} sản phẩm</p> */}
                </NavLink>
            </div>
            <div className="flex flex-col pt-2 pl-3">{children}</div>
        </div>
    );
}

export default FilterCategory;
