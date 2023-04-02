import { NavLink } from 'react-router-dom';

function NavItem({ children, to }) {
    return (
        <NavLink
            to={to || '/'}
            className="nav-title flex items-center border-2 border-transparent py-[10px] hover:border-b-2  hover:border-b-[#f59e0b]	"
        >
            {children}
        </NavLink>
    );
}

export default NavItem;
