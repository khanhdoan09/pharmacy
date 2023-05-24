import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';
import { getImageFromFirebase } from '~/utils/firebase';

function ProductSeller({ id, to, img, name, newPrice, unit, oldPrice, backgroundColor, px, py, borderRadius }) {
    const [urlAvatar, setUrlAvatar] = useState(null);
    useEffect(() => {
        if (id !== undefined) {
            const imagePromise = getImageFromFirebase('product', `${id}`, `avatar`);
            imagePromise.then(
                (urlAvatar) => {
                    setUrlAvatar(urlAvatar);
                },
                (err) => {},
            );
        }
    }, []);
    return (
        <div className={`product ${backgroundColor + ' ' + px + ' ' + py + ' ' + borderRadius}`}>
            <NavLink to={to || ''} className="flex justify-center">
                <img
                    src={urlAvatar}
                    alt="product-img"
                    className="h-[157px] w-[155px] rounded-md border border-[#d8e0e8] bg-[#fff] object-cover px-2 py-2 transition-all ease-linear hover:border-[#072d94]"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = placehoder600;
                    }}
                />
            </NavLink>
            <NavLink to={to || ''} className="text-base text-[#334155] line-clamp-2 hover:text-[#072d94]">
                {name}
            </NavLink>
            <p className="price">
                <span className="font-bold text-[#072d94]">{newPrice}</span>
                &#8260;
                <span className="unit text-[#334155]">{unit}</span>
            </p>
            <p className="old-price text-[#718198] line-through">{oldPrice}</p>
        </div>
    );
}

export default ProductSeller;
