import { GetMeetingsAction } from "@/actions/meeting-action"
import MeetingClient from "./_components/client"
import { Meeting } from "@/types-db"

const ReunionesPage = async() => {


  const meetings = (await GetMeetingsAction()) as Meeting[]

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-5 p-4 pt-4">
          <MeetingClient 
          data={meetings} 
          />
        </div>
      </div>
    
    )
  }
  
  export default ReunionesPage