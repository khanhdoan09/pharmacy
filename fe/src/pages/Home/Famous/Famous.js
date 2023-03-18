import FamousItem from './FamousItem';
import f1 from '~/assets/img/famous/vitamin.png';
import f2 from '~/assets/img/famous/sexual.png';
import f3 from '~/assets/img/famous/skincare.png';
import f4 from '~/assets/img/famous/tooth.png';
import f5 from '~/assets/img/famous/shampoo.png';
import f6 from '~/assets/img/famous/digest.png';
import f7 from '~/assets/img/famous/personal hygiene.png';
import f8 from '~/assets/img/famous/heart.png';
import f9 from '~/assets/img/famous/brain nerve.png';
import f10 from '~/assets/img/famous/medical.png';
import f11 from '~/assets/img/famous/function.png';

function Famous() {
    const blue =
        'flex items-center flex-col mx-auto bg-[#e8f5fd] rounded-lg py-3 min-w-[150px]  2xl:w-[176px] xl:w-[176px] lg::w-[176px] md::w-[176px] sm:w-[176px] xs:w-full cs:w-full   h-[204px] mb-4 hover:border border-[#016cc9] transition ease-in-out delay-75';
    const orange =
        'flex items-center flex-col mx-auto bg-[#fef7dc] rounded-lg py-3  min-w-[150px] 2xl:w-[176px] xl:w-[176px] lg::w-[176px] md::w-[176px] sm:w-[176px] xs:w-full  cs:w-full   h-[204px] mb-4 hover:border border-[#016cc9] transition ease-in-out delay-75';
    return (
        <div className="mx-auto my-0 max-w-[1200px] pt-8 ">
            <div className="-mx-1 flex flex-wrap ">
                <div className="mx-auto flex">
                    <h3 className=" mb-4 text-center text-[28px] font-bold">Danh Mục Nổi Bật</h3>
                </div>
            </div>
            <div className="mb-8 grid gap-4 cs:grid-cols-1 cs:px-4 xs:grid-cols-2 xs:px-4 sm:grid-cols-3 sm:px-4 md:grid-cols-4 md:px-2 lg:grid-cols-6 lg:px-2 xl:grid-cols-7 xl:px-1  2xl:grid-cols-7 2xl:px-1">
                <FamousItem to="" img={f1} title="Vitamin" />
                <FamousItem to="" img={f2} title="Hỗ trợ tình dục" />
                <FamousItem to="" img={f3} title="Chăm sóc da mặt" />
                <FamousItem to="" img={f4} title="Chăm sóc răng miệng" />
                <FamousItem to="" img={f5} title="Chăm sóc tóc - da đầu" />
                <FamousItem to="" img={f6} title="Hỗ trợ tiêu hóa" />
                <FamousItem to="" img={f7} title="Vệ sinh cá nhân" />
                <FamousItem to="" img={f8} title="Sức khỏe tim mạch" />
                <FamousItem to="" img={f9} title="Thần kinh não" />
                <FamousItem to="" img={f10} title="Dụng cụ y tế" />
                <FamousItem to="" img={f11} title="Cải thiện tăng cường chức năng" />
            </div>
        </div>
    );
}

export default Famous;
