"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact");
      if (!section) return;
      
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
              Estamos aquí para ti. No dudes en comunicarte con nosotros para cualquier información
              o si deseas unirte a nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Llámanos</h3>
                <p className="text-gray-600">+123 456 7890</p>
                <p className="text-gray-600">+123 456 7891</p>
              </CardContent>
            </Card>
            
            <Card className="text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Escríbenos</h3>
                <p className="text-gray-600">info@iglesiavida.org</p>
                <p className="text-gray-600">contacto@iglesiavida.org</p>
              </CardContent>
            </Card>
            
            <Card className="text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Horarios de Oficina</h3>
                <p className="text-gray-600">Lunes a Viernes</p>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </CardContent>
            </Card>
          </div> */}

          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-primary p-10 text-white">
                <h3 className="text-2xl font-bold mb-4">Acceso al Sistema</h3>
                <p className="mb-6">
                  Si eres miembro del equipo o tienes credenciales especiales, 
                  accede a nuestro sistema de administración.
                </p>
                <Link href={"/login"}>
                <Button className="bg-white text-primary hover:bg-gray-100 group cursor-pointer">
                  Ingresar al Sistema
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                </Link>
              </div>
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-bold mb-4">Participa en Nuestros Servicios</h3>
                <p className="text-gray-600 mb-4">
                  Te invitamos a ser parte de nuestra comunidad y participar en nuestros servicios semanales.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-3"></div>
                    <p className="font-medium">Domingo: 10:30 AM - Servicio Dominical</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-3"></div>
                    <p className="font-medium">Miércoles: 8:00 PM - Servicio Entresemana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}