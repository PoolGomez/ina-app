"use client"
import { getMeetingName, getMeetingType } from '@/lib/data';
import { MeetingByGruup } from '@/types-db';
import { PieChart, Users2, Video, Presentation } from 'lucide-react';

const MeetingTypeStats = ({data}:{data:MeetingByGruup[]}) => {
  const meetingTypes = [
    {
      type: 'Planificación',
      count: 45,
      percentage: 35,
      icon: PieChart,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      type: 'Capacitación',
      count: 38,
      percentage: 30,
      icon: Presentation,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      type: 'Virtual',
      count: 25,
      percentage: 20,
      icon: Video,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
    },
    {
      type: 'Equipo',
      count: 19,
      percentage: 15,
      icon: Users2,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
    },
  ];


  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tipos de Reuniones</h2>
        <div>
          {JSON.stringify(data)}
        </div>
        <div className="space-y-6">
          <div className="relative pt-1">
            {data.map((type) => {

                const metting = getMeetingType(type.grupo)

              return(
              <div key={type.grupo} className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    {metting?.icon && (
                      <metting.icon className={`h-5 w-5 ${ metting.textColor} mr-2`} />
                    )
                    }
                    {/* <type.icon className={`h-5 w-5 ${ getTextColorMeetingType(type.grupo)} mr-2`} /> */}
                    {/* <Presentation className={`h-5 w-5 text-emerald-500 mr-2`} /> */}
                    <span className="text-sm font-medium text-gray-700">{getMeetingName(type.grupo)}</span>
                  </div>
                  <div className="text-sm text-gray-600">{type.cantidad_reuniones} reuniones</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${metting?.color}`}
                      // className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${type.porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">{Math.round(type.porcentaje)}%</span>
                </div>
              </div>
              )
                  }
          )  
            }
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total de reuniones</span>
              <span className="font-semibold">{meetingTypes.reduce((acc, curr) => acc + curr.count, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingTypeStats;