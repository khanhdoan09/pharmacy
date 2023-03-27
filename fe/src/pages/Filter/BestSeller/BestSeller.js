import Slider from 'react-slick';
import ProductAds from '~/components/ProductAds';

function BestSeller() {
    const settings2 = {
        className: 'flex flex-wrap -mx-1 mt-4',
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="mb-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-4">
            <div className="flex items-center ">
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

                <h3 className="select-none text-[20px] font-bold text-[#fff]">Bán Chạy Nhất</h3>
            </div>
            <Slider {...settings2}>
                <div className=" px-1 ">
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2022/06/00032125-tinh-dau-khu-khuan-chong-virus-sa-chanh-thao-nguyen-500ml-3465-62af_large.jpg"
                        title="Tinh dầu đuổi muỗi và côn trùng, khử khuẩn Thảo Nguyên hương sả chanh (500ml)"
                        newPrice="169.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="1 Chai x 1 Chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2019/06/00018206-bepanthen-balm-bayer-30g-3395-5d10_large.JPG"
                        title="Kem Bepanthen Balm Bayer hỗ trợ phòng ngừa hăm tã cho bé (30g)"
                        newPrice="64.800đ"
                        oldPrice="72.000đ"
                        unit="Hộp"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="Hộp"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032941-dung-cu-hut-mui-cho-tre-em-pa-8747-61a9_large.jpg"
                        title="Dụng cụ hút mũi cho trẻ PA không độc hại, an toàn tuyệt đối, dễ sử dụng"
                        newPrice="12.000đ "
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00018765-dau-mu-u-plus-thien-khanh-12ml-3289-5bf0_large.JPG"
                        title="Dầu Mù U Plus Thiên Khánh hỗ trợ làm mềm mượt, mau liền da, giảm khô da (12ml)"
                        newPrice="6.500đ"
                        oldPrice=""
                        unit="Chai"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
                <div className=" px-1 ">
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
                <div className="max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
                <div className="max-w-ful px-1 ">
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                </div>
                <div className=" max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
                <div className="max-w-ful px-1 ">
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default BestSeller;
