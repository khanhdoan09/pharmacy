import { useState } from 'react';
import { convertNumberToPrice, convertPriceToNumber } from '~/utils/currency';

function Voucher(props) {
    const [chooseVoucher, setChooseVoucher] = useState(false);
    return (
        <div className="my-5">
            <div className="flex items-center rounded-t-full bg-[#e4e8ed]">
                <div className="grid h-20 place-content-center rounded-xl bg-white p-3">
                    <img
                        width={60}
                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fdiscount.png?alt=media&token=75bcfd8e-b13d-4cbf-b7f8-8fa3c7ab6f07"
                    ></img>
                </div>
                <div className="relative">
                    <div className="absolute top-8 -left-[6px] z-10 h-3 w-3 rounded-full bg-[#edf0f3]"></div>
                    <div className="absolute -top-5 -left-7 w-14 -rotate-90 transform text-[#edf0f3]">- - - - -</div>
                    <div className="absolute -top-11 -left-[6px] h-3 w-3 rounded-full bg-[#edf0f3]"></div>
                </div>
                <div
                    className="relative flex h-20 w-72 items-center justify-center rounded-xl bg-white px-3 py-1 font-[600] text-[#718198] line-clamp-3"
                    title={props?.voucher?.name}
                >
                    <p className="flex h-full items-center">{props?.voucher?.name}</p>
                    <span
                        className="absolute right-1 top-1/3 my-1 mr-1 cursor-pointer"
                        onClick={() => {
                            if (chooseVoucher) {
                                const tmpArr = props?.chooseListVoucher?.filter((e) => e?.id != props?.voucher?.id);
                                props?.setChooseListVoucher(tmpArr);
                                props?.setTotalPriceVoucher(
                                    props?.totalPriceVoucher - (props?.totalPrice * props?.voucher?.discount) / 100,
                                );
                            } else {
                                props?.setChooseListVoucher([...props?.chooseListVoucher, props?.voucher]);
                                props?.setTotalPriceVoucher(
                                    props?.totalPriceVoucher + (props?.totalPrice * props?.voucher?.discount) / 100,
                                );
                            }
                            setChooseVoucher(!chooseVoucher);
                        }}
                    >
                        {chooseVoucher ? (
                            <span
                                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-sky-700 
                                bg-sky-700 p-1 text-white"
                            >
                                <i className="fa-solid fa-check"></i>
                            </span>
                        ) : (
                            <span
                                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-sky-700 
                                bg-slate-50 p-1 text-sky-500 "
                            >
                                <i className="fa-solid fa-plus"></i>
                            </span>
                        )}
                    </span>
                </div>
            </div>
            {props?.valid ? null : (
                <div className="relative z-20 flex items-center rounded-b-2xl bg-[#e4e8ed] py-3 px-3">
                    <span className="text-[#718198]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </span>
                    <span className="text-[#718198]">Chưa đủ điều kiện hưởng khuyến mãi</span>
                </div>
            )}
        </div>
    );
}

export default Voucher;
