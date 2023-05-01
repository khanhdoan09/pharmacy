import { useState } from 'react';
import { convertNumberToPrice } from '~/utils/currency';
import { getImageFromFirebase } from '~/utils/firebase';
function CheckoutItem({ avatar, medicine, quantity, unit }) {
    const [urlImage, setUrlImage] = useState(
        'https://localhost:3000/static/media/placeholder600x600.8239fe13708c0a4484a8.png',
    );
    const imagePromise = getImageFromFirebase(`product/${medicine?.id}`, `${avatar}`);
    imagePromise.then((url) => {
        setUrlImage(url);
    });
    return (
        <div className="flex items-center p-3">
            <div className="flex items-center rounded-lg border p-1">
                <img width={50} src={urlImage}></img>
            </div>
            <div className="ml-5 flex w-4/5 flex-wrap items-center justify-between">
                <h6>{medicine?.name}</h6>
                <div className="flex justify-between pt-2 max-sm:w-full">
                    <span className="font-semibold">
                        {convertNumberToPrice(quantity * (unit?.price - (unit?.price * medicine?.discount) / 100))}đ
                    </span>
                    <span className="mx-3 text-slate-500 line-through">
                        {convertNumberToPrice(quantity * unit?.price)}đ
                    </span>
                    <span>
                        x{quantity} {unit?.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutItem;
