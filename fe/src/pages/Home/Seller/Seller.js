import ProductMain from '~/components/ProductMain';
import n1 from '~/assets/img/nav/n1.png';
import n2 from '~/assets/img/nav/n2.png';
import n3 from '~/assets/img/nav/n3.png';
import n4 from '~/assets/img/nav/n4.png';
import n5 from '~/assets/img/nav/n5.png';

function Seller() {
    return (
        <div className="mx-auto my-0 max-w-[1200px] py-8">
            <div className="-mx-1 flex flex-wrap cs:px-4 xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1 ">
                <div className="mb-4 flex max-w-full flex-[0_0_100%] items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mr-1 h-6 w-6 rounded-full bg-[#ef4444] px-1 py-1 text-[#fff]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                        />
                    </svg>

                    <h3 className="px-1  text-[20px] font-bold capitalize text-[#000]">Bán Chạy Nhất</h3>
                </div>
            </div>
            <div className="grid gap-4 cs:px-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-4 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                <ProductMain
                    to=""
                    label="Hộp"
                    img={n1}
                    title="
                    Viên uống Sâm Nhung Bổ Thận NV Dolexpharm giúp tráng dương, mạnh gân cốt (30 viên)"
                    newPrice="591.000đ"
                    oldPrice=""
                    unit="Hộp"
                />
                <ProductMain
                    to=""
                    label="Hộp"
                    img={n2}
                    title="
                    Tinh chất hàu Best King JpanWell hỗ trợ tăng cường sinh lý và khả năng sinh sản ở nam giới (60 viên)"
                    newPrice="1.300.000đ "
                    oldPrice=""
                    unit="Hộp"
                />
                <ProductMain
                    to=""
                    label="Hộp"
                    img={n3}
                    title="
                    Tinh chất hàu Best King JpanWell hỗ trợ tăng cường sinh lý và khả năng sinh sản ở nam giới (60 viên)"
                    newPrice="879.000đ"
                    unit="Hộp"
                />
                <ProductMain
                    to=""
                    label="Hộp"
                    img={n4}
                    title="
                    Viên uống Tố Nữ Vương Royal Care hỗ trợ cải thiện nội tiết tố nữ (30 viên)"
                    newPrice="138.000đ"
                    oldPrice=""
                    unit="Hộp"
                />
                <ProductMain
                    to=""
                    label="Hộp"
                    img={n5}
                    title="
                    Viên uống Maca M Male Power Nature's Supplements bổ thận, tráng dương (60 viên)"
                    newPrice="627.000đ"
                    oldPrice="660.000đ"
                    unit="Hộp"
                />
            </div>
        </div>
    );
}

export default Seller;
