import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore"
import { fireStore } from "../firebase.config"
import { toast } from "react-toastify"

export const savedata = async (data) => {
    await setDoc(doc(fireStore, "chat", `${Date.now()}`), data, { merge: true })
}

export const getItems = async (category) => {
    const items = await getDocs(query(collection(fireStore, `${category}`)))
    return items.docs.map((doc) => doc.data())
}

export const createUser = async (email, name) => {
    const user = await getDoc(doc(fireStore, 'users', email))
    if (!user) {
        await setDoc(doc(fireStore, 'users', `${email}`), { email: email, name: name, cart: [] }, { merge: true })
        toast.success("user created successfully")
    } else {
        toast.success('login success')
    }
}

export const updateCart = async (data, id, type) => {
    const docRef = await doc(fireStore, 'users', id)
    if (type === "add") {
        await updateDoc(docRef, {
            cart: arrayUnion(data),
        })
        toast.success('Product added..........😃')
    } else {
        await updateDoc(docRef, {
            cart: arrayRemove(data)
        })
        toast.success('Product Removed')
    }
}

export const getCart = async (id) => {
    const res = await getDoc(doc(fireStore, 'users', id))
    return res.data()
}