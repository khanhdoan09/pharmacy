import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';

function ProductAds({ to, label, img, title, newPrice, oldPrice, unit }) {
    return (
        <div className="product-main relative mx-auto flex h-[292px] w-[176px] flex-col rounded-md border bg-[#fff] px-3 py-3 hover:border-[#4f71d0] ">
            <NavLink to={to || '/detail'}>
                <div className="product-label absolute top-3 right-3 rounded-3xl bg-[#4f71d0] py-1 px-2 text-[#fff]">
                    <p className="text-xs capitalize">{label}</p>
                </div>
                <img
                    src={img}
                    alt="main-img"
                    className="mb-3 h-[150px] w-full object-cover px-2 py-2"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = placehoder600;
                    }}
                />
                <p className="mb-2 text-base text-[#334155] line-clamp-2 hover:text-[#072d94]">{title}</p>
                <p className="price">
                    <span className="font-bold text-[#072d94]">{newPrice}</span>
                    &#8260;
                    <span className="unit text-[#334155] ">{unit}</span>
                </p>
                <p className="old-price text-[#718198] line-through">{oldPrice}</p>
            </NavLink>
        </div>
    );
}

export default ProductAds;
