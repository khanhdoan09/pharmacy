import Slider from 'react-slick';
import ProductAds from '~/components/ProductAds';

function Resistance() {
    const settings2 = {
        className: 'flex flex-wrap -mx-1 mt-4',
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="max-w-full bg-[#4e70d0]">
            <div className="mx-auto my-0 max-w-[1200px] py-8">
                <div className="-mx-1 flex flex-wrap cs:px-4 xs:px-4 sm:px-4 md:px-2 lg:px-2 xl:px-1 2xl:px-1">
                    <div className="flex max-w-full flex-[0_0_100%] items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-2 h-6 w-6 text-[#fff]"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h3 className="px-1  text-[20px] font-bold capitalize text-[#fff] line-clamp-1">
                            Sản Phẩm Tăng Sức Đề Kháng
                        </h3>
                    </div>
                </div>

                <Slider {...settings2}>
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="chai"
                        img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2018/11/00008138-xisat-kid-75ml-8547-5bf4_large.JPG"
                        title="Nước biển sâu sạch thông mũi dành cho trẻ em Xisat (75ml)"
                        newPrice="30.000đ"
                        oldPrice=""
                        unit="Chai"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                    <ProductAds
                        label="1 Hộp x 60 Viên"
                        img=" https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/600x600/filters:quality(90):fill(white)/nhathuoclongchau.com.vn/images/product/2021/12/00032942-b-complex-vitamin-royal-care-60v-5253-61c0_large.jpg"
                        title="Viên uống B Complex Vitamin Royal Care giảm mệt mỏi, căng thẳng (60 viên)"
                        newPrice="139.000đ"
                        oldPrice=""
                        unit="Hộp"
                    />
                </Slider>
            </div>
        </div>
    );
}

export default Resistance;
