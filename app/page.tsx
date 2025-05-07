"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link'

export default function Home() {
//   const handle = () => {
//     window.open("https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=2M8VzYwehslqmgbRof3jfg&cb_client=search.gws-prod.gps&yaw=53.97377&pitch=0&thumbfov=100&w=64&h=64")
// }
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
              <CardDescription>MZ M 98 LT 2 Huascar Grupo 13 Sector B <br/> San Juan de Lurigancho</CardDescription>
            </CardHeader>
            <CardContent>
            <div className='space-y-4'>
            <Image src={"/img/ctogrande.png"} alt='imagen' width={300} height={300} />
            <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Ver Ubicación</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='flex items-center justify-center'>CONGREGACIÓN CANTO GRANDE 9 
                      {/* <Share2 className='ml-4' onClick={handle} />  */}
                    </DialogTitle>
                    <DialogDescription className='text-center'>
                      MZ M 98 LT 2 Huascar Grupo 13 Sector B <br/> San Juan de Lurigancho
                    </DialogDescription>
                    <div className='flex items-center justify-center'>
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.8071858234923!2d-77.00248205393227!3d-11.958658605888166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5bb3a65ed41%3A0xaa53f373fcbac79b!2sIglesia%20Nueva%20Apost%C3%B3lica!5e0!3m2!1ses-419!2spe!4v1746578241985!5m2!1ses-419!2spe" 
                        width="400" 
                        height="300" 
                        // style="border:0;" 
                        // allowfullscreen="" 
                        className='w-full'
                        loading="lazy" 
                        // referrerpolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                        </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

            </div>
            
            </CardContent>
            
          </Card>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Huanta</CardTitle>
              <CardDescription>Av Santa Rosa de Lima 1137 <br/> San Juan de Lurigancho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
              <Image src={"/img/huanta.png"} alt='imagen' width={300} height={300} />

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Ver Ubicación</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='flex items-center justify-center'>CONGREGACIÓN HUANTA 
                      {/* <Share2 className='ml-4' onClick={handle} />  */}
                    </DialogTitle>
                    <DialogDescription className='text-center'>
                    Av Santa Rosa de Lima 1137 <br/> San Juan de Lurigancho
                    </DialogDescription>
                    <div className='flex items-center justify-center'>
                    
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d614.6529612551542!2d-76.99623011959403!3d-11.988129000954647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c570d707f02b%3A0x746481f836cf26c8!2sIglesia%20Nueva%20Apost%C3%B3lica!5e0!3m2!1ses-419!2spe!4v1746581458535!5m2!1ses-419!2spe" 
                        width="400" 
                        height="300" 
                        // style="border:0;" 
                        // allowfullscreen="" 
                        className='w-full'
                        loading="lazy" 
                        // referrerpolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                        </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              </div>
              
            </CardContent>
          </Card>

          
        </div>

        
        

        <div className='flex mt-12 items-center justify-end'>
          <Link href="/login">
          <Button>Acceso</Button>
          </Link>
          
        </div>

      </div>
    </div>
  </div>
  );
}
