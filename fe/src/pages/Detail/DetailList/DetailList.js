import { useRef } from 'react';

function DetailList(props) {
    const refScrollDesc = useRef(null);
    const refScrollIngredient = useRef(null);
    const refScrollUses = useRef(null);
    const refScrollDosage = useRef(null);
    const refScrollEffects = useRef(null);
    const refScrollNote = useRef(null);
    const refScrollPreserve = useRef(null);
    return (
        <div className=" grid gap-6 px-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 2xl:grid-cols-4">
            <div className="!sticky !top-0 left-0 h-fit rounded-lg border-b bg-[#edf2f8] cs:hidden xs:hidden sm:hidden md:hidden lg:block xl:block 2xl:block">
                <div className="flex cursor-pointer items-center border-b border-[#d8e0e8] px-4 py-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mr-2 h-6 w-6 text-[#000000] "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                        />
                    </svg>
                    <span className="font-bold capitalize">Nội dung chính</span>
                </div>
                <ul className="py-2">
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all  hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollDesc.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Mô tả sản phẩm
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all  hover:border hover:border-[#e4eaf1] hover:bg-[#fff] hover:px-4
            hover:py-[6px] hover:font-bold hover:shadow-xl"
                        onClick={() => {
                            refScrollIngredient.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Thành phần
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all  hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollUses.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Công dụng
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all  hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollDosage.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Liều dùng
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all  hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollEffects.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Tác dụng phụ
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollNote.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Lưu ý
                    </li>
                    <li
                        className="cursor-pointer px-2 py-[8px] transition-all hover:border hover:border-[#e4eaf1]  hover:bg-[#fff]
            hover:px-4 hover:py-[6px] hover:font-bold"
                        onClick={() => {
                            refScrollPreserve.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Bảo quản
                    </li>
                </ul>
            </div>
            <div className="detail col-span-3">
                <div className="desc" ref={refScrollDesc}>
                    <h3 className="mb-3 text-2xl font-bold text-[#1e293b]">Mô Tả Sản Phẩm</h3>
                    <p className="mb-3 text-xl font-bold text-[#1e293b]">{props?.detail?.medicine?.name}</p>
                    <p>{props?.detail?.benefit}</p>
                    <img src={props?.detail?.medicine?.avatar} alt="avatar" className="mx-auto my-0 flex" />
                </div>

                <div className="ingredient mb-3" ref={refScrollIngredient}>
                    <h3 className="mb-3 text-2xl font-bold text-[#1e293b]">Thành Phần</h3>
                    <div className="ingredient-detail rounded-lg border border-[#333] px-4 py-2">
                        <h3 className="mb-1 border-b-8 border-[#333] text-xl capitalize">Thông Tin Thành Phần</h3>
                        <div className="ingredient-item flex justify-between border-b-4 border-[#333] px-1 py-1">
                            <p>Thành phần</p>
                            <p>Hàm lượng</p>
                        </div>
                        {props?.ingredient?.map((e) => (
                            <div
                                className="ingredient-item flex justify-between border-b border-[#333] px-1 py-1"
                                key={e.id}
                            >
                                <p>{e.ingredient.name}</p>
                                <p>{e.content}</p>
                            </div>
                        ))}
                    </div>
                    {/* <div className="ingredient-desc">
                        <p className="mb-4">
                            <span className="text-[#718198] ">Lysine</span>: Giúp ăn ngon miệng; giảm lo lắng do chặn
                            các thụ thể liên quan đến phản ứng căng thẳng; cải thiện hấp thụ canxi giúp tăng cường chiều
                            cao, ngăn ngừa bệnh còi xương, loãng xương.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#718198] ">L-Arginin:</span>: Là acid amin bán cần thiết, hay còn gọi
                            là acid amin thiết yếu có điều kiện. Trong cơ thể arginine được tổng hợp từ Citrulline. Có
                            tác dụng cải thiện chức năng tình dục, làm tăng số lượng và chất lượng tinh trùng. Tăng quá
                            trình lành vết thương và liền xương, phục hồi nhanh các mô bị tổn thương, hư hỏng. Hạ huyết
                            áp, tăng tuần hoàn máu tới các tổ chức.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#718198] ">Lysine</span>: Giúp ăn ngon miệng; giảm lo lắng do chặn
                            các thụ thể liên quan đến phản ứng căng thẳng; cải thiện hấp thụ canxi giúp tăng cường chiều
                            cao, ngăn ngừa bệnh còi xương, loãng xương.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#718198] ">L-Arginin:</span>: Là acid amin bán cần thiết, hay còn gọi
                            là acid amin thiết yếu có điều kiện. Trong cơ thể arginine được tổng hợp từ Citrulline. Có
                            tác dụng cải thiện chức năng tình dục, làm tăng số lượng và chất lượng tinh trùng. Tăng quá
                            trình lành vết thương và liền xương, phục hồi nhanh các mô bị tổn thương, hư hỏng. Hạ huyết
                            áp, tăng tuần hoàn máu tới các tổ chức.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#718198] ">Lysine</span>: Giúp ăn ngon miệng; giảm lo lắng do chặn
                            các thụ thể liên quan đến phản ứng căng thẳng; cải thiện hấp thụ canxi giúp tăng cường chiều
                            cao, ngăn ngừa bệnh còi xương, loãng xương.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#718198] ">L-Arginin:</span>: Là acid amin bán cần thiết, hay còn gọi
                            là acid amin thiết yếu có điều kiện. Trong cơ thể arginine được tổng hợp từ Citrulline. Có
                            tác dụng cải thiện chức năng tình dục, làm tăng số lượng và chất lượng tinh trùng. Tăng quá
                            trình lành vết thương và liền xương, phục hồi nhanh các mô bị tổn thương, hư hỏng. Hạ huyết
                            áp, tăng tuần hoàn máu tới các tổ chức.
                        </p>
                    </div> */}
                </div>
                <div className="uses" ref={refScrollUses}>
                    <h3 className="mb-3 text-2xl font-bold text-[#1e293b]">Công dụng</h3>
                    <p className="mb-4">{props?.detail?.benefit}</p>
                </div>
                <div className="dosage" ref={refScrollDosage}>
                    <h3 className="mb-3 text-2xl font-bold text-[#1e293b]">Liều Dùng</h3>
                    <p className="mb-4 font-bold">Cách dùng</p>
                    <ul>
                        <li className="mb-4">{props?.detail?.dosage}</li>
                    </ul>
                    <p className="mb-4 font-bold">Đối tượng sử dụng</p>
                    <ul>
                        <li className="mb-4">{props?.detail?.age}</li>
                    </ul>
                </div>
                <div className="effects mb-8 " ref={refScrollEffects}>
                    <h3 className="mt-12 mb-6  text-2xl font-bold text-[#1e293b]"> Tác Dụng Không Mong Muốn</h3>
                    <p className="mb-4">
                        {props?.detail?.handleSideEffect === 'null'
                            ? 'Chưa có thông tin về tác dụng phụ của sản phẩm.'
                            : props.detail?.handleSideEffect}
                    </p>
                </div>
                <div className="note mb-6 rounded-lg border border-[#b6c0ce] px-3 py-3" ref={refScrollNote}>
                    <div className="flex items-center border-b border-[#e4eaf1] pb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-2 h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>

                        <h3>Lưu Ý</h3>
                    </div>
                    <ul className="pt-3">
                        {/* <li className="mb-2">Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm.</li> */}
                        <li className="mb-2">
                            {props?.detail?.note === null ? 'Không có ghi chú gì thêm' : props?.detail?.note}
                        </li>
                    </ul>
                </div>
                <div className="mb-8" ref={refScrollPreserve}>
                    <h3 className="mb-3 text-2xl font-bold text-[#1e293b]">Bảo Quản</h3>
                    <ul>
                        <li className="mb-4">{props?.detail?.storage}</li>
                    </ul>
                </div>
                <div className="label-detail rounded-r-lg border-l-2 border-[#1d48ba] bg-[#edf2f8] px-4 py-4">
                    <p>{props?.detail?.note === null ? 'Không có ghi chú gì thêm' : props?.detail?.note} </p>
                </div>
                <div className="approve mt-9 flex items-center rounded-lg border-[#bee3f8] bg-[#edf2f8]   py-3 px-4 ">
                    <img
                        src="https://nhathuoclongchau.com.vn/upload/be/avatar/ZEurNG7e5s3lxcts2DKXVxXxrgl67a.png"
                        alt="img-approve"
                        className="mr-2 h-[72px] w-[72px] rounded-lg object-cover"
                    />
                    <div className="approve-detail">
                        <div className="approve-detail__header flex items-center justify-between border-b pb-2">
                            <p className="text-xl font-bold line-clamp-1">Dược sĩ Đại học Nguyễn Thanh Hải</p>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mr-2 h-6 w-6 text-[#378f0b]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                                <p className="text-[#378f0b] line-clamp-1">Đã duyệt nội dung</p>
                            </div>
                        </div>
                        <p className="pt-2 line-clamp-2">
                            Tốt nghiệp Đại học Dược Hà Nội, với hơn 10 năm kinh nghiệm trong lĩnh vực Dược phẩm. Hiện là
                            giảng viên giảng dạy các môn Dược lý, Dược lâm sàng,...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailList;
