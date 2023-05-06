import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '~/config/firebase';

export let getImageFromFirebase = (folder, id, name) => {
    return getDownloadURL(ref(storage, `${folder}/${id}/${name}.png`));
};

export const getImageList = async (folder) => {
    const imagesRef = ref(storage, folder);
    const imageList = await listAll(imagesRef);
    const imageURLs = await Promise.all(
        imageList.items.map(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            return downloadURL;
        }),
    );
    return imageURLs;
};
