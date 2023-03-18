import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '~/config/firebase';

export let getImageFromFirebase = (folder, name) => {
    return getDownloadURL(ref(storage, `product/1/avatar.png`));
};
