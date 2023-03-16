import { useState } from 'react';
import ProductMain from '~/components/ProductMain';

function Object() {
    const [active, setActive] = useState('1');

    const handleClickFilter = (event) => {
        setActive(event.target.id);
    };

    return (
        <div className="mx-auto my-0 max-w-[1200px] py-8">
            <div className="xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1 ">
                <div className=" mb-4 flex max-w-full flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-1 h-6 w-6 rounded-full bg-[#072d94] px-1 py-1 text-[#fff]"
                        >
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                        </svg>

                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#000] ">Sản Phẩm Theo Đối Tượng</h3>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2">Lọc theo</p>
                        <button
                            key={1}
                            className={
                                active === '1'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff] '
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'1'}
                            onClick={handleClickFilter}
                        >
                            Trẻ Em
                        </button>
                        <button
                            key={2}
                            className={
                                active === '2'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'2'}
                            onClick={handleClickFilter}
                        >
                            Người Cao Tuổi
                        </button>
                        <button
                            key={3}
                            className={
                                active === '3'
                                    ? 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                    : 'mr-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                            }
                            id={'3'}
                            onClick={handleClickFilter}
                        >
                            Phụ Nữ Cho Con Bú
                        </button>
                    </div>
                </div>
            </div>
            {active === '1' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/01/00017891-boi-mau-forte-tat-thanh-125ml-siro-bo-phe-4358-5e14_large.jpg"
                        title="
                        Siro bổ phế Bối Mẫu Forte Mom And Baby Tất Thành hỗ trợ giảm ho, đau rát họng, khản tiếng (125ml)"
                        newPrice="55.000đ "
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/09/00345454-siro-an-ngon-healthy-new-kid-8980-5f62_large.jpg"
                        title="
                Siro Healthy New Kids hỗ trợ kích thích tiêu hóa, giúp ăn ngon (120ml)"
                        newPrice="81.000đ"
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/04/00030511-lacto-biomin-gold-new-hdpharma-20-goi-2174-607c_large.jpg"
                        title="
                        Cốm vi sinh Lacto Biomin Gold HdPharma tăng lợi khuẩn cho hệ tiêu hóa (5g x 20 gói)"
                        newPrice="135.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00029877-omega-3-for-kids-300mg-nutrimed-international-100v-6416-633e_large.jpg"
                        title="
                        Viên dầu cá Omega 3 For Kids Nutrimed giúp trẻ phát triển trí não, thị lực (100 viên)"
                        newPrice="450.000đ "
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/08/00501778--3834-630e_large.jpg"
                        title="
                        Viên uống Skillmax Ocavill hỗ trợ tăng cường thị lực (30 viên)"
                        newPrice="670.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
            )}
            {active === '2' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/10/00021988-anica-phytextra-60v-5137-6347_large.jpg"
                        title="
                        Viên uống Anica Phytextra bổ sung canxi và vitamin D3 (60 viên)"
                        newPrice="550.000đ "
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/12/00028684-vien-uong-omega-3-6-9-naturecare-giam-cholesterol-bao-ve-tim-mach-60-vien-9210-63a9_large.jpg"
                        title="
                        Viên uống Bawod Calcium Plus HDPharma giúp chắc khỏe xương (60 viên)"
                        newPrice="115.000đ"
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/09/00345347-free-flex-vien-uong-giam-dau-chong-viem-khop-4358-6327_large.jpg"
                        title="
                        Viên uống Free Flex DAO Nordic Health giảm đau, chống viêm khớp (90 viên)"
                        newPrice="445.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/09/00020313-active-legs-15v-thien-minh-3051-6327_large.jpg"
                        title="
                        Viên uống Active Legs New Nordic giúp tăng cường lưu thông tuần hoàn máu (15 viên)"
                        newPrice="340.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/09/00018455-vien-uong-super-chromium-250mcg-naturecare-can-bang-duong-huyet-90-vien-2815-6327_large.jpg"
                        title="
                        Viên uống Super Chromium 250mcg NatureCare giúp cân bằng đường huyết (90 viên)"
                        newPrice="455.000đ "
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
            )}
            {active === '3' && (
                <div className=" grid animate-fadeBottomMobile gap-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3 md:px-2 lg:grid-cols-4 lg:px-2 xl:grid-cols-5 xl:px-1 2xl:grid-cols-5 2xl:px-1">
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/12/00029929-maxpremum-naga-plus-200mg-vesta-30v-5462-63a9_large.jpg"
                        title="
                        Viên uống MaxPremum Naga Plus Vesta tăng sức khỏe, đề kháng cho thai phụ (30 viên)"
                        newPrice="159.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/10/00028829-vitamin-d3-dha-hatro-20ml-5891-5f96_large.JPG"
                        title="
                        Dung dịch uống Hatro Vitamin D3+ DHA Pharvina bổ sung vitamin D3, DHA (20ml))"
                        newPrice="301.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00029004-pokemine-medisun-20x10ml-8213-62a7_large.jpg"
                        title="
                        Thuốc Pokemine 50mg Medisun hỗ trợ bổ sung sắt (20 ống x 10ml)"
                        newPrice="152.000đ"
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00033021-special-mum-breastfeeding-ho-tro-tang-tiet-sua-bo-sung-vitamin-khoang-chat-cho-phu-nu-dang-cho-con-4364-61b3_large.jpg"
                        title="
                        Viên uống Special Mum Breastfeeding bổ sung các vitamin, khoáng chất và vi chất cho phụ nữ trong thời kỳ cho con bú (60 viên)"
                        newPrice="427.000đ"
                        oldPrice=""
                        unit="chai"
                    />
                    <ProductMain
                        to=""
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00033177-com-loi-sua-ttgalac-20-goi-x-3g-5353-62ae_large.jpg"
                        title="
                        Cốm lợi sữa TT.Galac Traphaco tăng tiết sữa cho phụ nữ sau sinh (20 gói x 3g)"
                        newPrice="128.000đ"
                        oldPrice=""
                        unit="chai"
                    />
                </div>
            )}
        </div>
    );
}

export default Object;
