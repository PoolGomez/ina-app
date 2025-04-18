"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { Meeting } from "@/types-db"
import { useRouter } from "next/navigation"
import { Heading } from "../../../_components/heading"
import { Button } from "@/components/ui/button"
import { FilePlus2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import TableMeetings from "./table-meetings"

interface MeetingClientProps {
    data: Meeting[]
}

const MeetingClient = (
    {data}: MeetingClientProps
) => {
    
    const router = useRouter()
    const isMobile = useIsMobile()
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading title="Reuniones" description="Lista de reuniones" />

            <Button onClick={()=>router.push(`/main/reuniones/crear`)} className='cursor-pointer'>
                <FilePlus2 className="h-4 w-4" />
                {!isMobile && "Registrar"}
            </Button>
        </div>    
        <Separator />

        <TableMeetings
        data={data} 
        />
            
        
        </>
    )
}
export default MeetingClient