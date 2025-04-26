
import { Meeting } from '@/types-db';
import { AttendanceBarChart } from '../charts/AttendanceBarChat';
import { groupMeetingsByCongregationAndType } from '@/utils/attendanceUtils';
import { getCongregationName, typeMeeting } from '@/lib/data';

interface CongregationAttendanceChartProps {
  meetings: Meeting[];
  timeRange: 'last-month' | 'last-6-months';
  title: string;
  className?: string;
}

export const CongregationAttendanceChart: React.FC<CongregationAttendanceChartProps> = ({ 
  meetings, 
  timeRange,
  title,
  className = '' 
}) => {
  // Group meetings by congregation and meeting type
  const data = groupMeetingsByCongregationAndType(meetings, timeRange);
  
  // Prepare data for the chart
  const congregations = data.map(item => getCongregationName(item.congregation));
  
  // Get all unique meeting types
  // const allMeetingTypes = new Set<string>();
  // data.forEach(congregation => {
  //   congregation.attendanceByType.forEach(type => {
  //     allMeetingTypes.add(type.meetingType);
  //   });
  // });
  
  // Convert to an array and sort alphabetically
  // const meetingTypes = Array.from(allMeetingTypes).sort();
  
  // Create a chart for each meeting type
  const charts = typeMeeting.map(meetingType => {
    const attended: number[] = [];
    const late: number[] = [];
    const absent: number[] = [];

    // console.log("data:", data)
    // For each congregation, find the data for this meeting type
    data.forEach(congregation => {
      const meetingData = congregation.attendanceByType.find(type => type.meetingType === meetingType.id);
      
      if (meetingData) {
        attended.push(meetingData.data.attended);
        late.push(meetingData.data.late);
        absent.push(meetingData.data.absent);
      } else {
        // If no data for this meeting type in this congregation, push zeros
        attended.push(0);
        late.push(0);
        absent.push(0);
      }
    });
    
    return (
      <AttendanceBarChart
        key={meetingType.id}
        // title={meetingType}
        title={meetingType.name}
        labels={congregations}
        attended={attended}
        late={late}
        absent={absent}
        className="mb-6"
      />
    );
  });

  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts}
      </div>
    </div>
  );
};