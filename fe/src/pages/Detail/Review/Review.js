import Rating from 'react-rating';
import { NavLink } from 'react-router-dom';
import ReviewItem from './ReviewItem';

function Review(props) {
    const handleSumStar = (num) => {
        return props?.dataReview?.reduce((sum, re) => {
            return re.star === num ? sum + 1 : sum;
        }, 0);
    };
    const sumStar = props?.dataReview?.reduce((sum, re) => sum + re.star, 0);
    const average = sumStar / props?.dataReview?.length;

    return (
        <div className="max-w-full bg-[#edf2f8] px-1 pb-8">
            <div className="mx-auto my-0 max-w-[1200px] rounded-xl border border-[#d8e0e8] bg-[#fff]">
                <div className="border-b border-[#d8e0e8] px-4 py-3">
                    <h3 className="text-xl font-bold">Đánh Giá & Nhận Xét</h3>
                </div>
                <div className="grid gap-4 border-b border-[#d8e0e8] py-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                    <div className="flex flex-col items-center justify-center">
                        <p className="mb-1 text-base">Đánh Giá Trung Bình</p>
                        <h1 className="mb-1 text-[44px] font-bold text-[#1d48ba]">
                            {isNaN(average.toFixed(1)) ? 5 : average.toFixed(1)}/5
                        </h1>
                        <div className="flex items-center">
                            <Rating
                                initialRating={isNaN(average.toFixed(1)) ? 5 : average.toFixed(0)}
                                readonly
                                emptySymbol="far fa-star text-gray-400"
                                fullSymbol="fas fa-star text-yellow-400"
                                className="mr-2"
                            />
                        </div>
                        <p className="text-sm text-[#718198]">{props?.dataReview?.length || 0} đánh giá</p>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4">
                        <div className="mb-1 flex items-center">
                            <span className="mr-1 text-base">5</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-5 w-5 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="mr-1 h-2 w-full rounded-full bg-gray-200 ">
                                <div
                                    className="h-2 rounded-full bg-[#4cb816]"
                                    style={{ width: handleSumStar(5) / 100 + '%' || 1 + '%' }}
                                ></div>
                            </div>
                            <span className="text-[#718198]">{handleSumStar(5) || 0}</span>
                        </div>
                        <div className="mb-1 flex items-center">
                            <span className="mr-1 text-base">4</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-5 w-5 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="mr-1 h-2 w-full rounded-full bg-gray-200 ">
                                <div
                                    className="h-2 rounded-full bg-[#4cb816]"
                                    style={{ width: handleSumStar(4) / 100 + '%' || 1 + '%' }}
                                ></div>
                            </div>
                            <span className="text-[#718198]"> {handleSumStar(4) || 0}</span>
                        </div>
                        <div className="mb-1 flex items-center">
                            <span className="mr-1 text-base">3</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-5 w-5 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="mr-1 h-2 w-full rounded-full bg-gray-200 ">
                                <div
                                    className="h-2 rounded-full bg-[#4cb816]"
                                    style={{ width: handleSumStar(3) / 100 + '%' || 1 + '%' }}
                                ></div>
                            </div>
                            <span className="text-[#718198]"> {handleSumStar(3) || 0}</span>
                        </div>
                        <div className="mb-1 flex items-center">
                            <span className="mr-1 text-base">2</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-5 w-5 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="mr-1 h-2 w-full rounded-full bg-gray-200 ">
                                <div
                                    className="h-2 rounded-full bg-[#4cb816]"
                                    style={{ width: handleSumStar(2) / 100 + '%' || 1 + '%' }}
                                ></div>
                            </div>
                            <span className="text-[#718198]"> {handleSumStar(2) || 0}</span>
                        </div>
                        <div className="mb-1 flex items-center">
                            <span className="mr-1 text-base">1</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-1 h-5 w-5 text-[#f59e0b]"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="mr-1 h-2 w-full rounded-full bg-gray-200 ">
                                <div
                                    className="h-2 rounded-full bg-[#4cb816]"
                                    style={{ width: handleSumStar(1) / 100 + '%' || 1 + '%' }}
                                ></div>
                            </div>
                            <span className="text-[#718198]"> {handleSumStar(1) || 0}</span>
                        </div>
                    </div>
                    <div className="my-auto flex flex-col items-center">
                        <p className="mb-2">Bạn đã dùng sản phẩm này?</p>
                        {/* <NavLink to="/user">
                            <button className="rounded-3xl bg-[#1d48ba] px-8 text-base leading-9 text-[#fff]">
                                GỬI ĐÁNH GIÁ
                            </button>
                       </NavLink> */}
                    </div>
                </div>
                {props?.dataReview?.map((e) => (
                    <div className="px-4 py-3" key={e?.id}>
                        <ReviewItem
                            id={e?.userId}
                            avatar={e?.user?.name?.slice(0, 1).toUpperCase()}
                            name={e?.user?.name}
                            // time="1 tuần trước"
                            content={e?.content}
                        >
                            <div className="flex items-center">
                                <Rating
                                    initialRating={e?.star}
                                    readonly
                                    emptySymbol="far fa-star text-gray-400"
                                    fullSymbol="fas fa-star text-yellow-400"
                                    className="mr-2"
                                />
                            </div>
                        </ReviewItem>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Review;
