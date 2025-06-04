"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Heart, Calendar } from "lucide-react";
import Link from "next/link";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about");
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

  const values = [
    {
      icon: <BookOpen className="h-8 w-8 mb-4 text-primary" />,
      title: "Palabra de Dios",
      description: "Fundamentados en las enseñanzas bíblicas como guía para nuestra vida y comunidad."
    },
    {
      icon: <Users className="h-8 w-8 mb-4 text-primary" />,
      title: "Comunidad",
      description: "Creemos en el poder de la comunidad para sostenernos y crecer juntos en fe."
    },
    {
      icon: <Heart className="h-8 w-8 mb-4 text-primary" />,
      title: "Servicio",
      description: "Comprometidos a servir a nuestra comunidad y a aquellos en necesidad."
    },
    {
      icon: <Calendar className="h-8 w-8 mb-4 text-primary" />,
      title: "Adoración",
      description: "Celebramos la presencia de Dios a través de la música y la alabanza."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Misión</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Ir hacia todas las personas para enseñarles el Evangelio de Jesucristo y bautizarlas con agua y con el Espíritu Santo.
</p>
<p className="text-lg max-w-3xl mx-auto text-gray-700">
Ofrecer asistencia espiritual y cultivar una estrecha comunión en la cual cada uno experimente el amor de Dios y la alegría de servir a Él y a los demás.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <CardContent className="flex flex-col items-center text-center p-6">
                  {value.icon}
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="https://inaperu.org/wp-content/uploads/2020/04/ap-inicio.jpg"
                alt="Nuestra comunidad" 
                className="rounded-lg shadow-lg"
                
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-gray-700 mb-4">
              La historia de la Iglesia Nueva Apostólica (INA) se remonta a los movimientos revivalistas cristianos del siglo XIX. En el sur de Inglaterra y en Escocia, se encontraron cristianos de diferentes denominaciones porque compartían la esperanza de un obrar nuevo y fortalecido del Espíritu Santo.
              </p>
              <p className="text-gray-700 mb-6">
              Desde 1832, las profecías de personas con dones proféticos llevaron a que doce personalidades fuesen llamadas al ministerio de Apóstol. Estos Apóstoles dispensaron el don del Espíritu Santo a través de la imposición de manos para preparar a los creyentes para el inminente retorno de Cristo.
              </p>
              <Link href={"https://nak.org/es/iglesia/historia"} target="_blank">
              <Button size="lg">Nuestra Historia Completa</Button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}