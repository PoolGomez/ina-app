
import { FilterOptions } from '@/types-db';
import { Select } from '../ui/Select';
import { ChartNoAxesCombined } from 'lucide-react';
import { congregaciones, typeMeeting } from '@/lib/data';
import { Heading } from '@/app/main/(root)/_components/heading';

interface DashboardHeaderProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  // congregations: string[];
  // meetingTypes: string[];
  title: string;
  description: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  filters,
  onFilterChange,
  // congregations,
  // meetingTypes,
  title,
  description
}) => {
  const handleTimeRangeChange = (value: string) => {
    if (value === 'last-month' || value === 'last-6-months') {
      onFilterChange({ timeRange: value });
    }
  };

  const handleCongregationChange = (value: string) => {
    onFilterChange({ congregation: value || null });
  };

  const handleMeetingTypeChange = (value: string) => {
    onFilterChange({ meetingType: value || null });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center">
          <div className="mr-3 bg-blue-100 p-2 rounded-lg">
            <ChartNoAxesCombined className="h-6 w-6" />
          </div>
          {/* <h1 className="text-2xl font-bold text-gray-800">{title}</h1> */}
          <Heading title={title} description={description} />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          <Select
            label="Periodo"
            options={[
              { value: 'last-month', label: 'Último Mes' },
              { value: 'last-6-months', label: 'Últimos 6 Meses' }
            ]}
            value={filters.timeRange}
            onChange={handleTimeRangeChange}
            className="w-48"
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <Select
          // options={congregations.map(cong => ({ value: cong, label: cong }))}
          options={congregaciones.map(cong => ({ value: cong.id, label: cong.name }))}
          
          value={filters.congregation || ''}
          onChange={handleCongregationChange}
          placeholder="Todas las congregaciones"
          className="w-full sm:w-64"
        />
        
        <Select
          // options={meetingTypes.map(type => ({ value: type, label: type }))}
          options={typeMeeting.map(type => ({ value: type.id, label: type.name }))}
          value={filters.meetingType || ''}
          onChange={handleMeetingTypeChange}
          placeholder="Todos los tipos de reunión"
          className="w-full sm:w-64"
        />
      </div>
    </div>
  );
};