"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"

export default function EstadoPedidoPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  // Datos hardcodeados para esta demo
  const pedidoDemo = {
    id: params.id,
    nombre: "Jesús García",
    producto: {
      id: 1,
      nombre: "Pizza Peperoni extra grande",
      precio: 24.0,
      imagen: "/placeholder.svg?key=ycx31",
    },
    cantidad: 2,
    total: 24.0,
    metodoPago: "efectivo",
    lugar: "Universidad Don Bosco",
    estado: "en preparación",
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // En un caso real, obtendríamos los datos de la API
        // const data = await getOrderById(params.id as string);
        // setOrder(data);

        // Para esta demo, usamos datos hardcodeados
        setTimeout(() => {
          setOrder(pedidoDemo)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la información del pedido",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4 text-center">
          <p>Cargando información del pedido...</p>
        </div>
      </>
    )
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4 text-center">
          <p>No se encontró el pedido</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-400 text-center py-2 rounded-md mb-4">
            <h1 className="text-xl font-bold">Detalles del pedido</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center space-y-2 border-r pr-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <Image src="/abstract-geometric-shapes.png" alt="Usuario" width={40} height={40} />
                  </div>
                  <p className="text-sm font-medium">Datos del cliente</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" value={order.nombre} readOnly />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image
                        src={order.producto.imagen || "/placeholder.svg"}
                        alt={order.producto.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold">{order.producto.nombre}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cantidad">Cantidad</Label>
                      <Input id="cantidad" value={order.cantidad} readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total">Total a pagar: $</Label>
                      <Input id="total" value={order.total.toFixed(2)} readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metodoPago">Método de pago:</Label>
                      <Input id="metodoPago" value={order.metodoPago} readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lugar">Lugar</Label>
                      <Input id="lugar" value={order.lugar} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado de la orden:</Label>
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-center">{order.estado}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
