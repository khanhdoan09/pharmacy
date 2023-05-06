import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import * as commentService from '~/services/commentService';
import * as medicineService from '~/services/medicineService';
import * as rateService from '~/services/rateService';
import Comment from './Comment';
import DetailList from './DetailList';
import MainDetail from './MainDetail';
import RelatedProduct from './RelatedProduct';
import Review from './Review';
import * as firebaseService from '~/utils/firebase';

function Detail() {
    const { medicineId } = useParams();
    const [dataDetail, setDataDetail] = useState();
    const [dataIngredient, setDataIngredient] = useState();
    const [commentByMedicineId, setCommentByMedicineId] = useState([]);
    const [dataReview, setDataReview] = useState();
    const [imageList, setImageList] = useState([]);

    const handleMedicineId = medicineId.split('=')[1];
    useEffect(() => {
        const fetchApi = async () => {
            const resultFindMedicineDetailByMedicineId = await medicineService.findMedicineDetailByMedicineId(
                handleMedicineId,
            );
            const resultIngredient = await medicineService.findMedicineIngredientByMedicineId(handleMedicineId);
            setDataDetail(resultFindMedicineDetailByMedicineId.data);
            setDataIngredient(resultIngredient.data);
        };
        fetchApi();
    }, [handleMedicineId]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const resultAllComments = await commentService.findCommentsByMedicineIdOrderByCreateDate(handleMedicineId);
            setCommentByMedicineId(resultAllComments?.data);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [handleMedicineId, commentByMedicineId.length]);

    useEffect(() => {
        const fetchApi = async () => {
            const re = await rateService.findRateByMedicineId(handleMedicineId);
            if (handleMedicineId !== undefined) {
                const imageList = await firebaseService.getImageList(`product/${handleMedicineId}`);
                setImageList(imageList);
            }
            setDataReview(re?.data);
        };
        fetchApi();
    }, [handleMedicineId]);

    return (
        <div className=" max-w-full ">
            <div className="padding-responsive mx-auto my-0 max-w-[1200px] border-b pb-8 ">
                <Breadcrumb />
                <MainDetail
                    detail={dataDetail}
                    commentByMedicineId={commentByMedicineId}
                    dataReview={dataReview}
                    imageList={imageList}
                />
            </div>
            <div className="padding-responsive mx-auto my-0 max-w-[1200px] pt-8 pb-8">
                <DetailList detail={dataDetail} ingredient={dataIngredient} />
            </div>

            {/* related products */}
            <div className="overflow-x-hidden">{/* <RelatedProduct /> */}</div>

            {/* comment section  */}
            <div className="padding-responsive bg-[#edf2f8]">
                <Comment commentByMedicineId={commentByMedicineId} />
            </div>

            <div className="overflow-x-hidden">
                <RelatedProduct
                    medicineId={handleMedicineId}
                    categoryDetailId={dataDetail?.medicine?.categoryDetail?.id}
                />
            </div>

            <div className="padding-responsive bg-[#edf2f8]">
                <Review dataReview={dataReview} />
            </div>
        </div>
    );
}

export default Detail;
