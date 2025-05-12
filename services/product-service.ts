import type { Product } from "@/components/product-menu"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/productos`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/productos?categoria=${category}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    return []
  }
}

export async function getProductIngredients(productId: number): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/productos/${productId}/ingredientes`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ingredients for product ${productId}:`, error)
    return []
  }
}
