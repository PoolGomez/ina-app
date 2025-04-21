import { Member } from "@/types-db";
import { GetMembersAction } from "@/actions/member-action";
import MemberClient from "./_components/client";
import { redirect } from "next/navigation";

const MembersPage = async () => {
  // const members = (await GetMembersAction()) as Member[];

  let members: Member[] = [];
      try {
          members = await GetMembersAction();
      } catch (error) {
          console.error("Error al obtener los datos:", error);
          redirect("/main")
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje o un componente alternativo
      }
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        <MemberClient data={members} />
      </div>
    </div>
  );
};

export default MembersPage;
