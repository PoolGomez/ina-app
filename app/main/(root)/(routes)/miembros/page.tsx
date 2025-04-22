"use client"
import { Member } from "@/types-db";
import { GetMembersAction } from "@/actions/member-action";
import MemberClient from "./_components/client";
import { useEffect, useState } from "react";
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
    const unsubscribe = GetMembersAction(setMembers);
    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
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
