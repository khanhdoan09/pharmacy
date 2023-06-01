import ProtectItem from '~/components/ProtectItem';

function HealthCheck() {
    return (
        <div
            className="max-w-full"
            style={{
                backgroundImage: 'url(' + 'https://nhathuoclongchau.com.vn/frontend_v3/images/BG.png' + ')',
            }}
        >
            <div className="max-w-[1200px] mx-auto my-0 py-8">
                <div className="2xl:flex xl:flex lg:block md:block sm:block xs:block justify-between">
                    <div className="mb-2">
                        <h1 className="font-bold text-[32px] text-center">Kiểm tra sức khoẻ</h1>
                        <p className="text-[16px] text-center ">
                            Tiện ích giúp Quý khách kiểm tra tình trạng sức khỏe dựa trên đánh giá từ các chuyên gia
                        </p>
                    </div>
                    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 cs:grid-cols-1 gap-4 2xl:px-1 xl:px-1 lg:px-2 md:px-2 sm:px-4 xs:px-4 cs:px-4">
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F11.webp?alt=media&token=18286dc4-bd05-4f80-9cf1-699521c123f9"
                            title="Khả năng trào ngược dạ dày"
                            more="Kiểm tra ngay"
                            to=""
                        />
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F12.webp?alt=media&token=74376ae8-99e9-4417-a405-e39077d6c8c3"
                            title="Nguy cơ phụ thuộc bình xịt cắt cơn"
                            more="Kiểm tra ngay"
                            to=""
                        />
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F11.webp?alt=media&token=18286dc4-bd05-4f80-9cf1-699521c123f9"
                            title="Sàng lọc nguy cơ mắc bệnh tim mạch"
                            more="Kiểm tra ngay"
                            to=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HealthCheck;
