"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { checkOrderStatus } from "@/services/order-service"

export default function OrderStatus() {
  const [orderId, setOrderId] = useState("")
  const { toast } = useToast()

  const handleCheckStatus = async () => {
    if (!orderId.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de orden",
        variant: "destructive",
      })
      return
    }

    try {
      const status = await checkOrderStatus(orderId)
      toast({
        title: "Estado de tu orden",
        description: `Tu orden está: ${status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo encontrar la orden",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full bg-white py-4 px-6 border-b">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Estado de tu orden</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            type="text"
            placeholder="Ingresa tu número de orden"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleCheckStatus} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
            Verificar
          </Button>
        </div>
      </div>
    </div>
  )
}
