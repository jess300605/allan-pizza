"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/header"
import { createOrder, createPayment } from "@/services/order-service"
import { useAuth } from "@/context/auth-context"

export default function ConfirmarPedidoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    telefono: "",
    cantidad: 1,
    metodoPago: "efectivo",
    lugar: "Universidad Don Bosco",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Producto hardcodeado para esta demo
  const producto = {
    id: 1,
    nombre: "Pizza Peperoni extra grande",
    descripcion:
      "Creada para el amante del peperoni, esta pizza contiene peperoni, salchicha, jamón y queso mozzarella, toda una gama de sabores por disfrutar.",
    precio: 24.0,
    imagen: "/placeholder.svg?key=3c83m",
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.telefono) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simular creación de pedido
      const orderData = {
        usuario_id: user?.id || 0,
        direccion_entrega: formData.lugar,
        items: [
          {
            producto_id: producto.id,
            cantidad: Number(formData.cantidad),
            precio: producto.precio,
          },
        ],
        total: producto.precio * Number(formData.cantidad),
      }

      const order = await createOrder(orderData)

      // Crear el pago
      const paymentData = {
        metodo: formData.metodoPago,
        estado: "pendiente",
      }

      await createPayment(order.id, paymentData)

      toast({
        title: "¡Pedido realizado con éxito!",
        description: `Tu número de pedido es: ${order.id}`,
      })

      router.push(`/estado-pedido/${order.id}`)
    } catch (error) {
      toast({
        title: "Error al procesar el pedido",
        description: error instanceof Error ? error.message : "Ocurrió un error al procesar tu pedido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-4 px-4">
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Confirmar pedido</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-32 w-32 rounded-md overflow-hidden">
                  <Image
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                  <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="0000-0000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min="1"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio: $</Label>
                <Input id="precio" value={producto.precio.toFixed(2)} readOnly disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodoPago">Método de pago:</Label>
                <Select value={formData.metodoPago} onValueChange={(value) => handleSelectChange("metodoPago", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lugar">Lugar</Label>
                <Input id="lugar" name="lugar" value={formData.lugar} onChange={handleChange} required />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Confirmar"}
              </Button>
            </form>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Sugerencias</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center space-x-3 border rounded-md p-2">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?key=t18h1"
                      alt="Pizza de jamón y peperoni"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pizza de jamón y peperoni</p>
                    <button className="text-xs text-red-500 hover:underline">Leer más...</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
