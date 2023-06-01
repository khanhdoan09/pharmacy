import { useState } from 'react';
import HistoryList from './HistoryList';

function OrderItem(props) {
    const orders = props?.orders;
    const [showDetail, setShowDetail] = useState(-1);
    return (
        <div className="relative w-11/12 border">
            <div className="flex w-full">
                <span className="w-1/6 border py-3 text-center font-bold">14</span>
                <span className="w-1/5 border py-3 text-center font-bold">Ngày đặt</span>
                <span className="w-3/5 border py-3 text-center font-bold">Địa chỉ giao</span>
                <span className="w-1/5 border py-3 text-center font-bold">Thanh toán</span>
                <span className="w-1/5 border py-3 text-center font-bold">Tổng giá</span>
                <span className="w-1/5 border py-3 text-center font-bold">Chọn</span>
            </div>
            
            {orders?.map((e, i) => {
                const order = e;
                return (
                    <div key={i}>
                        <HistoryList
                            order={order}
                            index={i}
                            showDetail={showDetail}
                            setShowDetail={setShowDetail}
                        ></HistoryList>
                    </div>
                );
            })}
        </div>
    );
}

export default OrderItem;
