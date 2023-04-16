function CommentItem({ avatar, name, time, content, children }) {
    return (
        <div className="comment-item mb-4 flex">
            <div className="!h-12 !w-12">
                <p className="flex !h-12 !w-12 items-center justify-center rounded-full bg-[#a39c9c] text-[#fff] ">
                    {avatar}
                </p>
            </div>
            <div className="ml-3 overflow-hidden">
                <div>
                    <span className="mr-4">{name}</span>
                    <span>{time}</span>
                </div>
                <div className="mt-1">
                    <p className="">{content}</p>

                    <div className="mt-1">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
