"use client"
import MeetingClient from "./_components/client"
import { Meeting } from "@/types-db"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

const ReunionesPage = () => {


  // const meetings = (await GetMeetingsAction()) as Meeting[]
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "meetings"), (snapshot) => {
      const dataMeetings: Meeting[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Meeting[];
      setMeetings(dataMeetings);
    });
    // Devuelve la función de unsubscribe para que puedas dejar de escuchar cuando sea necesario
    return unsubscribe;
  }, []);


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