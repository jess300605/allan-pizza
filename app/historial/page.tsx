"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"
import { useAuth } from "@/context/auth-context"
import { formatCurrency } from "@/lib/utils"

type HistorialPedido = {
  id: number
  fecha: string
  productos: {
    nombre: string
    cantidad: number
    precio: number
  }[]
  total: number
}

export default function HistorialPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [pedidos, setPedidos] = useState<Record<string, HistorialPedido[]>>({})

  // Datos hardcodeados para esta demo
  const pedidosDemo: Record<string, HistorialPedido[]> = {
    "martes, 11 de marzo de 2025": [
      {
        id: 1,
        fecha: "2025-03-11",
        productos: [
          {
            nombre: "Pizza Peperoni extra grande",
            cantidad: 2,
            precio: 12.0,
          },
        ],
        total: 24.0,
      },
      {
        id: 2,
        fecha: "2025-03-11",
        productos: [
          {
            nombre: "Pizza Hawaina extra grande",
            cantidad: 1,
            precio: 13.0,
          },
        ],
        total: 13.0,
      },
    ],
    "sábado, 15 de marzo de 2025": [
      {
        id: 3,
        fecha: "2025-03-15",
        productos: [
          {
            nombre: "Pizza Peperoni extra grande",
            cantidad: 2,
            precio: 12.0,
          },
        ],
        total: 24.0,
      },
    ],
  }

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // En un caso real, obtendríamos los datos de la API
        // if (user) {
        //   const data = await getOrdersByUser(user.id);
        //   // Agrupar por fecha
        //   const groupedByDate = data.reduce((acc, pedido) => {
        //     const date = new Date(pedido.fecha).toLocaleDateString('es-ES', {
        //       weekday: 'long',
        //       year: 'numeric',
        //       month: 'long',
        //       day: 'numeric'
        //     });
        //     if (!acc[date]) acc[date] = [];
        //     acc[date].push(pedido);
        //     return acc;
        //   }, {});
        //   setPedidos(groupedByDate);
        // }

        // Para esta demo, usamos datos hardcodeados
        setTimeout(() => {
          setPedidos(pedidosDemo)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el historial de pedidos",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchPedidos()
  }, [user, toast])

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4 text-center">
          <p>Cargando historial de pedidos...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 text-white text-center py-3 rounded-md mb-4">
            <h1 className="text-xl font-bold">Historial de pedidos</h1>
          </div>

          <div className="space-y-6">
            {Object.entries(pedidos).map(([fecha, pedidosDia]) => (
              <div key={fecha} className="space-y-3">
                <h2 className="bg-gray-200 px-4 py-2 rounded-md text-gray-700">{fecha}</h2>

                <div className="space-y-3">
                  {pedidosDia.map((pedido) => (
                    <Link key={pedido.id} href={`/estado-pedido/${pedido.id}`} className="block">
                      <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pedido.productos.map((producto, idx) => (
                            <div key={idx} className="border border-red-200 rounded-md p-3 bg-white">
                              <h3 className="font-semibold text-red-600">{producto.nombre}</h3>
                              <p className="text-sm">Cantidad: {producto.cantidad}</p>
                              <p className="text-sm font-medium">
                                Total: {formatCurrency(producto.precio * producto.cantidad)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
