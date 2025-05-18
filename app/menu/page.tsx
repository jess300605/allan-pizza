"use client"

import React from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

const MENUS = [
  {
    id: 1,
    nombre: "Pizza Margarita + Coca-cola",
    precio: 14,
    imagenes: ["/pizzaMargarita.jpg", "/coca.jpg"],
  },
  {
    id: 2,
    nombre: "Pizza Pepperoni + Frozen",
    precio: 12,
    imagenes: ["/pizzaPeperoni.jpg", "/frozen.jpg"],
  },
  {
    id: 3,
    nombre: "Pizza Hawaiana + Refresco",
    precio: 13,
    imagenes: ["/pizzaHawaiana.jpg", "/refresco.jpg"],
  },
]

export default function MenuPage() {
  const { addItem } = useCart()

  const handleAddToCart = (menu: { id: any; nombre: any; precio: any; imagenes: any }) => {
    addItem({
      id: menu.id,
      nombre: menu.nombre,
      precio: menu.precio,
      cantidad: 1,
      imagen: menu.imagenes[0],
    })
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8 text-red-600">Menús disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MENUS.map((menu) => (
            <div key={menu.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="flex space-x-2 mb-4">
                {menu.imagenes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={menu.nombre}
                    className="h-24 w-24 object-cover rounded"
                  />
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">{menu.nombre}</h2>
              <span className="font-bold text-red-500 text-lg mb-4">${menu.precio}</span>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full mt-auto"
                onClick={() => handleAddToCart(menu)}
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

