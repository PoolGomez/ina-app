
import { Meeting } from "@/types-db";
import { redirect } from "next/navigation";
import { GetMeetingAction } from "@/actions/meeting-action";
import { MeetingForm } from "./_components/meeting-form";

type Params = Promise <{
    meetingId: string
}>

const MeetingPage = async ({params}:{params: Params})  => {
    const {meetingId} = await params;
    let meeting: Meeting | null = null;
    try {
        meeting = await GetMeetingAction(meetingId);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        redirect("/main/reuniones")
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje o un componente alternativo
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-5 p-4 md:p-8 pt-4 md:pt-6">

                <MeetingForm data={meeting}  />

            </div>
        </div>
    )
}

export default MeetingPage