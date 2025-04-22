"use client"
import { Member } from "@/types-db";
// import { GetMembersAction } from "@/actions/member-action";
import MemberClient from "./_components/client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
// import { redirect } from "next/navigation";

const MembersPage = () => {
  // const members = (await GetMembersAction()) as Member[];
  // let members: Member[] = [];
  // try {
  //     members = await GetMembersAction();
  // } catch (error) {
  //     console.error("Error al obtener los datos:", error);
  //     redirect("/main")
  //     // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje o un componente alternativo
  // }
  
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "members"), (snapshot) => {
      const dataMembers: Member[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Member[];
      setMembers(dataMembers);
    });
    // Devuelve la función de unsubscribe para que puedas dejar de escuchar cuando sea necesario
    return unsubscribe;
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        <MemberClient data={members} />
      </div>
    </div>
  );
};

export default MembersPage;
