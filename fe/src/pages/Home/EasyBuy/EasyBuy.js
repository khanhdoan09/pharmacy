import { NavLink } from 'react-router-dom';


function EasyBuy() {
    return (
        <div className="max-w-[1200px] mx-auto my-0 mb-8">
            <div className="flex flex-wrap -mx-4px mb-6">
                <h3 className="px-1 flex-[0_0_100%] max-w-full text-[28px] text-center font-bold">
                    Mua Thuốc Dễ Dàng Tại Long Châu
                </h3>
            </div>
            <div className="grid 2xl:grid-cols-3 gap-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ">
                <div className="px-1 ">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://nhathuoclongchau.com.vn/frontend_v3/images/banner-html/home/chuptoathuoc.png"
                            alt="img"
                            className="w-[64px] h-[64px]"
                        />
                        <h3 className="text-center 2xl:text-base xl:text-base lg:text-xs lg:font-bold sm:text-xs sm:font-bold mt-2">
                            CHỤP TOA THUỐC
                        </h3>
                        <p className="2xl:block xl:block lg:block md:hidden sm:hidden xs:hidden cs:hidden">
                            đơn giản & nhanh chóng
                        </p>
                    </div>
                </div>
                <div className="px-1 ">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://nhathuoclongchau.com.vn/frontend_v3/images/banner-html/home/info-ct.png"
                            alt="img"
                            className="w-[64px] h-[64px]"
                        />
                        <h3 className="text-center 2xl:text-base xl:text-base lg:text-xs lg:font-bold sm:text-xs sm:font-bold mt-2">
                            NHẬP THÔNG TIN LIÊN LẠC
                        </h3>
                        <p className="2xl:block xl:block lg:block md:hidden sm:hidden xs:hidden cs:hidden  ">
                            để được tư vấn đặt hàng
                        </p>
                    </div>
                </div>
                <div className="px-1 flex-[0_0_33.33333%] max-w-full">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://nhathuoclongchau.com.vn/frontend_v3/images/banner-html/home/duoc-sy.png"
                            alt="img"
                            className="w-[64px] h-[64px]"
                        />
                        <h3 className="text-center 2xl:text-base xl:text-base lg:text-xs lg:font-bold sm:text-xs sm:font-bold mt-2">
                            NHẬN BÁO GIÁ TỪ DƯỢC SỸ
                        </h3>
                        <p className="2xl:block xl:block lg:block md:hidden sm:hidden xs:hidden cs:hidden">
                            kèm theo tư vấn miễn phí
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-4px mt-6">
                <div className="px-1 flex-[0_0_100%] max-w-full ">
                    <div className="flex items-center flex-wrap justify-center ">
                        <NavLink to="" className="bg-[#016cc9] text-[#fff] px-8 rounded-3xl h-[36px] flex items-center">
                            <p className="line-clamp-1">MUA THUỐC NGAY</p>
                        </NavLink>
                        <p className="hover:underline hover:cursor-pointer ml-2">
                            Hoặc mua qua hotline <strong className="text-[#016cc9] font-bold">1800 6928</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EasyBuy;
