import { convertNumberToPrice } from '~/utils/currency';
import HistoryItem from './HistoryItem';

function HistoryList(props) {
    return (
        <div className="flex w-full">
            {props?.index === props?.showDetail ? (
                <HistoryItem
                    setShowDetail={props?.setShowDetail}
                    orderDetails={props?.order?.orderDetail}
                ></HistoryItem>
            ) : null}
            <span className="flex w-1/6 items-center justify-center border py-3 font-bold">{props?.order?.id}</span>
            <span className="flex w-1/5 items-center justify-center border py-3 text-center">
                {props?.order?.createDate}
            </span>
            <span className="flex w-3/5 items-center justify-center border px-1 py-3 text-center">
                {props?.order?.address}
            </span>
            <span className="flex w-1/5 items-center justify-center border py-3 text-center">
                {props?.order?.paymentMethod}
            </span>
            <span className="flex w-1/5 items-center justify-center border py-3 text-center">
                {convertNumberToPrice(props?.order?.totalPayment)}đ
            </span>
            <span className="flex w-1/5 items-center justify-center border py-3 text-center">
                <button
                    onClick={() => props?.setShowDetail(props?.index)}
                    className="rounded-full bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
                >
                    chi tiết
                </button>
            </span>
        </div>
    );
}

export default HistoryList;
