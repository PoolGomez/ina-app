
"use client"
import { Member } from "@/types-db"
import { Heading } from "../../../_components/heading"
import { Separator } from "@/components/ui/separator"
import TableMembers from "./table-members"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LoaderCircle, UserPlus2, Users2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"
import { GetMembersAction2 } from "@/actions/member-action"



const MemberClient = () => {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<Member[]>([]);
    const router = useRouter()
    const isMobile = useIsMobile()

    useEffect(() => {
            const loadData = async () => {
              setLoading(true);
              try {
                const meetingsData = await GetMembersAction2();
                setMembers(meetingsData);
              } catch (error) {
                console.error('Error loading data:', error);
              } finally {
                setLoading(false);
              }
            };
            
            loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
              <LoaderCircle className="animate-spin h-12 w-12" />
              <span className="ml-3 text-gray-600">Cargando...</span>
            </div>
        );
      }


    return(
        <>
        <div className="flex items-center justify-between">

          <div className="mr-3 bg-blue-100 p-2 rounded-lg">
            <Users2 className="h-6 w-6" />
          </div>

            <Heading title="Directorio de Miembros" description="" />

            <Button onClick={()=>router.push(`/main/miembros/crear`)} className='cursor-pointer'>
                <UserPlus2 className="h-4 w-4" />
                {!isMobile && "Registro"}
            </Button>
        </div>    
        <Separator />

        <TableMembers data={members} />
        

        
        </>
    )
}
export default MemberClient