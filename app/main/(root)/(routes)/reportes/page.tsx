import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Heading } from '../../_components/heading'
import { BookOpenTextIcon } from 'lucide-react'

const ReportesPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        
        <div className="flex items-center justify-between">
          <div className="mr-3 bg-blue-100 p-2 rounded-lg">
            <BookOpenTextIcon className="h-6 w-6" />
          </div>
            <Heading title="Reportes" description="En contrucción" />

            
        </div>    
        <Separator />

      </div>
    </div>
  )
}

export default ReportesPage
