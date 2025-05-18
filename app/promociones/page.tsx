"use client"

import React from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const PROMOS = [
  {
    id: 1,
    nombre: "Lasaña de pollo",
    precio: 3.75,
    imagenes: ["/lasaña.jpg"],
  },
  {
    id: 2,
    nombre: "Pizza 4 Estaciones",
    precio: 14.5,
    imagenes: ["/4estaciones.jpg"],
  },
  {
    id: 3,
    nombre: "Pizza 20 porciones",
    precio: 13.5,
    imagenes: ["/20Porciones.jpg"],
  },
  {
    id: 4,
    nombre: "Papas fritas",
    precio: 1.25,
    imagenes: ["/papas.jpg"],
  },
  {
    id: 5,
    nombre: "Pizza Grande",
    precio: 8,
    imagenes: ["/pizzaGrande.jpg"],
  },
  {
    id: 6,
    nombre: "Pizza de Queso",
    precio: 8.5,
    imagenes: ["/pizzaQueso.jpg"],
  },
]

export default function PromocionesPage() {
  const { addItem } = useCart()

  const handleAddToCart = (promo: { id: any; nombre: any; precio: any; imagenes: any }) => {
    addItem({
      id: promo.id,
      nombre: promo.nombre,
      precio: promo.precio,
      cantidad: 1,
      imagen: promo.imagenes[0],
    })
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8 text-red-600">Promociones</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROMOS.map((promo) => (
            <div key={promo.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="flex space-x-2 mb-4">
                {promo.imagenes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={promo.nombre}
                    className="h-24 w-24 object-cover rounded"
                  />
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">{promo.nombre}</h2>
              <span className="font-bold text-red-500 text-lg mb-4">${promo.precio}</span>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full mt-auto"
                onClick={() => handleAddToCart(promo)}
              >
                Agregar al carrito
              </Button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}