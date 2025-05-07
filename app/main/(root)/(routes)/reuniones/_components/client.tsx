"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { Meeting } from "@/types-db"
import { useRouter } from "next/navigation"
import { Heading } from "../../../_components/heading"
import { Button } from "@/components/ui/button"
import { CalendarClock, FilePlus2, LoaderCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import TableMeetings from "./table-meetings"
import { useEffect, useState } from "react"
import { GetMeetingsAction2 } from "@/actions/meeting-action"

const MeetingClient = () => {
    const [loading, setLoading] = useState(true);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const router = useRouter()
    const isMobile = useIsMobile()

    useEffect(() => {
        const loadData = async () => {
          setLoading(true);
          try {
            const meetingsData = await GetMeetingsAction2();
            setMeetings(meetingsData);
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
            <CalendarClock className="h-6 w-6" />
          </div>

            <Heading title="Reuniones" description="Lista de reuniones" />

            <Button onClick={()=>router.push(`/main/reuniones/crear`)} className='cursor-pointer'>
                <FilePlus2 className="h-4 w-4" />
                {!isMobile && "Registrar"}
            </Button>
        </div>    
        <Separator />

        <TableMeetings
        data={meetings} 
        />
            
        
        </>
    )
}
export default MeetingClient