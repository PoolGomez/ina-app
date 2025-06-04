import { Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center" >
              <Image src="/img/logo.png" width={25} height={25} className="mr-2" alt="logo"/>
              {/* <img src="/img/logo.png" width={25} className="mr-2" /> */}
              Iglesia Nueva Apostólica</h3>
            <p className="mb-4 text-gray-300">
              Un lugar de esperanza, fe y comunidad para todas las familias.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100064293175198" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">Acerca de Nosotros</a>
              </li>
              <li>
                <a href="#locations" className="text-gray-300 hover:text-white transition-colors">Nuestras Sedes</a>
              </li>
              
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Ministerios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Niños</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Jóvenes</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Adultos</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Familias</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Misiones</a>
              </li>
            </ul>
          </div> */}
          
          {/* <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Av. Principal 1234</p>
              <p className="mb-2">Ciudad Capital</p>
              <p className="mb-2">info@iglesiavida.org</p>
              <p className="mb-2">+123 456 7890</p>
            </address>
          </div> */}
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Iglesia Nueva Apostólica. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}