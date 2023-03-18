import { NavLink } from 'react-router-dom';

function ServerError() {
   
    return (
        <div className="grid place-content-center p-5">
            <div className="flex justify-center my-3">
                <img
                    width={750}
                    src="https://firebasestorage.googleapis.com/v0/b/pharmacy-969d7.appspot.com/o/error%2F500.png?alt=media&token=5213f69d-6e1a-42d7-9ed8-db236eb13f3b"
                    alt=""
                />
            </div>
            <div className="text-center text-lg my-5">
                <span className="text-5xl text-[#4d5f66] font-bold">OOPS! </span>
                <span className="text-3xl font-thin text-[#aba7a7]">Server không thể xử lí yêu cầu này</span>
            </div>
            <div className="text-center my-8">
                <NavLink
                    to="/"
                    className="border border-md w-fit py-4 px-8 rounded-full text-white bg-[#1d48ba] hover:bg-blue-900"
                >
                    VỀ TRANG CHỦ
                </NavLink>
            </div>
        </div>
    );
}

export default ServerError;
