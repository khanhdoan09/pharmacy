import { useEffect } from 'react';
import { useState } from 'react';
import { findUserId } from '~/services/userServices';

function Reply({ name, label, time, content, children, userId }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        findUserId(userId).then((e) => {
            setUser(e?.data?.data);
        });
    }, []);
    return (
        <div className="rep-comment ml-[48px] mt-3 border-l-4 pl-2">
            <div className="flex items-center">
                <p className="mr-2 text-[18px] font-bold">{user?.email?.split('@')[0]}</p>
                <p className="mr-2 rounded-md bg-[#e1e9ff] px-2 text-sm text-[#334155] line-clamp-1">{label}</p>
                <span className="text-sm line-clamp-1">{time}</span>
            </div>
            <p className="mt-1">{content}</p>
            <div className="mt-1 flex items-center">
                {/* <button className="mr-2 text-sm text-[#1d48ba]">Trả lời</button> */}
                {children}
            </div>
        </div>
    );
}

export default Reply;
