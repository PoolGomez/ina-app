import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image';
import Link from 'next/link'

export default function Home() {
  return (
    // min-h-screen
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4 py-16">
      
      <div className="flex flex-col items-center justify-center text-center">
        {/* <Church className="h-16 w-16 text-primary mb-6" /> */}
        <Image src={"/img/logo.png"} alt='imagen' className='' width={100} height={100} />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Iglesia Nueva Apostólica
        </h1>
        <p className="mt-6 text-4xl leading-8 text-gray-800 dark:text-gray-300">
          San Juan de Lurigancho
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Canto Grande 9</CardTitle>
              <CardDescription>Direccion Canto Grande</CardDescription>
            </CardHeader>
            <CardContent>
            <div className='space-y-4'>
            <Image src={"/img/img_01.png"} alt='imagen' width={300} height={300} />
              <Link href="/members/new">
                <Button variant="outline" className="w-full">Ver Ubicacion</Button>
              </Link>
            </div>
            
            </CardContent>
            
          </Card>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Huanta</CardTitle>
              <CardDescription>Direccion Huanta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
              <Image src={"/img/img_01.png"} alt='imagen' width={300} height={300} />
              <Link href="/members">
                <Button variant="outline" className="w-full">Ver Ubicacion</Button>
              </Link>
              </div>
              
            </CardContent>
          </Card>

          
        </div>

        <div className='flex p-4 items-center justify-end'>
          <Link href="/login">
          <Button>Acceso</Button>
          </Link>
          
        </div>

      </div>
    </div>
  </div>
  );
}
