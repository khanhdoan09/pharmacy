import { NavLink } from 'react-router-dom';

function ProtectItem({ img, title, to, more }) {
    return (
        <div
            className="mx-auto flex w-full items-center justify-center rounded-lg bg-[#fff] px-3 py-4 shadow-2xl "
        >
            <NavLink to={to || ''}>
                <img src={img} alt="img" className="mr-6 h-[80px] w-[80px] rounded-sm object-cover" />
            </NavLink>
            <div className="cs:hidden xs:block sm:block md:block lg:block xl:block 2xl:block">
                <h1 className="text-[14px] font-bold xs:hidden">{title}</h1>
                <NavLink to={to || ''} className="flex items-center text-sm">
                    <span>{more}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </NavLink>
            </div>
        </div>
    );
}

export default ProtectItem;
