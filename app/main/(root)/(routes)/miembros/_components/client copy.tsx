
"use client"
import { Member } from "@/types-db"
import { Heading } from "../../../_components/heading"
import { Separator } from "@/components/ui/separator"
import TableMembers from "./table-members"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserPlus2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MemberClientProps {
    data: Member[]
}

const MemberClient = ({data}: MemberClientProps) => {
    
    const router = useRouter()
    const isMobile = useIsMobile()
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading title="Directorio de Miembros" description="" />

            <Button onClick={()=>router.push(`/main/miembros/crear`)} className='cursor-pointer'>
                <UserPlus2 className="h-4 w-4" />
                {!isMobile && "Registro"}
            </Button>
        </div>    
        <Separator />

        <TableMembers data={data} />
        </>
    )
}
export default MemberClient