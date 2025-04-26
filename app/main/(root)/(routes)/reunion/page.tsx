"use server"
// import { fetchDashboardData2 } from "@/actions/meeting-action";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { grupos } from "@/lib/data";
// import { useEffect, useState } from "react";
// import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { fetchMeetingsByGrupo } from "@/actions/meeting-action";
import MeetingTypeStats from "./meeting-type";
import { MeetingByGruup } from "@/types-db";

const ReunionPage = async () => {

    // const [periodo, setPeriodo] = useState<"este mes" | "ultimos 3 meses" | "ultimos 6 meses">("este mes");
    // const [tipoReunion, setTipoReunion] = useState<string>("ALL");
    // const [datos, setDatos] = useState<{ reunionId: string; fecha: string; totalA: number; }[]>([]);

    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    //   }, []);

    // useEffect(() => {
    //     if (!isClient) return;

    //     fetchDashboardData2(periodo, tipoReunion).then(setDatos);
    // }, [periodo, tipoReunion, isClient]);

    const dataMeetings = await fetchMeetingsByGrupo() as MeetingByGruup[]

  return (
    <>
    {/* <div>
        <Select value={periodo} onValueChange={(value) => setPeriodo(value as typeof periodo)}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="este mes">Este mes</SelectItem>
                <SelectItem value="ultimos 3 meses">Últimos 3 meses</SelectItem>
                <SelectItem value="ultimos 6 meses">Últimos 6 meses</SelectItem>
            </SelectContent>
        </Select>

        <Select value={tipoReunion ?? ""} onValueChange={(value) => setTipoReunion(value)}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo de reunión" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">General</SelectItem>
                {grupos.map((grupo)=>(
                    <SelectItem key={grupo.id} value={grupo.id}>{grupo.name}</SelectItem>    
                ))}
            </SelectContent>
        </Select>

        {isClient && (
      <BarChart width={600} height={300} data={datos}>
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalA" fill="#8884d8" />
        </BarChart>
        )}
    </div> */}


    <MeetingTypeStats data={dataMeetings} />

    </>
  )
}

export default ReunionPage
