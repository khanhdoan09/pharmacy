import { NavLink } from 'react-router-dom';

function FamousItem({ to, img, title }) {
    return (
        <NavLink to={to || ''}>
            <div className="mx-auto flex h-full w-[160px] flex-col items-center rounded-lg border border-[#dceaf3] px-4 pt-6 pb-5 align-middle transition-all hover:bg-[#ecf5fc] hover:shadow-lg">
                <img src={img} alt="img-item-famous" className="mx-auto flex h-[110px] w-[105px] object-cover" />
                <p className="mt-4 text-center text-sm font-bold">{title}</p>
            </div>
        </NavLink>
    );
}

export default FamousItem;
