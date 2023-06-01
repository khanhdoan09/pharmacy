import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProductSeller from '../ProductSeller';
import ContentNavModalItem from './ContentNavModalItem';
import NavModalItem from './NavModalItem';
import n1 from '~/assets/img/nav/n1.png';
import n2 from '~/assets/img/nav/n2.png';
import n3 from '~/assets/img/nav/n3.png';
import n4 from '~/assets/img/nav/n4.png';
import n5 from '~/assets/img/nav/n5.png';

function NavModal() {
    const [nameNavHover, setNameNavHover] = useState();
    const handleHover = (e) => {
        setNameNavHover(e.target.innerText);
    };

 
    return (
        <div className="wrapper-navmodal flex flex-wrap shadow-lg ">
            <div className="w-3/12 bg-[#fff] ">
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/dinh-duong.png"
                    title="Dinh Dưỡng"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/sinh-ly-noi-tiet-to.png"
                    title="Sinh lý - Nội tiết tố"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/cai-thien-tang-cuong-chuc-nang.png"
                    title="Cải thiện tăng cường chức năng"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/lam-dep.png"
                    title="Hỗ trợ làm đẹp"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/than-kinh-nao.png"
                    title="Thần kinh não"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/ho-tro-tieu-hoa.png"
                    title="Hỗ trợ tiêu hóa"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/images/category/20220624120650-9722.png"
                    title="Sức khỏe tim mạch"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/vitamin-va-khoang-chat.png"
                    title="Vitamin & Khoáng chất"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
                <NavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/images/category/20220909010920-4562.png"
                    title="Hỗ trợ điều trị"
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                />
            </div>

            {/* content nav modal item  */}
            <div className="w-9/12 px-4 py-4">
                <div className="grid grid-cols-4 gap-2 border-b border-[#d8e0e8] ">
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/sinh-ly-nu.png"
                            title="Sinh lý nữ"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/sinh-ly-nam.png"
                            title="Sinh lý nam"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/suc-khoe-tinh-duc.png"
                            title="Sức khỏe tình dục"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/can-bang-noi-tiet-to.png"
                            title="Cân bằng nội tiết tố"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/ho-tro-trao-doi-chat.png"
                            title="Hỗ trợ trao đổi chất"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/bao-ve-mat.png"
                            title="Bổ mắt, bảo vệ mắt"
                        />
                    </div>
                    <div className="px-1 ">
                        <ContentNavModalItem
                            to=""
                            img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/ho-tro-giac-ngu-ngon.png"
                            title="Hỗ trợ giấc ngủ ngon"
                        />
                    </div>
                </div>
                <div className="best-seller pt-3  pb-4">
                    <div className="mb-3 flex flex-wrap">
                        <div className="flex max-w-[50%] flex-[0_0_50%] items-center px-1 ">
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
                            <p className="text-sm font-bold">Bán chạy nhất</p>
                        </div>
                        <div className="flex max-w-[50%] flex-[0_0_50%] items-center justify-end px-1">
                            <NavLink to="" className="text-sm text-[#1d48ba]">
                                Xem tất cả
                            </NavLink>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="px-1">
                            <ProductSeller
                                img={n1}
                                name="Viên uống Sâm Nhung Bổ Thận NV Dolexpharm giúp tráng dương, mạnh gân cốt (30 viên)"
                                newPrice="591.000đ"
                                unit="Hộp"
                                oldPrice=""
                            />
                        </div>
                        <div className=" px-1">
                            <ProductSeller
                                img={n2}
                                name="Tinh chất hàu Best King JpanWell hỗ trợ tăng cường sinh lý và khả năng sinh sản ở nam giới (60 viên)"
                                newPrice="1.300.000đ "
                                unit="Hộp"
                                oldPrice=""
                            />
                        </div>
                        <div className=" px-1">
                            <ProductSeller
                                img={n3}
                                name="Sữa bột Abbott Glucerna bổ sung vitamin, khoáng chất cho người tiểu đường (850g)"
                                newPrice="879.000đ"
                                unit="Hộp"
                                oldPrice=""
                            />
                        </div>
                        <div className=" px-1">
                            <ProductSeller
                                img={n4}
                                name="Viên uống Tố Nữ Vương Royal Care hỗ trợ cải thiện nội tiết tố nữ (30 viên)"
                                newPrice="138.000đ"
                                unit="Hộp"
                                oldPrice=""
                            />
                        </div>
                        <div className=" px-1">
                            <ProductSeller
                                img={n5}
                                name="Viên uống Maca M Male Power Nature's Supplements bổ thận, tráng dương (60 viên)"
                                newPrice="627.000đ"
                                unit="Hộp"
                                oldPrice="660.000đ"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavModal;
