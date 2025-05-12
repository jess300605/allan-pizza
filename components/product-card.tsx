"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/components/product-menu"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: 1,
    })
  }

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={product.imagen || `/placeholder.svg?height=200&width=300&query=pizza%20${product.nombre}`}
          alt={product.nombre}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.nombre}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.descripcion}</p>

        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-bold text-xl">{formatCurrency(product.precio)}</span>
          <Button onClick={handleAddToCart} className="bg-red-500 hover:bg-red-600 text-white">
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}
