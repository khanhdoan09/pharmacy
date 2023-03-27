import Breadcrumb from '~/components/Breadcrumb';
import Comment from './Comment';
import DetailList from './DetailList';
import MainDetail from './MainDetail';
import RelatedProduct from './RelatedProduct';
import Review from './Review';

function Detail() {
    return (
        <div className=" max-w-full ">
            <div className="padding-responsive mx-auto my-0 max-w-[1200px] border-b pb-8 ">
                <Breadcrumb />
                <MainDetail />
            </div>
            <div className="padding-responsive mx-auto my-0 max-w-[1200px] pt-8 pb-8">
                <DetailList />
            </div>

            {/* related products */}
            <div className="overflow-x-hidden">
                <RelatedProduct />
            </div>

            {/* comment section  */}
            <div className="padding-responsive bg-[#edf2f8]">
                <Comment />
            </div>

            <div className="overflow-x-hidden">
                <RelatedProduct />
            </div>

            <div className="padding-responsive bg-[#edf2f8]">
                <Review />
            </div>
        </div>
    );
}

export default Detail;
