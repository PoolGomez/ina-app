import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <Image src={"/img/logo.png"} alt='imagen' className='' width={100} height={100} />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Iglesia Nueva Apostólica
        </h1>
        <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
          Sistema de Gestión de Membresía
        </p>
        
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <Card>
            <CardHeader>
              <CardTitle>Directorio</CardTitle>
              <CardDescription>Ver y gestionar todos los miembros</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/main/miembros">
                <Button variant="outline" className="w-full cursor-pointer">Ver Miembros</Button>
              </Link>
            </CardContent>
            {/* <CardFooter>
            <Link href="/members">
                <Button variant="outline" className="w-full">Ver Miembros</Button>
              </Link>
            </CardFooter> */}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reuniones</CardTitle>
              <CardDescription>Ver y gestionar reuniones con sus asistencias</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/main/reuniones">
                <Button className="w-full cursor-pointer">Nuevo Registro</Button>
              </Link>
            </CardContent>
            {/* <CardFooter>
            <Link href="/members/new">
                <Button className="w-full">Nuevo Registro</Button>
              </Link>
            </CardFooter> */}
          </Card>

          

          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Generar informes y estadísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/main/reportes">
                <Button variant="outline" className="w-full cursor-pointer">Ver Reportes</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainPage
