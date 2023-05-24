import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';
import { getImageFromFirebase } from '~/utils/firebase';
import { randomText } from '~/utils/randomUtils';

function ProductMain({ id, to, label, img, title, newPrice, oldPrice, unit }) {
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
    const handleClick = (medicineId) => {
        localStorage.setItem('medicineId', randomText(8) + medicineId);
    };
    return (
        <div
            className="transition-basic relative mb-4 h-full rounded-md border bg-[#fff] px-3 pt-3 pb-2 hover:border-[#4f71d0]"
            onClick={() => handleClick(id)}
        >
            <NavLink to={to || '/detail'}>
                <div className="absolute top-3 right-3 rounded-3xl bg-[#4f71d0] py-1 px-2 text-[#fff]">
                    <p className="text-xs capitalize">{label}</p>
                </div>
                <img
                    src={urlAvatar || 'áđá'}
                    alt="main-img"
                    className="mb-3 max-w-full object-cover px-2 py-2"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = placehoder600;
                    }}
                />
                <p className="mb-2 text-base text-[#334155] line-clamp-2 hover:text-[#072d94]">{title}</p>
                <p className="price">
                    <span className="font-bold text-[#072d94]">{newPrice}</span>
                    &#8260;
                    <span className="unit capitalize text-[#334155]">{unit}</span>
                </p>
                <p className="old-price left-6 h-6 text-[#718198] line-through">{oldPrice || ' '} </p>
            </NavLink>
        </div>
    );
}

export default ProductMain;
