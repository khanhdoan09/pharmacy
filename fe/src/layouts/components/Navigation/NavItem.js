import { NavLink } from 'react-router-dom';

function NavItem({ children }) {
    return (
        <NavLink
            to="/filter"
            className="nav-title flex items-center border-2 border-transparent hover:border-b-[#f59e0b] hover:border-b-2  py-[10px]	"
        >
           {children}
        </NavLink>
    );
}

export default NavItem;
