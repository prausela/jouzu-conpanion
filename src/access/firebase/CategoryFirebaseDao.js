import { child, get, ref } from "firebase/database";
import firebaseConfig from "../../UI/config/firebaseConfig";

const firebaseDb = firebaseConfig.getFirebaseInstance();

const getAllCategories = async () => {
    const dbRef = ref(firebaseDb);
    return get(child(dbRef, "categories")).then((snapshot) => {
        if(snapshot.exists()) {
            return snapshot.val();
        } else {
            return [];
        }
    }).catch((error) => {
        console.error(error);
        return null;
    })
}

const findCategory = async (id) => {

}

const createCategory = async (name) => {

}

const changeCategoryName = async (id, newName) => {

}

export default {
    getAllCategories,
    findCategory,
    createCategory,
    changeCategoryName
};