"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white text-gray-800 shadow-md py-2"
          : "bg-transparent text-white py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            {isScrolled ? (
              <Image
                src="/img/logo.png"
                width={25}
                height={25}
                className="mr-2"
                alt="logo"
                style={{ filter: "brightness(0) invert(0)" }}
              />
            ) : (
              <Image
                src="/img/logo.png"
                width={25}
                height={25}
                className="mr-2"
                alt="logo"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            )}

            <span className="font-semibold text-xl">
              Iglesia Nueva Apostólica - SJL
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Nosotros
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>
            <button
              onClick={() => scrollToSection("locations")}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Sedes
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>

            <Button
              variant={isScrolled ? "default" : "outline"}
              className={cn(
                "transition-colors duration-300",
                isScrolled
                  ? "hover:scale-105"
                  : "border-white text-black hover:bg-white hover:text-gray-800 cursor-pointer"
              )}
              onClick={() => scrollToSection("contact")}
            >
              Acceder
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="p-2 -mr-2 transition-transform hover:scale-110"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[72px] bg-white/40 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out h-[calc(100vh-72px)] overflow-auto",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => scrollToSection("about")}
              className="py-3 text-gray-800 hover:text-primary transition-colors text-left text-lg font-medium active:scale-95"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("locations")}
              className="py-3 text-gray-800 hover:text-primary transition-colors text-left text-lg font-medium active:scale-95"
            >
              Sedes
            </button>
            <Button
              variant="default"
              size="lg"
              className="w-full text-lg mt-4 active:scale-95"
              onClick={() => {
                scrollToSection("contact");
                setIsOpen(false);
              }}
            >
              Acceder 2
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
