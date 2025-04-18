import { CreateMeetingForm } from "./_components/create-meeting-form"


const CreateMeetingPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 md:p-8 pt-4 md:pt-6">
        <CreateMeetingForm />
        
      </div>
    </div>
  )
}

export default CreateMeetingPage
