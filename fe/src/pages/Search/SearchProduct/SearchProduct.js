import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';
import { getImageFromFirebase } from '~/utils/firebase';

function SearchProduct({ id, to, label, img, title, newPrice, oldPrice, unit, dosage, country }) {
    const [urlAvatar, setUrlAvatar] = useState('/static/media/placeholder600x600.8239fe13708c0a4484a8.png');
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
        <div className="transition-basic relative mb-4 h-full rounded-md border bg-[#fff] px-3 pt-3  hover:border-[#4f71d0]">
            <NavLink to={to || '/detail'}>
                <div className="absolute top-3 right-3 rounded-3xl bg-[#4f71d0] py-1 px-2 text-[#fff]">
                    <p className="text-xs capitalize">{label}</p>
                </div>
                <img
                    src={urlAvatar}
                    alt="main-img"
                    className="mb-3 max-w-full object-cover px-2 py-2"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = placehoder600;
                    }}
                />
                <p className="mb-2 text-base text-[#334155] line-clamp-2 hover:text-[#072d94]">{title}</p>
                <p className="mb-2 inline-block rounded-md bg-[#edf2f8] px-2 py-1 text-sm text-[#334155]">Thuốc</p>
                <p className="mb-2 text-sm text-[#334155] line-clamp-2 hover:text-[#072d94]">
                    Dạng bào chế:<strong>&#160;{dosage}</strong>
                </p>
                <p className="mb-2 text-sm text-[#334155] line-clamp-2 hover:text-[#072d94]">
                    Xuất xứ thương hiệu:<strong>&#160;{country}</strong>
                </p>
                <p className="price">
                    <span className="font-bold text-[#072d94]">{newPrice}</span>
                    &#8260;
                    <span className="unit capitalize text-[#334155]">{unit}</span>
                </p>
                <p className="old-price h-6 text-[#718198] line-through">{oldPrice} </p>
            </NavLink>
        </div>
    );
}

export default SearchProduct;
