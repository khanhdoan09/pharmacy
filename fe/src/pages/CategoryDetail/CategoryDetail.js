import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filters from '~/components/Filters/Filters';
import * as medicineService from '~/services/medicineService';
import BranchPharmacy from '../Home/BranchPharmacy';
import View from '../Home/View';
import FamousProducts from './FamousProducts/FamousProducts';

function CategoryDetail() {
    const { field, category } = useParams();
    const [medicineList, setMedicineList] = useState([]);
    const [medicineListRoot, setMedicineListRoot] = useState([]);

    //new filter
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([0, 500000]);

    useEffect(() => {
        const fetchApi = async () => {
            const re = await medicineService.findBySlugFieldAndSlugCategory(
                field.split('=')[1],
                category.split('=')[1],
            );
            setMedicineList(re?.data);
            setMedicineListRoot(re?.data);
        };
        fetchApi();
    }, [field.split('=')[1], category.split('=')[1]]);

    const uniqueIngredients = medicineListRoot?.reduce((acc, product) => {
        const ingredients = product.ingredient;

        ingredients.forEach((ingredient) => {
            if (!acc.includes(ingredient)) {
                acc.push(ingredient);
            }
        });

        return acc;
    }, []);
    const ingredientsList = Array.from(new Set(uniqueIngredients?.map((i) => i?.ingredient?.name)));
    const handlePriceChange = (value) => {
        setSelectedPrice(value);
    };

    function handleBrandSelection(event) {
        const selectedBrand = event.target.value;
        if (selectedBrands.includes(selectedBrand)) {
            setSelectedBrands(selectedBrands?.filter((brand) => brand !== selectedBrand));
        } else {
            setSelectedBrands([...selectedBrands, selectedBrand]);
        }
    }
    function handleCountrySelection(event) {
        const selectedCountry = event.target.value;
        if (selectedCountries.includes(selectedCountry)) {
            setSelectedCountries(selectedCountries.filter((country) => country !== selectedCountry));
        } else {
            setSelectedCountries([...selectedCountries, selectedCountry]);
        }
    }
    function handleIngredientSelection(event) {
        const selectedIngredient = event.target.value;
        if (selectedIngredients?.includes(selectedIngredient)) {
            setSelectedIngredients(selectedIngredients?.filter((ingredient) => ingredient !== selectedIngredient));
        } else {
            setSelectedIngredients([...selectedIngredients, selectedIngredient]);
        }
    }

    function handleSupplierSelection(event) {
        const selectedSupplier = event.target.value;
        console.log(selectedSuppliers);
        if (selectedSuppliers.includes(selectedSupplier)) {
            setSelectedSuppliers(selectedSuppliers?.filter((supplier) => supplier !== selectedSupplier));
        } else {
            setSelectedSuppliers([...selectedSuppliers, selectedSupplier]);
        }
    }

    const filteredProducts = medicineListRoot?.filter((product) => {
        const inc = product.ingredient?.map((e) => e.ingredient?.name);
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brandDetail.name)) {
            return false;
        }
        if (selectedCountries.length > 0 && !selectedCountries.includes(product.country)) {
            return false;
        }
        if (selectedIngredients.length > 0 && !selectedIngredients.some((ingredient) => inc.includes(ingredient))) {
            return false;
        }
        if (selectedSuppliers.length > 0 && !selectedSuppliers.includes(product.producerDetail.name)) {
            return false;
        }
        if (parseFloat(product.price) <= selectedPrice[0]) {
            return false;
        }
        if (parseFloat(product.price) >= selectedPrice[1]) {
            return false;
        }
        return true;
    });

    useEffect(() => {
        setMedicineList(filteredProducts);
    }, [selectedPrice, selectedBrands, selectedCountries, selectedIngredients, selectedSuppliers]);

    const countries = Array.from(new Set(medicineListRoot?.map((product) => product.country)));
    const brands = Array.from(new Set(medicineListRoot?.map((product) => product.brandDetail.name)));
    const producers = Array.from(new Set(medicineListRoot?.map((product) => product.producerDetail.name)));
    const [isOpen, setIsOpen] = useState(false);
    const [isScrollLocked, setScrollLocked] = useState(false);

    useEffect(() => {
        if (isScrollLocked) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isScrollLocked]);

    const openModal = () => {
        setIsOpen(true);
        setScrollLocked(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setScrollLocked(false);
    };
    return (
        <div className="max-w-full overflow-x-hidden">
            <div className="mx-auto my-0 mb-4 max-w-[1200px] ">
                {/* <Breadcrumb /> */}
                <div className="padding-responsive grid gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                    <div className="cs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block 2xl:block">
                        <Filters title={'Thương Hiệu'}>
                            {brands?.map((brand) => (
                                <div className="mb-2" key={brand}>
                                    <input
                                        type="checkbox"
                                        value={brand}
                                        id={brand}
                                        className="mr-2 cursor-pointer"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={handleBrandSelection}
                                    />
                                    <label htmlFor={brand} className="cursor-pointer">
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </Filters>
                        <Filters title={'Nước Sản Xuất'}>
                            {countries?.map((country) => (
                                <div className="mb-2" key={country}>
                                    <input
                                        type="checkbox"
                                        value={country}
                                        id={country}
                                        className="mr-2 cursor-pointer"
                                        checked={selectedCountries.includes(country)}
                                        onChange={handleCountrySelection}
                                    />
                                    <label htmlFor={country} className="cursor-pointer">
                                        {country}
                                    </label>
                                </div>
                            ))}
                        </Filters>
                        <Filters title={'Nguyên Liệu'}>
                            {ingredientsList?.map((ingredient, index) => (
                                <div className="mb-2" key={index}>
                                    <input
                                        type="checkbox"
                                        value={ingredient}
                                        id={ingredient}
                                        className="mr-2 cursor-pointer"
                                        checked={selectedIngredients?.includes(ingredient)}
                                        onChange={handleIngredientSelection}
                                    />
                                    <label htmlFor={ingredient} className="cursor-pointer">
                                        {ingredient}
                                    </label>
                                </div>
                            ))}
                        </Filters>
                        <Filters title={'Nhà Cung Cấp'}>
                            {producers?.map((producer, index) => (
                                <div className="mb-2" key={index}>
                                    <input
                                        type="checkbox"
                                        value={producer}
                                        id={producer}
                                        className="mr-2 cursor-pointer"
                                        checked={selectedSuppliers.includes(producer)}
                                        onChange={handleSupplierSelection}
                                    />
                                    <label htmlFor={producer} className="cursor-pointer">
                                        {producer}
                                    </label>
                                </div>
                            ))}
                        </Filters>
                        <div>
                            <Slider range min={0} max={500000} value={selectedPrice} onChange={handlePriceChange} />

                            <div>giá tối thiểu: {selectedPrice[0]}</div>
                            <div>giá tối đa: {selectedPrice[1]}</div>
                        </div>
                    </div>

                    <div className="xs:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                        <button
                            className=" mt-2 items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 cs:flex xs:flex sm:flex md:flex lg:hidden xl:hidden 2xl:hidden"
                            onClick={openModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                                />
                            </svg>
                            <p className="ml-2">Lọc</p>
                        </button>
                        <FamousProducts medicineList={medicineList} />
                    </div>
                    <div>
                        {isOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-100 "></div>
                                <div className="z-10 rounded-lg bg-white p-6">
                                    <h2 className="mb-4 border-b border-b-blue-300 py-2 text-center text-xl font-bold">
                                        Bộ Lọc Nâng Cao
                                    </h2>
                                    <div>
                                        <Filters title={'Thương Hiệu'}>
                                            {brands?.map((brand) => (
                                                <div className="mb-2" key={brand}>
                                                    <input
                                                        type="checkbox"
                                                        value={brand}
                                                        id={brand}
                                                        className="mr-2 cursor-pointer"
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={handleBrandSelection}
                                                    />
                                                    <label htmlFor={brand} className="cursor-pointer">
                                                        {brand}
                                                    </label>
                                                </div>
                                            ))}
                                        </Filters>
                                        <Filters title={'Nước Sản Xuất'}>
                                            {countries?.map((country) => (
                                                <div className="mb-2" key={country}>
                                                    <input
                                                        type="checkbox"
                                                        value={country}
                                                        id={country}
                                                        className="mr-2 cursor-pointer"
                                                        checked={selectedCountries.includes(country)}
                                                        onChange={handleCountrySelection}
                                                    />
                                                    <label htmlFor={country} className="cursor-pointer">
                                                        {country}
                                                    </label>
                                                </div>
                                            ))}
                                        </Filters>
                                        <Filters title={'Nguyên Liệu'}>
                                            {ingredientsList?.map((ingredient, index) => (
                                                <div className="mb-2" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        value={ingredient}
                                                        id={ingredient}
                                                        className="mr-2 cursor-pointer"
                                                        checked={selectedIngredients?.includes(ingredient)}
                                                        onChange={handleIngredientSelection}
                                                    />
                                                    <label htmlFor={ingredient} className="cursor-pointer">
                                                        {ingredient}
                                                    </label>
                                                </div>
                                            ))}
                                        </Filters>
                                        <Filters title={'Nhà Cung Cấp'}>
                                            {producers?.map((producer, index) => (
                                                <div className="mb-2" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        value={producer}
                                                        id={producer}
                                                        className="mr-2 cursor-pointer"
                                                        checked={selectedSuppliers.includes(producer)}
                                                        onChange={handleSupplierSelection}
                                                    />
                                                    <label htmlFor={producer} className="cursor-pointer">
                                                        {producer}
                                                    </label>
                                                </div>
                                            ))}
                                        </Filters>
                                        <div>
                                            <Slider
                                                range
                                                min={0}
                                                max={500000}
                                                value={selectedPrice}
                                                onChange={handlePriceChange}
                                            />

                                            <div>giá tối thiểu: {selectedPrice[0]}</div>
                                            <div>giá tối đa: {selectedPrice[1]}</div>
                                        </div>
                                    </div>
                                    <button
                                        className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                        onClick={closeModal}
                                    >
                                        Áp Dụng
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <View />

            <BranchPharmacy />
        </div>
    );
}

export default CategoryDetail;
