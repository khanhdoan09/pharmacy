import { useEffect } from 'react';
import { useState } from 'react';
import { findUserId } from '~/services/userServices';

function CommentItem({ avatar, name, time, content, children, id }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        findUserId(id).then((e) => {
            setUser(e?.data?.data);
        });
    }, []);
    return (
        <div className="comment-item mb-4 flex">
            <div className="!h-12 !w-12">
                <p className="flex !h-12 !w-12 items-center justify-center rounded-full bg-[#a39c9c] text-[#fff] ">
                    {user?.email?.split('@')[0]?.substring(0, 1)?.toUpperCase()}
                </p>
            </div>
            <div className="ml-3 overflow-hidden">
                <div>
                    <span className="mr-4">{user?.email?.split('@')[0]}</span>
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
