"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "COMBO FAMILIAR",
    price: "$12",
    image: "/familiar-pizza-combo.png",
  },
  {
    id: 2,
    title: "Allan Pizza",
    description: "Las mejores pizzas de la ciudad",
    image: "/pizzeria-logo-black-background.png",
  },
  {
    id: 3,
    title: "FLAUTA",
    description: "QUESO, CHAMPIÑONES Y POLLO",
    price: "$4.00",
    image: "/pizza-flute-cheese-mushrooms.png",
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" priority />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
              {banner.description && <p className="text-xl mb-4">{banner.description}</p>}
              {banner.price && <span className="text-3xl font-bold">{banner.price}</span>}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-red-500" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
