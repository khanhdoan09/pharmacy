import ProtectItem from '~/components/ProtectItem';

function Protect() {
    return (
        <div
            className="max-w-full"
            style={{
                backgroundImage: 'url(' + 'https://nhathuoclongchau.com.vn/frontend_v3/images/BG.png' + ')',
            }}
        >
            <div className="max-w-[1200px] mx-auto my-0 py-8">
                <div className="2xl:flex xl:flex lg:block md:block sm:block xs:block justify-between">
                    <div className="col-span-2">
                        <h1 className="font-bold text-[40px] text-center">BẢO VỆ</h1>
                        <p className="text-[28px] text-center">Sức khoẻ người thân</p>
                    </div>
                    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 cs:grid-cols-1 gap-4 2xl:px-1 xl:px-1 lg:px-2 md:px-2 sm:px-4 xs:px-4 cs:px-4">
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F4.webp?alt=media&token=2daa039c-7bc8-4ccb-bd48-93f3bc6e8d5e"
                            title="MẸ VÀ BÉ"
                            to=""
                            more="Tìm hiểu thêm"
                        />
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F5.webp?alt=media&token=926d391f-2026-442d-a244-c89641dd07a6"
                            title="NGƯỜI GIÀ"
                            to=""
                            more="Tìm hiểu thêm"
                        />
                        <ProtectItem
                            img="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/home%2F6.webp?alt=media&token=3e40e635-e1fa-4701-9fc3-632c9e74e692"
                            title="TRẺ EM"
                            to=""
                            more="Tìm hiểu thêm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Protect;
