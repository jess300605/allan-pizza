"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import { createOrder, createPayment } from "@/services/order-service"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [direccion, setDireccion] = useState(user?.direccion || "")
  const [metodoPago, setMetodoPago] = useState("efectivo")
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirigir si no está autenticado o el carrito está vacío
  if (!isAuthenticated) {
    router.push("/login?redirect=/checkout")
    return null
  }

  if (items.length === 0) {
    router.push("/carrito")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!direccion.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa una dirección de entrega",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Crear el pedido
      const orderData = {
        usuario_id: user!.id,
        direccion_entrega: direccion,
        items: items.map((item) => ({
          producto_id: item.id,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
        total: total,
      }

      const order = await createOrder(orderData)

      // Crear el pago
      const paymentData = {
        metodo: metodoPago,
        estado: "pendiente",
      }

      await createPayment(order.id, paymentData)

      // Limpiar carrito y redirigir
      clearCart()

      toast({
        title: "¡Pedido realizado con éxito!",
        description: `Tu número de pedido es: ${order.id}`,
      })

      router.push(`/pedidos/${order.id}`)
    } catch (error) {
      toast({
        title: "Error al procesar el pedido",
        description: error instanceof Error ? error.message : "Ocurrió un error al procesar tu pedido",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Dirección de entrega</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección completa</Label>
                    <Textarea
                      id="direccion"
                      placeholder="Ingresa tu dirección completa"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                <RadioGroup value={metodoPago} onValueChange={setMetodoPago} className="space-y-3">
                  <div className="flex items-center space-x-3 border rounded-md p-3">
                    <RadioGroupItem value="efectivo" id="efectivo" />
                    <Label htmlFor="efectivo" className="flex-grow cursor-pointer">
                      Efectivo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-md p-3">
                    <RadioGroupItem value="tarjeta" id="tarjeta" />
                    <Label htmlFor="tarjeta" className="flex-grow cursor-pointer">
                      Tarjeta (pago al entregar)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Confirmar pedido"}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imagen || `/placeholder.svg?height=48&width=48&query=pizza%20${item.nombre}`}
                        alt={item.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.nombre}</p>
                      <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.precio * item.cantidad)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
