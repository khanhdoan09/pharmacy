import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import History from '~/components/History/History';
import { getOrderByUserId } from '~/services/orderServices';

function Tab() {
    const [toggleState, setToggleState] = useState(1);
    const [listOrder, setListOrder] = useState([]);
    const [listOrderAll, setListOrderAll] = useState([]);
    const [listOrderUnFinish, setListOrderUnFinish] = useState([]);
    const [listOrderFinish, setListOrderFinish] = useState([]);
    const [listOrderCancel, setListOrderCancel] = useState([]);
    const [listOrderReturn, setListOrderReturn] = useState([]);
    const user = useSelector((state) => state.authentication.login.currentUser);

    const navigate = useNavigate();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        const load = getOrderByUserId(user?.accessToken, user?.account, user?.email);
        load.then(
            (e) => {
                if ((e?.data?.status === 200) | (e?.data?.status === 404)) {
                    setListOrder(e?.data?.data);
                    setListOrderAll(e?.data?.data);
                } else if (e?.status === 403) {
                    navigate('/sign-in');
                } else {
                    console.log(e);
                    navigate('server-error');
                }
            },
            (error) => {
                if (error?.status !== 404) navigate('server-error');
            },
        );
    }, []);
    return (
        <>
            <ul className="grid gap-4 rounded-2xl border border-[#d8e0e8]  bg-[#edf2f8]  px-1 py-1  cs:grid-cols-1 xs:grid-cols-1  sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                <li
                    onClick={() => {
                        toggleTab(1);
                    }}
                    className={
                        toggleState === 1
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Tất cả
                </li>
                <li
                    onClick={() => {
                        toggleTab(2);
                        if (listOrderUnFinish.length === 0) {
                            const tmp = listOrder?.filter((e) => e?.status === 'unFinish');
                            setListOrderUnFinish(tmp);
                        } else {
                            setListOrder(listOrderUnFinish);
                        }
                    }}
                    className={
                        toggleState === 2
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Chưa hoàn tất
                </li>
                <li
                    onClick={() => {
                        toggleTab(3);
                        console.log(listOrderFinish.length);
                        if (listOrderFinish.length === 0) {
                            const tmp = listOrder?.filter((e) => e?.status === 'finish');
                            setListOrderFinish(tmp);
                        } else {
                            setListOrder(listOrderFinish);
                        }
                    }}
                    className={
                        toggleState === 3
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Hoàn tất
                </li>
                <li
                    onClick={() => {
                        toggleTab(4);
                        console.log(listOrderCancel.length);
                        if (listOrderCancel.length === 0) {
                            const tmp = listOrder?.filter((e) => e?.status === 'cancel');
                            console.log(tmp);
                            setListOrderCancel(tmp);
                        } else {
                            setListOrder(listOrderCancel);
                        }
                    }}
                    className={
                        toggleState === 4
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Đã hủy
                </li>
                <li
                    onClick={() => {
                        toggleTab(5);
                        if (listOrderReturn === 0) {
                            const tmp = listOrder?.filter((e) => e?.status === 'return');
                            setListOrderReturn(tmp);
                        } else {
                            setListOrder(listOrderReturn);
                        }
                    }}
                    className={
                        toggleState === 5
                            ? 'w-full cursor-pointer  select-none rounded-xl bg-[#072d94] px-3 py-[6px] text-center text-[#fff]'
                            : 'w-full cursor-pointer  select-none rounded-xl bg-transparent px-3 py-[6px] text-center text-[#52637a]'
                    }
                >
                    Trả hàng
                </li>
            </ul>
            <div className="tab-content">
                <div
                    className={
                        toggleState === 1
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    {listOrder.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/order%2Forder-not-found.svg?alt=media&token=db407979-fef0-4d53-b115-01ed4f1756db"
                                alt="non-order"
                               
                            />
                            <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào </p>
                        </div>
                    ) : (
                        <History orders={listOrderAll}></History>
                    )}
                </div>
                <div
                    className={
                        toggleState === 2
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    {listOrder.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/order%2Forder-not-found.svg?alt=media&token=db407979-fef0-4d53-b115-01ed4f1756db"
                            alt="non-order"
                           
                        />
                            <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào </p>
                        </div>
                    ) : (
                        <History orders={listOrderUnFinish}></History>
                    )}
                </div>
                <div
                    className={
                        toggleState === 3
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    {listOrder.length === 0 ? (
                         <div className="flex flex-col items-center justify-center">
                         <img
                             src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/order%2Forder-not-found.svg?alt=media&token=db407979-fef0-4d53-b115-01ed4f1756db"
                             alt="non-order"
                            
                         />
                            <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào </p>
                        </div>
                    ) : (
                        <History orders={listOrderFinish}></History>
                    )}
                </div>
                <div
                    className={
                        toggleState === 4
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    {listOrder.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/order%2Forder-not-found.svg?alt=media&token=db407979-fef0-4d53-b115-01ed4f1756db"
                            alt="non-order"
                           
                        />
                            <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào </p>
                        </div>
                    ) : (
                        <History orders={listOrderCancel}></History>
                    )}
                </div>
                <div
                    className={
                        toggleState === 5
                            ? 'flex animate-fadeBottomMobile flex-col items-center justify-center pt-16 pb-10'
                            : 'hidden'
                    }
                >
                    {listOrder.length === 0 ? (
                         <div className="flex flex-col items-center justify-center">
                         <img
                             src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/order%2Forder-not-found.svg?alt=media&token=db407979-fef0-4d53-b115-01ed4f1756db"
                             alt="non-order"
                            
                         />
                            <p className="mt-4 text-base font-bold">Quý khách chưa có đơn hàng nào </p>
                        </div>
                    ) : (
                        <History orders={listOrderReturn}></History>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tab;
