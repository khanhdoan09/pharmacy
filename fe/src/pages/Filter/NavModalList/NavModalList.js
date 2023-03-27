import { ContentNavModalItem } from '~/components/NavModal';

function NavModalList() {
    return (
        <>
            <div className="flex items-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 mr-2 bg-[#1d48ba] rounded-full px-1 text-[#fff]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                </svg>

                <h3 className="font-bold">Chăm sóc cá nhân</h3>
            </div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4 mb-8">
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/than-tien-liet-tuyen.png"
                    title="Thận, tiền liệt tuyến"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/xuong-khop.png"
                    title="Cơ sương khớp"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/gout.png"
                    title="Hỗ trợ điều trị gout"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/images/category/20220329230330-2043.png"
                    title="Hô hấp, ho, xoang"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/tri.png"
                    title="Hỗ trợ điều trị trĩ"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/tieu-duong.png"
                    title="Hỗ trợ điều trị tiểu đường"
                />
                <ContentNavModalItem
                    to=""
                    img="https://cdn.nhathuoclongchau.com.vn/unsafe/fit-in/80x80/filters:quality(90):fill(white)/https://nhathuoclongchau.com.vn/upload/images/filtercate/ung-thu.png"
                    title="Hỗ trợ điều trị ung thư"
                />
               
            </div>
        </>
    );
}

export default NavModalList;
