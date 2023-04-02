import { NavLink } from 'react-router-dom';
import placehoder600 from '~/assets/img/nav/placeholder600x600.png';

function ContentNavModalItem({ to, img, title }) {
    return (
        <NavLink to={to || '/filter'}>
            <div className="mb-2 flex items-center justify-center rounded-3xl border border-[#c3cedb] bg-[#fff] pt-1 pr-4  pb-1 pl-1 transition-all ease-linear hover:bg-[#edf2f8] hover:font-bold hover:shadow-md">
                <picture className="mr-2 h-10 w-10 px-2 py-2 hover:rounded-full">
                    <img
                        src={img}
                        alt="navmodal-item-img"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = placehoder600;
                        }}
                    />
                </picture>
                <p className="navmodal-item__title text-sm line-clamp-1">{title}</p>
            </div>
        </NavLink>
    );
}

export default ContentNavModalItem;
