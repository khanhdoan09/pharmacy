import { useState } from 'react';
import ProductMain from '~/components/ProductMain';
import n1 from '~/assets/img/nav/n1.png';
import n2 from '~/assets/img/nav/n2.png';
import n3 from '~/assets/img/nav/n3.png';
import n4 from '~/assets/img/nav/n4.png';
import n5 from '~/assets/img/nav/n5.png';

function FamousProducts() {
    const [active, setActive] = useState('1');

    const handleClick = (event) => {
        setActive(event.target.id);
    };
    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between pb-3">
                <div className="mb-1 flex items-center">
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

                    <h3 className="select-none text-[20px] font-bold text-[#000] ">Sản Phẩm Nổi Bật</h3>
                </div>
                <div>
                    <button
                        key={1}
                        className={
                            active === '1'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'1'}
                        onClick={handleClick}
                    >
                        Bán chạy
                    </button>
                    <button
                        key={2}
                        className={
                            active === '2'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'2'}
                        onClick={handleClick}
                    >
                        Hàng mới
                    </button>
                    <button
                        key={3}
                        className={
                            active === '3'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'3'}
                        onClick={handleClick}
                    >
                        Giá thấp
                    </button>
                    <button
                        key={4}
                        className={
                            active === '4'
                                ? 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#1d48ba] px-4 py-1 text-sm text-[#fff]'
                                : 'mr-1 mb-1 rounded-3xl border border-[#d8e0e8] bg-[#fff] px-4 py-1 text-sm text-[#52637a]'
                        }
                        id={'4'}
                        onClick={handleClick}
                    >
                        Giá cao
                    </button>
                </div>
            </div>
            {active === '1' && (
                <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
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
            )}

            {active === '2' && (
                <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/11/00032918-glucosamine-and-chondroitin-jpanwell-120v-9745-61a5_large.JPG"
                        title="
                        Viên uống Glucosamine And Chondroitin Jpanwell bổ xương khớp (120 viên)"
                        newPrice="960.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/07/00021676-plus-min-new-phytextra-100v-9588-62c3_large.jpg"
                        title="
                        Viên uống Plus Min New Phytextra hỗ trợ xương khớp khỏe mạnh (100 viên)"
                        newPrice="645.000đ "
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00033184-vien-uong-giam-nguy-co-bi-tri-byetree-royal-care-60v-7820-62ae_large.jpg"
                        title="
                        Viên uống ByeTree Royal Care hỗ trợ tăng sức bền thành mạch, giảm nguy cơ bị trĩ (60 viên)"
                        newPrice="235.000đ"
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/09/00345347-free-flex-vien-uong-giam-dau-chong-viem-khop-4358-6327_large.jpg"
                        title="
                        Viên uống Free Flex DAO Nordic Health giảm đau, chống viêm khớp (90 viên)"
                        newPrice="445.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/05/00345909-xit-hong-propolis-ivy-royal-care-20ml-8905-6271_large.jpg"
                        title="
                        Dung dịch xịt Propolis Ivy Royal Care hỗ trợ giảm ho, giảm đờm (20ml)"
                        newPrice="77.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
            )}

            {active === '3' && (
                <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/08/00031653-menato-nasu-america-arcman-pharma-30v-6112-6125_large.jpg"
                        title="
                        Viên uống Menato Nasu tăng cường sinh lý nam (30 viên)"
                        newPrice="960.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Ống"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/10/00022075-philatop-10ml-dai-y-20-ong-4456-5f76_large.jpg"
                        title="
                        Đạm ống Philatop con hươu Đại Y Pharma bồi bổ sức khỏe (20 ống x 10ml)"
                        newPrice="800đ "
                        oldPrice=""
                        unit="Ống"
                    />
                    <ProductMain
                        to=""
                        label="Gói"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/04/00030450-edoz-dhg-pharma-24-goi-x-2g-9067-6073_large.jpg"
                        title="
                        Viên uống ByeTree Royal Care hỗ trợ tăng sức bền thành mạch, giảm nguy cơ bị trĩ (60 viên)"
                        newPrice="1.250đ"
                        unit="Gói"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00007009-sua-ong-chua-vitamin-c-3391-62af_large.jpg"
                        title="
                        Viên ngậm Sữa Ong Chúa Vitamin C Mekophar bổ sung vitamin C cho cơ thể (24 chai x 30 viên)"
                        newPrice="9.167đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Vỉ 4 viên"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/11/00028538-myvita-strong-c-spm-4v-sa-gung-chanh-9027-6191_large.jpg"
                        title="
                        Viên sủi MyVita Strong C vị sả gừng, chanh bổ sung vitamin C (4 viên)"
                        newPrice="77.000đ"
                        oldPrice=""
                        unit="Vỉ"
                    />
                </div>
            )}

            {active === '4' && (
                <div className="grid animate-fadeBottomMobile gap-4 cs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
                    <ProductMain
                        to=""
                        label="1 Hộp x 60 Viên"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2023/02/00503274-vien-uong-chong-lao-hoa-lam-dep-da-nmn-premium-21600-60v-1865-63e4_large.jpg"
                        title="
                        Viên uống trường thọ, trẻ hóa da NMN Premium 21600 (60 viên)"
                        newPrice="5.785.000đ "
                        oldPrice="8.900.000đ"
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2019/06/00014955-fucoidan-gold-7693-5cf8_large.jpg"
                        title="
                        Viên tảo Fucoidan Gold Okinawa Ukono hỗ trợ điều trị ung thư (180 viên)"
                        newPrice="6.245.000đ "
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/11/00031018-kendai-fucoidan-super-plus-sumioka-60v-7644-6384_large.jpg"
                        title="
                        Viên uống Kendai Fucoidan Super Plus Sumioka hỗ trợ làm giảm nguy cơ u bướu, bảo vệ gan (60 viên)"
                        newPrice="2.958.000đ"
                        unit="Hộp"
                    />
                    <ProductMain
                        to=""
                        label="Chai 720ml"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2020/02/00027484-royal-placenta-jpanwell-720ml-3595-5e58_large.jpg"
                        title="
                        Nước uống Royal Placenta Jpanwell làm đẹp da, sáng da (720ml)"
                        newPrice="2.850.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                    <ProductMain
                        to=""
                        label="Hộp 50 gói"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00007318-thuan-linh-chi-ho-tro-ngua-ung-thu-bao-ve-gan-9752-62af_large.jpg"
                        title="
                        Viên uống Thuần Linh Chi Nissan hỗ trợ bồi bổ sức khỏe, giúp bảo vệ gan (50 gói)"
                        newPrice="2.744.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
            )}
        </div>
    );
}

export default FamousProducts;
