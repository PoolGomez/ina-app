import { GetMemberAction } from "@/actions/member-action";
import { MemberForm } from "./_components/member-form"
import { Member } from "@/types-db";
import { redirect } from "next/navigation";

type Params = Promise <{
    memberId: string
}>

const MemberPage = async ({params}:{params: Params})  => {
    const {memberId} = await params;
    let member: Member | null = null;
    try {
        member = await GetMemberAction(memberId);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        redirect("/main/miembros")
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje o un componente alternativo
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-4 md:p-8 pt-4 md:pt-6">
                <MemberForm data={member}  />
            </div>
        </div>
    )
}

export default MemberPage