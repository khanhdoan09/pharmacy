import { convertNumberToPrice } from '~/utils/currency';
import { getImageFromFirebase } from '~/utils/firebase';
import HistoryImage from './HistoryImage';

function HistoryItem(props) {
    const orderDetails = props?.orderDetails;
    return (
        <div className="absolute z-40 w-full rounded-2xl border border-2 border-indigo-400 bg-white shadow-lg shadow-indigo-500/50 ">
            <button
                onClick={() => {
                    props?.setShowDetail(-1);
                }}
                className="absolute -top-4 -right-5 flex h-9 w-9 cursor-pointer items-center rounded-full bg-rose-700 p-3 text-center text-white"
            >
                X
            </button>
            {orderDetails.map((e, i) => {
                const medicine = e?.medicine;
                return (
                    <div key={i} className="my-5 flex items-center">
                        <div className="px-2">
                            <HistoryImage productId={medicine?.id} avatar={medicine?.avatar}></HistoryImage>
                        </div>
                        {orderDetails?.length % 2 == 0 ? <div className="absolute top-1/2 w-full border"></div> : null}
                        <div className="px-3">
                            <div className="font-bold">{medicine?.name}</div>
                            <div className="flex">
                                <span className="font-bold">Nhãn hàng: </span>
                                <span className="px-2">{medicine?.brandDetail?.name}</span>
                            </div>
                            <div className="flex">
                                <span className="font-bold">Số lượng: </span>
                                <span className="px-2">
                                    {e?.quantity} {e?.unit}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="font-bold">Giá: </span>
                                <span className="px-2">{convertNumberToPrice(e?.price * e?.quantity)} đ</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HistoryItem;
