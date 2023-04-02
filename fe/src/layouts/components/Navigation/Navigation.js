import { useEffect, useState } from 'react';
import NavModal from '~/layouts/components/Navigation/NavModal';
import NavItem from './NavItem';
import * as fieldService from '~/services/fieldService';
import * as categoryService from '~/services/categoryService';

function Navigation() {
    const [isHovering, setIsHovering] = useState(false);
    const [fields, setFields] = useState([]);
    const [categoriesByFid, setCategoriesByFid] = useState([]);
    const [valueFieldHover, setValueFieldHover] = useState(1);

    useEffect(() => {
        const fetchApi = async () => {
            const resultAllField = await fieldService.getAllField();
            setFields(resultAllField);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const categoriesByFieldId = await categoryService.getCategoriesByFieldId(valueFieldHover);
            setCategoriesByFid(categoriesByFieldId);
        };
        fetchApi();
    }, [valueFieldHover]);
    return (
        <div className="nav grid-cols-42 padding-responsive relative m-auto grid max-w-[1200px] items-center justify-between bg-[#ff] cs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex">
            {fields?.data?.map((e) => (
                <div
                    onMouseEnter={() => {
                        setIsHovering(true);
                        setValueFieldHover(e.id);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    key={e?.id}
                >
                    <NavItem to={`/filter/slug=${e.slug}`}>
                        <p className="text-xs font-bold uppercase">{e?.name}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="ml-1 h-4 w-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </NavItem>
                </div>
            ))}

            <NavItem>
                <p className="text-xs font-bold uppercase">BỆNH</p>
            </NavItem>
            <NavItem>
                <p className="text-xs font-bold uppercase">GÓC SỨC KHỎE</p>
            </NavItem>
            <NavItem>
                <p className="text-xs font-bold uppercase">HỆ THỐNG NHÀ THUỐC</p>
            </NavItem>

            {isHovering && (
                <div
                    className="nav-content absolute top-10 left-0 z-10  animate-fadeBottomMobile rounded-md bg-[#edf2f8]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <NavModal  categoriesByFid={categoriesByFid} />
                </div>
            )}
        </div>
    );
}

export default Navigation;
