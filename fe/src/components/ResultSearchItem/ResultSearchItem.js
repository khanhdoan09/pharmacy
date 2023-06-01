import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';
import { useEffect, useState } from 'react';
import { getImageFromFirebase } from '~/utils/firebase';

function ResultSearchItem({ id, to, img, name, title, oldPrice, newPrice, unit, onClick }) {
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
        <NavLink to={to || ''}>
            <div className="result-item flex items-center border-b-2 py-2 px-6" onClick={onClick}>
                <img
                    src={urlAvatar}
                    alt="result-img"
                    className="mr-2 h-[64px] w-[64px] object-cover"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = placehoder600;
                    }}
                />
                <div className="result-item__info">
                    <p className="text-sm text-[#334155] line-clamp-2">{name}</p>
                    <span className="mt-1 h-6 rounded-sm bg-[#edf2f8] px-2 text-sm text-[#334155] ">{title}</span>
                    <div className="price">
                        <span className="old-price mr-1 text-sm line-through">{oldPrice}</span>
                        <span className="new-price text-base font-bold text-[#072d94]">{newPrice} &#8260;</span>
                        <span className="unit text-sm">{unit}</span>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default ResultSearchItem;
