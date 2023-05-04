import { useState } from 'react';
import { getImageFromFirebase } from '~/utils/firebase';

function HistoryImage({ productId, avatar }) {
    const [urlImage, setUrlImage] = useState(
        'https://localhost:3000/static/media/placeholder600x600.8239fe13708c0a4484a8.png',
    );
    const imagePromise = getImageFromFirebase(`product/${productId}`, `${avatar}`);
    imagePromise.then((url) => {
        setUrlImage(url);
    });
    return (
        <div>
            <img src={urlImage} width={60} height={60} alt=""></img>
        </div>
    );
}

export default HistoryImage;
