function Voucher(props) {
    return (
        <div className="my-5">
            <div className="flex items-center bg-[#e4e8ed] rounded-t-full">
                <div className="bg-white h-20 grid place-content-center p-3 rounded-xl">
                    <img
                        width={60}
                        src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/voucher%2Fdiscount.png?alt=media&token=75bcfd8e-b13d-4cbf-b7f8-8fa3c7ab6f07"
                    ></img>
                </div>
                <div className="relative">
                    <div className="absolute w-3 h-3 bg-[#edf0f3] z-10 rounded-full top-8 -left-[6px]"></div>
                    <div className="transform -rotate-90 absolute w-14 -top-5 -left-7 text-[#edf0f3]">- - - - -</div>
                    <div className="absolute w-3 h-3 bg-[#edf0f3] rounded-full -top-11 -left-[6px]"></div>
                </div>
                <div
                    className="line-clamp-3 w-72 rounded-xl bg-white text-[#718198] font-[600] h-20 flex items-center justify-center px-3 py-1"
                    title={props.name}
                >
                    <p className="h-full flex items-center">{props.name}</p>
                </div>
            </div>
            <div className="flex items-center bg-[#e4e8ed] py-3 px-3 rounded-b-2xl z-20 relative">
                <span className="text-[#718198]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
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
        </div>
    );
}

export default Voucher;
