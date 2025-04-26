import React from 'react';

import { Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';


import { isDateInRange } from '@/utils/dateUtils';
import { calculateAttendance } from '@/utils/attendanceUtils';
import { StatCard } from '../ui/Card';
import { Meeting } from '@/types-db';


interface AttendanceSummaryStatsProps {
  meetings: Meeting[];
  timeRange: 'last-month' | 'last-6-months';
}

export const AttendanceSummaryStats: React.FC<AttendanceSummaryStatsProps> = ({ 
  meetings, 
  timeRange 
}) => {
  // Filter meetings by time range
  const filteredMeetings = meetings.filter(meeting => 
    isDateInRange(meeting.fecha, timeRange)
  );
  
  // Calculate overall statistics
  const allDetails = filteredMeetings.flatMap(meeting => meeting.detalle);
  const stats = calculateAttendance(allDetails);
  
  // Calculate percentages
  const attendedPercent = stats.total > 0 
    ? Math.round((stats.attended / stats.total) * 100) 
    : 0;
  
  const latePercent = stats.total > 0 
    ? Math.round((stats.late / stats.total) * 100) 
    : 0;
  
  const absentPercent = stats.total > 0 
    ? Math.round((stats.absent / stats.total) * 100) 
    : 0;
  
  const totalMeetings = filteredMeetings.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Reuniones"
        value={totalMeetings}
        description={timeRange === 'last-month' ? 'En el último mes' : 'En los últimos 6 meses'}
        icon={<Users size={20} />}
      />
      
      <StatCard
        title="Asistencia"
        value={`${attendedPercent}%`}
        description={`${stats.attended} asistieron de ${stats.total}`}
        icon={<CheckCircle size={20} />}
        trend="up"
        trendValue={`${stats.attended} miembros`}
        className="border-l-4 border-green-500"
      />
      
      <StatCard
        title="Llegadas Tarde"
        value={`${latePercent}%`}
        description={`${stats.late} llegaron tarde de ${stats.total}`}
        icon={<Clock size={20} />}
        trend="neutral"
        trendValue={`${stats.late} miembros`}
        className="border-l-4 border-yellow-500"
      />
      
      <StatCard
        title="Ausencias"
        value={`${absentPercent}%`}
        description={`${stats.absent} faltaron de ${stats.total}`}
        icon={<AlertCircle size={20} />}
        trend="down"
        trendValue={`${stats.absent} miembros`}
        className="border-l-4 border-red-500"
      />
    </div>
  );
};