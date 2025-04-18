import { db } from "@/lib/firebase";
import { Attendance } from "@/types-db";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const collectionName = "attendances";

export const CreateAttendanceAction = async (miembro: Attendance) => {
  try {
    await addDoc(collection(db, collectionName), miembro).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error CreateMemberAction"
    );
  }
};

export const GetAttendanceByMeetingIdAction = async (meetingId: string) => {
  try {
    const q = query(collection(db, collectionName), where("meetingId","==",meetingId));
    const querySnapShot = await getDocs(q);
    const attendanceData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Attendance[];

    return attendanceData[0];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetAttendanceByMeetingIdAction"
    );
  }
};