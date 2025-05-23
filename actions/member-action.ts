"use server";

import { db } from "@/lib/firebase";
import { Member } from "@/types-db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  // orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const collectionName = "members";

export const CreateMemberAction = async (miembro: Member) => {
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
// export const GetMembersAction = async () => {
//   try {
//     const q = query(collection(db, collectionName), orderBy("apellidos"));
//     const querySnapShot = await getDocs(q);
//     const membersData = querySnapShot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Member[];
//     return membersData;
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Error GetMembersAction"
//     );
//   }
// };
export const GetMembersAction = async(setMembers: (members: Member[]) => void) => {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const members: Member[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Member[];
    setMembers(members);
  });
  // Devuelve la función de unsubscribe para que puedas dejar de escuchar cuando sea necesario
  return unsubscribe;
};

export const GetMembersAction2 = async() => {
  try {
      const q = query(collection(db, collectionName), orderBy("apellidos"));
      const querySnapShot = await getDocs(q);
      const meetingsData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Member[];
  
      return meetingsData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMembersAction2"
    );
  }
}

export const GetMembersByGroupIdAction = async (groupId: string) => {
  try {
    const q = query(collection(db, collectionName), where("grupo","==",groupId));
    const querySnapShot = await getDocs(q);
    const membersData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];

    return membersData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMembersByGroupIdAction"
    );
  }
};
export const GetMembersByCongregationAndGroupAction = async (congregacion: string, grupo: string) => {
  try {
    let q
    if(grupo === "ALL"){
      q = query(
        collection(db, collectionName), 
        where("congregacion","==",congregacion)
      );
    }else{
      q = query(
        collection(db, collectionName), 
        where("congregacion","==",congregacion),
        where("grupo","==",grupo)
      );
    }

    const querySnapShot = await getDocs(q);
    const membersData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Member[];
    return membersData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMembersByCongregationAction"
    );
  }
};
export const GetMemberAction = async (memberId: string) => {
  try {
    const docRef = doc(db, collectionName, memberId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const memberData = {
        ...docSnap.data(),
        id: docSnap.id,
      };
      return memberData as Member;
    } else {
      throw new Error("Documento no encontrado");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMembersAction"
    );
  }
};
export const DeleteMemberAction = async (id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id)).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error DeleteMemberAction"
    );
  }
};
export const UpdateMemberAction = async (member: Member) => {
  try {
    await updateDoc(doc(db, collectionName, member.id), {
      congregacion: member.congregacion,
      distrito: member.distrito,
      pais: member.pais,
      apellidos: member.apellidos,
      nombres: member.nombres,
      genero: member.genero,
      fecha_nacimiento: member.fecha_nacimiento,
      lugar_nacimiento: member.lugar_nacimiento,
      fecha_bautismo: member.fecha_bautismo,
      fecha_sellamiento: member.fecha_sellamiento,
      num_documento: member.num_documento,
      estado_civil: member.estado_civil,
      fecha_matrimonio_civil: member.fecha_matrimonio_civil,
      direccion: member.direccion,
      telefono: member.telefono,
      celular: member.celular,
      ocupacion: member.ocupacion,
      actividad_ina: member.actividad_ina,
      grupo: member.grupo,
      email: member.email,
    }).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error UpdateMemberAction"
    );
  }
};
