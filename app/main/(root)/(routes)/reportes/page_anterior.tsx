"use client"
import { useEffect, useState } from "react";
import { Heading } from "../../_components/heading"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchDashboardData } from "@/actions/meeting-action";

type ChartData = { name: string; total: number }; 

const ReportesPageAnterior = () => {

   const [tipoData, setTipoData] = useState<ChartData[]>([]);
    const [sectorData, setSectorData] = useState<ChartData[]>([]);


    useEffect(() => {
       fetchDashboardData().then(({ resumenPorGrupo, resumenPorCongregacion }) => {
           setTipoData(Object.entries(resumenPorGrupo).map(([key, value]) => ({ name: key, total: value })));
           setSectorData(Object.entries(resumenPorCongregacion).map(([key, value]) => ({ name: key, total: value })));
         });
    }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">

        <div className="flex items-center justify-between">
            <Heading title="Reportes" description="En construcción" />
        </div>   

         <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Dashboard de Asistencias</h1>

              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">Asistencias por Tipo</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tipoData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">Asistencias por Sector</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sectorData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </section>
            </div> 

      </div>
    </div>
  )
}

export default ReportesPageAnterior
