import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
    const [collapseFirstColumn, setCollapseFirstColumn] = useState(false);
    const [collapseSecondColumn, setCollapseSecondColumn] = useState(false);
    const [collapseThirdColumn, setCollapseThirdColumn] = useState(false);
    const handleResize = () => {
        if (window.innerWidth > 720) {
            setCollapseFirstColumn(false);
            setCollapseSecondColumn(false);
            setCollapseThirdColumn(false);
        } else {
            setCollapseFirstColumn(true);
            setCollapseSecondColumn(true);
            setCollapseThirdColumn(true);
        }
    };

    useEffect(() => {
        handleResize();
    }, []);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });

    function createLink(text, link) {
        return (
            <NavLink to="/" className="cursor-pointer text-xs leading-7 text-blue-800/100">
                {text}
            </NavLink>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center px-2">
                <div className="flex flex-wrap sm:mr-10">
                    <div className="flex flex-col max-sm:w-full sm:mr-10">
                        <div
                            className="flex items-center justify-between"
                            onClick={() =>
                                window.innerWidth < 640 ? setCollapseFirstColumn(!collapseFirstColumn) : null
                            }
                        >
                            <h6 className="text-xs font-bold">VỀ CHÚNG TÔI</h6>
                            <span
                                className={`hidden duration-500 max-sm:block ${
                                    collapseFirstColumn ? 'rotate-0' : 'rotate-180'
                                }`}
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </span>
                        </div>
                        <div className={`flex flex-col ${collapseFirstColumn ? 'hidden' : 'block'}`}>
                            {createLink('Giới thiệu')}
                            {createLink('Hệ thống cửa hàng')}
                            {createLink('Giấy phép kinh doanh')}
                            {createLink('Quy chế hoạt động')}
                            {createLink('Chính sách đặt cọc')}
                            {createLink('Chính sách đổi trả thuốc')}
                            {createLink('Chính sách giao hàng')}
                            {createLink('Chính sách bảo mật')}
                            {createLink('Chính sách thanh toán')}
                            {createLink('Kiểm tra hóa đơn điện tử')}
                            {createLink('Tra cứu đơn hàng')}
                        </div>
                    </div>
                    <div className="flex flex-col max-sm:w-full sm:mr-10">
                        <div
                            className="flex items-center justify-between"
                            onClick={() =>
                                window.innerWidth < 640 ? setCollapseSecondColumn(!collapseSecondColumn) : null
                            }
                        >
                            <h6 className="text-xs font-bold">DANH MỤC</h6>
                            <span
                                className={`hidden duration-500 max-sm:block ${
                                    collapseSecondColumn ? 'rotate-0' : 'rotate-180'
                                }`}
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </span>
                        </div>
                        <div className={`flex flex-col ${collapseSecondColumn ? 'hidden' : 'block'}`}>
                            {createLink('Thực phẩm chức năng')}
                            {createLink('Dược mỹ phẩm')}
                            {createLink('Chăm sóc cá nhân')}
                            {createLink('Thuốc')}
                            {createLink('Trang thiết bị y tế')}
                            {createLink('Bệnh')}
                            {createLink('Góc sức khoẻ')}
                        </div>
                    </div>
                    <div className="flex flex-col max-sm:w-full sm:mr-10">
                        <div
                            className="flex items-center justify-between"
                            onClick={() =>
                                window.innerWidth < 640 ? setCollapseThirdColumn(!collapseThirdColumn) : null
                            }
                        >
                            <h6 className="text-xs font-bold">THỰC PHẨM CHỨC NĂNG</h6>
                            <span
                                className={`hidden duration-500 max-sm:block ${
                                    collapseThirdColumn ? 'rotate-0' : 'rotate-180'
                                }`}
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </span>
                        </div>
                        <div className={`flex flex-col ${collapseThirdColumn ? 'hidden' : 'block'}`}>
                            {createLink('Sinh lý - Nội tiết tố')}
                            {createLink('Sức khỏe tim mạch')}
                            {createLink('Hỗ trợ điều trị')}
                            {createLink('Thần kinh não')}
                            {createLink('Hỗ trợ tiêu hóa')}
                            {createLink('Cải thiện tăng cường chức năng')}
                            {createLink('Hỗ trợ làm đẹp')}
                            {createLink('Vitamin & Khoáng chất')}
                            {createLink('Dinh dưỡng')}
                        </div>
                    </div>
                </div>
                <div className="max-sm:mt-5">
                    <div className="flex flex-wrap">
                        <div className="mr-5">
                            <h6 className="text-xs">Tư vấn mua hàng (Miễn Phí)</h6>
                            <span className="text-xl font-bold text-blue-900">1800 8296</span>
                            <span className="text-sm font-bold text-blue-900">- Nhánh 1</span>
                        </div>
                        <div>
                            <h6 className="text-xs">Góp ý, khiếu nại (8h00-22h00)</h6>
                            <span className="text-xl font-bold text-blue-900">1800 8296</span>
                            <span className="text-sm font-bold text-blue-900">- Nhánh 2</span>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-end">
                        <h6 className="text-xs font-bold">KẾT NỐI VỚI CHÚNG TÔI</h6>
                        <img
                            className="mx-2 cursor-pointer"
                            width={20}
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2FFacebook_b2899fc1dd.svg?alt=media&token=fcff2705-9ed6-4ce7-a952-be30ed0384ea"
                            alt="facebook"
                        />
                        <img
                            className="cursor-pointer"
                            width={20}
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/social%2FZalo_8aa1fbb719.svg?alt=media&token=d8f33d08-2087-4663-b43c-81c88525ab99"
                            alt="zalo"
                        />
                    </div>
                </div>
            </div>
            <div>
                <h6 className="mt-5 border-t-2 py-2 text-center text-sm sm:px-24">
                    © 2000 - 3000 Công ty Cổ Phần Dược Phẩm NLU Nông Lâm Số ĐKKD 0315275368 cấp ngày 06/02/2023 Địa chỉ:
                    Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh. Số điện thoại: (028)78965423 - Email:
                    sale@nhathuocnonglam.com - Người quản lý nội dung: Nguyễn Văn A
                </h6>
            </div>
        </div>
    );
}

export default Footer;
