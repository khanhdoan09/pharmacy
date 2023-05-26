import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getImageFromFirebase } from '~/utils/firebase';

function NavModalItem({ id, to = '/filter', img, title, onMouseOver, onMouseOut }) {
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
        <NavLink
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            to={to || '/filter'}
            className="navmodal-item border-r-1 hover:border-y-1 flex items-center border-[#c3cedb] py-2 pr-0 pl-4 transition-all ease-linear hover:border-x-0 hover:border-[#c3cedb] hover:bg-[#edf2f8] hover:font-bold hover:text-[#072D94]	"
        >
            <picture className="mr-2 h-10 w-10 px-2 py-2 hover:rounded-full hover:bg-[#fff]">
                <img src={urlAvatar || 'abc'} alt="navmodal-item-img" />
            </picture>
            <p className="navmodal-item__title text-sm">{title}</p>
        </NavLink>
    );
}

export default NavModalItem;
