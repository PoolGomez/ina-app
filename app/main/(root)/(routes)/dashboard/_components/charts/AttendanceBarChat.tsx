import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Card } from '../ui/Card';


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceBarChartProps {
  title: string;
  labels: string[];
  attended: number[];
  late: number[];
  absent: number[];
  className?: string;
  stacked?: boolean;
}

export const AttendanceBarChart: React.FC<AttendanceBarChartProps> = ({
  title,
  labels,
  attended,
  late,
  absent,
  className = '',
  stacked = false
}) => {
  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        stacked: stacked,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Asistieron',
        data: attended,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      },
      {
        label: 'Tarde',
        data: late,
        backgroundColor: 'rgba(251, 191, 36, 0.6)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 1
      },
      {
        label: 'Faltaron',
        data: absent,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Card title={title} className={className}>
      <div className="h-72">
        <Bar options={options} data={data} />
      </div>
    </Card>
  );
};