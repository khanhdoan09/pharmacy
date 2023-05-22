import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavModal from '~/layouts/components/Navigation/NavModal';
import { categoryList } from '~/redux/categorySlice';
import { fieldList } from '~/redux/fieldSlice';
import * as categoryService from '~/services/categoryService';
import * as fieldService from '~/services/fieldService';
import NavItem from './NavItem';

function Navigation() {
    const [isHovering, setIsHovering] = useState(false);
    const [fields, setFields] = useState([]);
    const [valueFieldHover, setValueFieldHover] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesRoot, setCategoriesRoot] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            const resultAllField = await fieldService.getAllField();
            const getCategories = await categoryService.getCategories();
            setFields(resultAllField);
            setCategoriesRoot(getCategories?.data);
            dispatch(fieldList(resultAllField));
            dispatch(categoryList(getCategories));
        };
        fetchApi();
    }, []);

    const [categoryIdFilter, setCategoryIdFilter] = useState();
    useEffect(() => {
        const filteredCategory = categoriesRoot?.filter((c) => c.field === valueFieldHover);
        setCategories(filteredCategory);
        setCategoryIdFilter(filteredCategory[0]?.id);
    }, [valueFieldHover]);
    return (
        <div className="padding-responsive relative m-auto grid max-w-[1200px] items-center justify-between bg-[#ff] cs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex">
            {fields?.data?.map((e) => {
                return (
                    <div
                        onMouseEnter={() => {
                            setIsHovering(true);
                            setValueFieldHover(e.id);
                            // setCategoryId(1);
                        }}
                        onMouseLeave={() => {
                            setIsHovering(false);
                        }}
                        key={e?.id}
                        className='grow'
                    >
                        <NavItem to={`/filter/slug=${e.slug}`} >
                            <p className="text-xs font-bold uppercase">{e?.name}</p>
                            {isHovering && valueFieldHover === e?.id ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="ml-1 h-4 w-4 rotate-180 transition-all"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="ml-1 h-4 w-4 transition-all"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            )}
                        </NavItem>
                    </div>
                );
            })}

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
                    className="nav-content before:['Not_Hovering'] absolute top-11 left-0  z-50 animate-fadeBottomMobile rounded-md bg-[#edf2f8] before:absolute before:-top-5 before:left-0 before:h-10 before:w-full before:bg-transparent"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <NavModal
                        fields={fields}
                        categories={categories} // danh sach loc theo field id
                        // categoryId={categoryId}
                        categoryIdFilter={categoryIdFilter} // categoryID dau tien
                    />
                </div>
            )}
        </div>
    );
}

export default Navigation;
