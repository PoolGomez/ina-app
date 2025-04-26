import React from 'react';
// import { Meeting } from '../../types';
import { Users, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
// import { formatDate } from '../../utils/dateUtils';
import { calculateAttendance } from '@/utils/attendanceUtils';
import { Meeting } from '@/types-db';
import { formatDate } from '@/utils/dateUtils';
import { getCongregationName } from '@/lib/data';
// import { calculateAttendance } from '../../utils/attendanceUtils';

interface RecentMeetingsCardProps {
  meetings: Meeting[];
  className?: string;
}

export const RecentMeetingsCard: React.FC<RecentMeetingsCardProps> = ({ meetings, className = '' }) => {
  // Sort meetings by date (newest first)
  const sortedMeetings = [...meetings].sort((a, b) => {
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });

  // Take only the first 5 meetings
  const recentMeetings = sortedMeetings.slice(0, 5);

  return (
    <Card title="Últimas Reuniones" className={className}>
      <div className="divide-y divide-gray-200">
        {recentMeetings.length > 0 ? (
          recentMeetings.map(meeting => {
            const attendance = calculateAttendance(meeting.detalle);
            const attendancePercentage = attendance.total > 0
              ? Math.round(((attendance.attended + attendance.late) / attendance.total) * 100)
              : 0;

            return (
              <div key={meeting.id} className="py-3 flex flex-col space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{meeting.nombre}</h4>
                    <p className="text-sm text-gray-500">{getCongregationName(meeting.congregacion)}</p>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {attendancePercentage}% asistencia
                  </div>
                </div>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(meeting.fecha)}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {attendance.total} miembros
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-6 text-center text-gray-500">
            No hay reuniones recientes
          </div>
        )}
      </div>
    </Card>
  );
};