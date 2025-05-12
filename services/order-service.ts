const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export type OrderData = {
  usuario_id: number
  direccion_entrega: string
  items: {
    producto_id: number
    cantidad: number
    precio: number
    tamaño_id?: number
  }[]
  total: number
}

export async function createOrder(orderData: OrderData): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al crear el pedido")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getOrdersByUser(userId: number): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/usuarios/${userId}/pedidos`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error)
    return []
  }
}

export async function getOrderById(orderId: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/pedidos/${orderId}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error)
    throw error
  }
}

export async function checkOrderStatus(orderId: string): Promise<string> {
  try {
    const order = await getOrderById(orderId)
    return order.estado
  } catch (error) {
    console.error(`Error checking status for order ${orderId}:`, error)
    throw error
  }
}

export async function createPayment(orderId: number, paymentData: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/pedidos/${orderId}/pagos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al procesar el pago")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}
