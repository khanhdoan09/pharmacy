import ProductImageSlider from '~/components/ProductImageSlider/ProductImageSlider';

function SliderImageDetail(props) {
    return (
        <div className="img animate-fadeBottomMobile overflow-hidden px-1 cs:hidden xs:hidden sm:block md:block lg:block xl:block 2xl:block">
       
            <ProductImageSlider images={props?.imageList?.slice(1,6)} />
           
        </div>
    );
}

export default SliderImageDetail;
