function FilterItem({ title, children }) {
    return (
        <div className="filter-item mb-3">
            <p className="font-bold text-base">{title}</p>
            {/* <div className="rounded-lg border-[#dee5eb] border flex items-center hover:border-[#333] mb-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>

                <input placeholder="Tìm theo tên" className="outline-none border-none text-sm h-[26px] w-10/12" />
            </div> */}
            {children}
        </div>
    );
}

export default FilterItem;
