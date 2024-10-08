import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class UserService {
    static db = getPersistenceSetup().db;
    static userCollection = collection(UserService.db, collections.USERS);

    static async create(user) {
        try {
            await addDoc(this.userCollection, user);
            console.log(`Purchase added successfully: ${contact.name}`);
        } catch (error) {
            console.error("Failed to add purchase:", error);
        }
    }

    static async getUserStatus(user) {
        const usersList = await this.list();
        const currentUserStatus = usersList.filter(u => u.email === user.email)[0]?.status;
        return currentUserStatus
    }

    static async inactivate(userId, updatedUser) {
        try {
            const userRef = doc(this.userCollection, userId);
            await updateDoc(userRef, updatedUser);
            console.log(`User updated successfully: ${userId}`);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    }
    static async list() {
        try {
            const userSnapshot = await getDocs(this.userCollection);
            const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return userList;
        } catch (error) {
            console.error("Failed to fetch users:", error);
            return [];
        }
    }
}