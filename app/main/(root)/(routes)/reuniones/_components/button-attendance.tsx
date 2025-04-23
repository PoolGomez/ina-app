import { AsistenciaDetalle } from "@/types-db";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const AttendanceButton = ({ 
    status, 
    selected, 
    onClick 
  }: { 
    status: AsistenciaDetalle['valor'], 
    selected: boolean, 
    onClick: () => void 
  }) => {
    const styles = {
      A: {
        base: 'border-green-200 text-green-600',
        selected: 'bg-green-100',
        unselected: 'bg-white hover:bg-green-50'
      },
      T: {
        base: 'border-yellow-200 text-yellow-600',
        selected: 'bg-yellow-100',
        unselected: 'bg-white hover:bg-yellow-50'
      },
      F: {
        base: 'border-red-200 text-red-600',
        selected: 'bg-red-100',
        unselected: 'bg-white hover:bg-red-50'
      }
    };

    const icons = {
      A: <CheckCircle2 className="h-5 w-5" />,
      T: <Clock className="h-5 w-5" />,
      F: <XCircle className="h-5 w-5" />
    };

    // const labels = {
    //   present: 'Presente',
    //   late: 'Tarde',
    //   absent: 'Ausente'
    // };

    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors
          ${styles[status].base}
          ${selected ? styles[status].selected : styles[status].unselected}
        `}
      >
        {icons[status]}
        {/* {labels[status]} */}
      </button>
    );
  };