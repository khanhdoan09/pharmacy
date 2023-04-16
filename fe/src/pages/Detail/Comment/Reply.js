function Reply({ name, label, time, content, children }) {
    return (
        <div className="rep-comment border-l-4 ml-[48px] pl-2 mt-3">
            <div className="flex items-center">
                <p className="font-bold mr-2 text-[18px]">{name}</p>
                <p className="px-2 text-[#334155] bg-[#e1e9ff] rounded-md mr-2 text-sm line-clamp-1">{label}</p>
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
