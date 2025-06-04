"use client";

import { ArrowDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home">
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      </div>
      
      <div className={`z-10 text-center px-6 transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Iglesia Nueva Apostólica</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">San Juan de Lurigancho</h2>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
          Un lugar de esperanza, fe y comunidad para todas las familias
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-gray-800 hover:bg-gray-200"
            onClick={scrollToAbout}
          >
            Conocer más
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-black hover:bg-white hover:text-gray-800"
            onClick={scrollToContact}
          >
            Horarios de Servicios
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-white p-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
        >
          <ArrowDownIcon className="h-6 w-6" />
        </button>
      </div>
    </div>

    </section>
  );
}