"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout")
      return
    }

    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Agrega algunos productos deliciosos para comenzar tu pedido</p>
            <Button onClick={() => router.push("/")} className="bg-red-500 hover:bg-red-600 text-white">
              Ver Menú
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Productos</h2>
                <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={clearCart}>
                  Vaciar carrito
                </Button>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imagen || `/placeholder.svg?height=80&width=80&query=pizza%20${item.nombre}`}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{item.nombre}</h3>
                      <p className="text-gray-600 text-sm">Precio unitario: {formatCurrency(item.precio)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.cantidad}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div className="font-semibold">{formatCurrency(item.precio * item.cantidad)}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Proceder al pago"}
              </Button>

              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                  Seguir comprando
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
