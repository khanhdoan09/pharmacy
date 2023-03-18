import { NavLink } from 'react-router-dom';

function BranchPharmacy() {
    return (
        <div className="max-w-full bg-[#072d94]">
            <div className="mx-auto my-0 max-w-[1200px] ">
                <div className="lg::grid-cols-1 grid gap-4 py-3 cs:px-4 xs:px-4 sm:grid-cols-2 sm:px-4  md:grid-cols-2 md:px-2 lg:px-2 xl:grid-cols-2 xl:px-1 2xl:grid-cols-2 2xl:px-1">
                    <NavLink to="" className="flex  items-center text-[#fff]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-[14px] h-8 w-8"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <p className="text-2xl line-clamp-1">Xem hệ thống nhà thuốc toàn quốc</p>
                    </NavLink>
                    <NavLink
                        to=""
                        className="mx-auto flex h-[36px] items-center justify-end rounded-3xl bg-[#597db9] px-8 font-bold text-[#fff]"
                    >
                        <p className="line-clamp-1">Xem danh sách nhà thuốc</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default BranchPharmacy;
