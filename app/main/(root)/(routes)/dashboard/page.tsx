import DashboardClient from './_components/client';

const DashboardPage = () => {
 
  
//   if (loading) {
//     return (
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           <span className="ml-3 text-gray-600">Cargando datos...</span>
//         </div>
//     );
//   }
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        
        <DashboardClient />

        {/* <DashboardHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            title="Panel de Asistencias"
        />
        
        <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
        /> */}

      </div>
    </div>
    
      
  );
};
export default DashboardPage