"use client"
// import { BarChart3 } from "lucide-react"
// import { Member } from "@/types-db"
// import { Heading } from "../../../_components/heading"
// import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "./dashboard/DashboardHeader"
import { Tabs } from "./ui/Tabs"
import { useEffect, useState } from "react"
import { FilterOptions, Meeting } from "@/types-db"
import { GetMeetingsAction } from "@/actions/meeting-action"
import { AttendanceSummaryStats } from "./dashboard/AttendanceSummaryStats"
import { MeetingTypeAttendanceTrend } from "./dashboard/MeetingTypeAttendanceTrend"
import { RecentMeetingsCard } from "./dashboard/RecentMeetingsCard"
import { CongregationAttendanceChart } from "./dashboard/CongregationAttendanceChart"

// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
// import { UserPlus2 } from "lucide-react"
// import { useIsMobile } from "@/hooks/use-mobile"



const DashboardClient = () => {
      const [meetings, setMeetings] = useState<Meeting[]>([]);
      const [loading, setLoading] = useState(true);
      const [activeTab, setActiveTab] = useState('month');
      const [filters, setFilters] = useState<FilterOptions>({
        timeRange: 'last-month',
        congregation: null,
        meetingType: null
      });
      
      useEffect(() => {
        const loadData = async () => {
          setLoading(true);
          try {
            const meetingsData = await GetMeetingsAction();
            
            setMeetings(meetingsData);
          } catch (error) {
            console.error('Error loading data:', error);
          } finally {
            setLoading(false);
          }
        };
        
        loadData();
      }, []);
      
      const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
        setFilters(prev => {
          const updated = { ...prev, ...newFilters };
          
          // Update the active tab when timeRange changes
          if (newFilters.timeRange) {
            setActiveTab(newFilters.timeRange === 'last-month' ? 'month' : 'sixMonths');
          }
          
          return updated;
        });
      };
      
      const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Update the timeRange filter when tab changes
        setFilters(prev => ({
          ...prev,
          timeRange: tabId === 'month' ? 'last-month' : 'last-6-months'
        }));
      };
      
      
      const tabs = [
        {
          id: 'month',
          label: 'Último Mes',
          content: (
            <>
              <AttendanceSummaryStats meetings={meetings} timeRange="last-month" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <MeetingTypeAttendanceTrend
                    meetings={meetings}
                    timeRange="last-month"
                    congregationFilter={filters.congregation || ""}
                    meetingTypeFilter={filters.meetingType || ""}
                    title="Tendencia de Asistencia"
                  />
                </div>
                <div>
                  <RecentMeetingsCard meetings={meetings} />
                </div>
              </div>
              
              <CongregationAttendanceChart
                meetings={meetings}
                timeRange="last-month"
                title="Asistencias por Tipo de Reunión de cada Congregación"
              />
            </>
          )
        },
        {
          id: 'sixMonths',
          label: 'Últimos 6 Meses',
          content: (
            <>
              <AttendanceSummaryStats meetings={meetings} timeRange="last-6-months" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <MeetingTypeAttendanceTrend
                    meetings={meetings}
                    timeRange="last-6-months"
                    congregationFilter={filters.congregation ||""}
                    meetingTypeFilter={filters.meetingType || ""}
                    title="Tendencia de Asistencia (Últimos 6 Meses)"
                  />
                </div>
                <div>
                  <RecentMeetingsCard meetings={meetings} />
                </div>
              </div>
              
              <CongregationAttendanceChart
                meetings={meetings}
                timeRange="last-6-months"
                title="Asistencias por Tipo de Reunión de cada Congregación (Últimos 6 Meses)"
              />
            </>
          )
        }
      ];

        if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Cargando datos...</span>
        </div>
    );
  }

    return(
        <>
        {/* <div className="flex items-center justify-between">
            <Heading title="Estadísticas" description="Panel de Asistencias" />
        </div>    
        <Separator /> */}

        <DashboardHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            title="Estadísticas"
            description="Panel de Asistencias"
        />
        
        <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
        />

        {/* <TableMembers data={data} /> */}
        </>
    )
}
export default DashboardClient