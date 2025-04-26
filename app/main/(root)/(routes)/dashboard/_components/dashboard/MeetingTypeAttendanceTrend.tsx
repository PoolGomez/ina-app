
import { AttendanceLineChart } from '../charts/AttendanceLineChart';
import { Meeting } from '@/types-db';
import { getAttendanceTrendData } from '@/utils/attendanceUtils';

interface MeetingTypeAttendanceTrendProps {
  meetings: Meeting[];
  timeRange: 'last-month' | 'last-6-months';
  congregationFilter?: string;
  meetingTypeFilter?: string;
  title: string;
  className?: string;
}

export const MeetingTypeAttendanceTrend: React.FC<MeetingTypeAttendanceTrendProps> = ({
  meetings,
  timeRange,
  congregationFilter,
  meetingTypeFilter,
  title,
  className = ''
}) => {
  // Get trend data for the specified filters
  const trendData = getAttendanceTrendData(
    meetings,
    timeRange,
    congregationFilter,
    meetingTypeFilter
  );

  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <AttendanceLineChart
        title="Tendencia de Asistencia por Mes"
        labels={trendData.labels}
        datasets={trendData.datasets}
      />
    </div>
  );
};