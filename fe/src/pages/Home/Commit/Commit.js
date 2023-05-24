import { NavLink } from 'react-router-dom';

function Commit() {
    return (
        <div className="bg-[#edf2f8] max-w-full">
            <div className="max-w-[1200px] mx-auto my-0 py-8">
                <div className="grid gap-4 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 cs:grid-cols-1 2xl:px-1 xl:px-1 lg:px-2 md:px-2 sm:px-4 xs:px-4 cs:px-4 mb-8 ">
                    <div className="flex items-center ">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F10.webp?alt=media&token=2cb8b726-1409-41d7-acf2-0e548831fc96                            "
                            alt="img"
                            className="w-[48px] h-[48px] object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-[#072d94] line-clamp-1">THUỐC CHÍNH HÃNG</h3>
                            <p className="text-[#334155] line-clamp-1">đa dạng và chuyên sâu</p>
                        </div>
                    </div>
                    <div className=" flex items-center ">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F7.webp?alt=media&token=bb5e46b0-b3e2-41f0-97d9-06669771e5ec"
                            alt="img"
                            className="w-[48px] h-[48px] object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-[#072d94] line-clamp-1">ĐỔI TRẢ TRONG 30 NGÀY</h3>
                            <p className="text-[#334155] line-clamp-1">kể từ ngày mua hàng</p>
                        </div>
                    </div>
                    <div className=" flex items-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F9.webp?alt=media&token=dfb2bd1e-aff2-44e4-9659-ad13b1f9e766"
                            alt="img"
                            className="w-[48px] h-[48px] object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-[#072d94] line-clamp-1">CAM KẾT 100%</h3>
                            <p className="text-[#334155] line-clamp-1">chất lượng sản phẩm</p>
                        </div>
                    </div>
                    <div className=" flex items-center ">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F8.webp?alt=media&token=3738a468-ead3-442d-9ada-67d4923f9ba6"
                            alt="img"
                            className="w-[48px] h-[48px] object-cover mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-[#072d94] line-clamp-1">MIỄN PHÍ VẬN CHUYỂN</h3>
                            <p className="text-[#334155] line-clamp-1">theo chính sách giao hàng</p>
                        </div>
                    </div>
                </div>
                <div className="flex max-w-[1200px]">
                    <div className="flex flex-wrap -mx-1">
                        <div className="flex-[0_0_100%] px-1">
                            <NavLink to="">
                                <img
                                    src="https://nhathuoclongchau.com.vn/frontend_v3/images/chuyen-trang-du-an/banner-home-v2.png"
                                    alt="banner"
                                    className="object-cover"
                                />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Commit;
