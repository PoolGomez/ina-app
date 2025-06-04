"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import Image from "next/image";

const churchLocations = [
  {
    id: "sede-huanta",
    name: "Huanta",
    address: "Av Santa Rosa de Lima 1137 - San Juan de Lurigancho",
    image: "/img/huanta.png",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d614.6529612551542!2d-76.99623011959403!3d-11.988129000954647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c570d707f02b%3A0x746481f836cf26c8!2sIglesia%20Nueva%20Apost%C3%B3lica!5e0!3m2!1ses-419!2spe!4v1746581458535!5m2!1ses-419!2spe",
    // serviceHours: "Domingos: 10:30 AM | Miércoles: 8:00 PM",
    // phone: ""
  },
  {
    id: "sede-ctogrande",
    name: "Canto Grande",
    address: "MZ M 98 LT 2 Huascar Grupo 13 Sector B - San Juan de Lurigancho",
    image: "/img/ctogrande.png",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.8071858234923!2d-77.00248205393227!3d-11.958658605888166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5bb3a65ed41%3A0xaa53f373fcbac79b!2sIglesia%20Nueva%20Apost%C3%B3lica!5e0!3m2!1ses-419!2spe!4v1746578241985!5m2!1ses-419!2spe",
    // serviceHours: "Domingos: 10:30 AM | Miércoles: 8:00 PM",
    // phone: ""
  }
];

export default function Locations() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("sede-huanta");

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("locations");
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
    <section id="locations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Sedes</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
              Contamos con múltiples sedes para servir mejor a nuestra comunidad. 
              Cada ubicación ofrece servicios regulares y programas especiales.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
                {churchLocations.map((location) => (
                  <TabsTrigger
                    key={location.id} 
                    value={location.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-full border-1 border-primary"
                  >

                    {location.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {churchLocations.map((location) => (
              <TabsContent key={location.id} value={location.id} className="animate-in fade-in-50 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <Card className="overflow-hidden shadow-lg">
                    <div className="h-64 relative overflow-hidden">
                      <Image 
                        src={location.image} 
                        alt={location.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        fill
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>Sede {location.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{location.address}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src={location.mapUrl} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa de ${location.name}`}
                    ></iframe>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}