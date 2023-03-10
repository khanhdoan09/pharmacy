import FilterItem from "./FilterItem";


function FilterBrand() {
    return (
        <FilterItem title="Thương hiệu">
            <div className="mb-2">
                <input type="checkbox" id="all" name="all" className="mr-2 cursor-pointer" />
                <label htmlFor="all" className="cursor-pointer">
                    Tất cả
                </label>
            </div>
            <div className="mb-2">
                <input type="checkbox" id="child" name="child" className="mr-2 cursor-pointer" />
                <label htmlFor="child" className="cursor-pointer">
                    Aderma
                </label>
            </div>

            <div className="mb-2">
                <input type="checkbox" id="older" name="older" className="mr-2 cursor-pointer" />
                <label htmlFor="older" className="cursor-pointer">
                    Banobagi
                </label>
            </div>
            <div className="mb-2">
                <input type="checkbox" id="older" name="older" className="mr-2 cursor-pointer" />
                <label htmlFor="older" className="cursor-pointer">
                    Cetaphil
                </label>
            </div>
        </FilterItem>
    );
}

export default FilterBrand;
