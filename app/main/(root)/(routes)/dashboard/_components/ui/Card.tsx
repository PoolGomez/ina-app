import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue,
  className = '' 
}) => {
  let trendColor = 'text-gray-500';
  let trendIcon = null;
  
  if (trend === 'up') {
    trendColor = 'text-green-500';
    trendIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  } else if (trend === 'down') {
    trendColor = 'text-red-500';
    trendIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  
  return (
    <Card className={`h-full ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {icon && <div className="text-blue-500">{icon}</div>}
        </div>
        <div className="flex-grow">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        {trend && trendValue && (
          <div className={`flex items-center mt-2 ${trendColor}`}>
            {trendIcon}
            <span className="text-sm ml-1">{trendValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
};