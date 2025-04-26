import { Meeting, AsistenciaDetalle, AttendanceCount, CongregationAttendance, AttendanceByMeetingType } from '@/types-db';

import { isDateInRange, getMonthFromDate, formatDate } from './dateUtils';

/**
 * Calculate attendance statistics from meeting details
 */
export const calculateAttendance = (details: AsistenciaDetalle[]): AttendanceCount => {
  const attended = details.filter(detail => detail.valor === 'A').length;
  const late = details.filter(detail => detail.valor === 'T').length;
  const absent = details.filter(detail => detail.valor === 'F').length;
  
  return {
    attended,
    late,
    absent,
    total: details.length
  };
};

/**
 * Group meetings by congregation and meeting type
 */
export const groupMeetingsByCongregationAndType = (
  meetings: Meeting[],
  timeRange: 'last-month' | 'last-6-months'
): CongregationAttendance[] => {
  // Filter meetings by time range
  const filteredMeetings = meetings.filter(meeting => isDateInRange(meeting.fecha, timeRange));
  
  // Group by congregation
  const congregationMap = new Map<string, Map<string, AsistenciaDetalle[]>>();
  
  for (const meeting of filteredMeetings) {
    if (!congregationMap.has(meeting.congregacion)) {
      congregationMap.set(meeting.congregacion, new Map());
    }
    
    const congregationData = congregationMap.get(meeting.congregacion)!;
    
    if (!congregationData.has(meeting.grupo)) {
      congregationData.set(meeting.grupo, []);
    }
    
    congregationData.get(meeting.grupo)!.push(...meeting.detalle);
  }
  
  // Convert to the expected format
  const result: CongregationAttendance[] = [];
  
  for (const [congregation, meetingTypeMap] of congregationMap.entries()) {
    const attendanceByType: AttendanceByMeetingType[] = [];
    
    for (const [meetingType, details] of meetingTypeMap.entries()) {
      attendanceByType.push({
        meetingType,
        data: calculateAttendance(details)
      });
    }
    
    result.push({
      congregation,
      attendanceByType
    });
  }
  
  return result;
};

/**
 * Get attendance trend data (for line charts)
 */
export const getAttendanceTrendData = (
  meetings: Meeting[],
  timeRange: 'last-month' | 'last-6-months',
  congregationFilter?: string,
  meetingTypeFilter?: string
) => {
  // Filter meetings by time range and other filters
  let filteredMeetings = meetings.filter(meeting => isDateInRange(meeting.fecha, timeRange));
  
  if (congregationFilter) {
    filteredMeetings = filteredMeetings.filter(m => m.congregacion === congregationFilter);
  }
  
  if (meetingTypeFilter) {
    filteredMeetings = filteredMeetings.filter(m => m.grupo === meetingTypeFilter);
  }

  // Sort meetings by date
  filteredMeetings.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  let labels: string[];
  let groupedMeetings: Map<string, Meeting[]>;

  if (timeRange === 'last-month') {
    // Group by day for last month view
    groupedMeetings = new Map();
    filteredMeetings.forEach(meeting => {
      const dayNumber = formatDate(meeting.fecha, 'dd');
      if (!groupedMeetings.has(dayNumber)) {
        groupedMeetings.set(dayNumber, []);
      }
      groupedMeetings.get(dayNumber)!.push(meeting);
    });

    // Get all days in the month and sort them
    labels = Array.from(groupedMeetings.keys()).sort((a, b) => parseInt(a) - parseInt(b));
  } else {
    // Group by month for 6-month view
    groupedMeetings = new Map();
    filteredMeetings.forEach(meeting => {
      const month = getMonthFromDate(meeting.fecha);
      if (!groupedMeetings.has(month)) {
        groupedMeetings.set(month, []);
      }
      groupedMeetings.get(month)!.push(meeting);
    });

    // Sort months chronologically
    labels = Array.from(groupedMeetings.keys()).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
  }

  // Calculate attendance for each period
  const attendedData: number[] = [];
  const lateData: number[] = [];
  const absentData: number[] = [];

  labels.forEach(label => {
    const periodMeetings = groupedMeetings.get(label) || [];
    const allDetails = periodMeetings.flatMap(m => m.detalle);
    const stats = calculateAttendance(allDetails);

    attendedData.push(stats.attended);
    lateData.push(stats.late);
    absentData.push(stats.absent);
  });

  return {
    labels,
    datasets: [
      {
        label: 'Asistieron',
        data: attendedData,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
      },
      {
        label: 'Tarde',
        data: lateData,
        backgroundColor: 'rgba(251, 191, 36, 0.6)',
        borderColor: 'rgb(251, 191, 36)',
      },
      {
        label: 'Faltaron',
        data: absentData,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
      }
    ]
  };
};

/**
 * Get unique congregation names from meetings
 */
export const getUniqueCongregations = (meetings: Meeting[]): string[] => {
  const congregations = new Set<string>();
  
  for (const meeting of meetings) {
    congregations.add(meeting.congregacion);
  }
  
  return Array.from(congregations).sort();
};

/**
 * Get unique meeting types from meetings
 */
export const getUniqueMeetingTypes = (meetings: Meeting[]): string[] => {
  const meetingTypes = new Set<string>();
  
  for (const meeting of meetings) {
    meetingTypes.add(meeting.grupo);
  }
  
  return Array.from(meetingTypes).sort();
};

/**
 * Calculate overall attendance percentage
 */
export const calculateAttendancePercentage = (attendance: AttendanceCount): number => {
  if (attendance.total === 0) return 0;
  return ((attendance.attended + attendance.late) / attendance.total) * 100;
};