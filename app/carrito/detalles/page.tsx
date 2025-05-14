"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"

export default function DetallesCarritoPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Productos hardcodeados para esta demo
  const [items] = useState([
    {
      id: 1,
      nombre: "Pizza peperoni extra grande",
      precio: 12.0,
      cantidad: 1,
      estado: "pendiente",
      imagen: "/placeholder.svg?key=s9tiv",
    },
    {
      id: 2,
      nombre: "Pizza peperoni extra grande",
      precio: 12.0,
      cantidad: 1,
      estado: "pendiente",
      imagen: "/placeholder.svg?key=siaku",
    },
  ])

  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  const handleConfirmarPedido = () => {
    toast({
      title: "Pedido confirmado",
      description: "Tu pedido ha sido confirmado y está en preparación",
    })
    router.push("/confirmar-pedido")
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-4 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-6">
          <div className="bg-red-500 text-white p-3 rounded-t-lg -mt-6 -mx-6 mb-4">
            <h1 className="text-xl font-bold text-center">Carrito</h1>
            <p className="text-center text-sm">Detalles del pedido</p>
            <p className="text-center text-sm italic">¡Gracias por preferirnos!</p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 border-b pb-3">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                  <Image src={item.imagen || "/placeholder.svg"} alt={item.nombre} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.nombre}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm">Precio:</p>
                    <p className="text-sm font-semibold">${item.precio.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Estado:</p>
                    <p className="text-sm bg-yellow-100 px-2 rounded text-yellow-800">{item.estado}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <p className="font-bold">Total:</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>

            <Button onClick={handleConfirmarPedido} className="w-full bg-red-500 hover:bg-red-600 text-white">
              Confirmar Pedido
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
