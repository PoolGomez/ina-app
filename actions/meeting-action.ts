"use server";

import { db } from "@/lib/firebase";
import { Meeting } from "@/types-db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const collectionName = "meetings";

export const CreateMeetingAction = async (reunion: Meeting) => {
  try {
    await addDoc(collection(db, collectionName), reunion).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error CreateMeetingAction"
    );
  }
};
export const GetMeetingsAction = async () => {
  try {
    const q = query(collection(db, collectionName), orderBy("fecha"));
    const querySnapShot = await getDocs(q);
    const meetingsData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Meeting[];

    return meetingsData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingsAction"
    );
  }
};
export const GetMeetingsByCongregationAction = async (congregationId: string) => {
  try {
    const q = query(collection(db, collectionName), where("congregacion","==",congregationId));
    const querySnapShot = await getDocs(q);
    const meetingsData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Meeting[];

    return meetingsData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingsByCongregationAction"
    );
  }
};
export const GetMeetingAction = async (meetingId: string) => {
  try {
    const docRef = doc(db, collectionName, meetingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const meetingData = {
        ...docSnap.data(),
        id: docSnap.id,
      };
      return meetingData as Meeting;
    } else {
      throw new Error("Documento no encontrado");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingAction"
    );
  }
};
export const DeleteMeetingAction = async (id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id)).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error DeleteMeetingAction"
    );
  }
};
export const UpdateMeetingAction = async (meeting: Meeting) => {
  try {
    await updateDoc(doc(db, collectionName, meeting.id), {
        fecha: meeting.fecha,
        congregacion: meeting.congregacion,
        estado: meeting.estado,
        detalle: meeting.detalle
    }).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error UpdateMeetingAction"
    );
  }
};
