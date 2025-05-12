"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/services/product-service"
import ProductCard from "@/components/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export type Product = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: "pizza" | "bebida" | "acompañamiento"
  disponible: boolean
}

export default function ProductMenu() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("pizza")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => product.categoria === activeCategory && product.disponible)

  return (
    <section className="py-8 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Menú</h2>

        <Tabs defaultValue="pizza" onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pizza">Pizzas</TabsTrigger>
            <TabsTrigger value="bebida">Bebidas</TabsTrigger>
            <TabsTrigger value="acompañamiento">Acompañamientos</TabsTrigger>
          </TabsList>

          <TabsContent value="pizza" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-[200px] w-full rounded-md mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No hay productos disponibles en esta categoría
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bebida" className="mt-0">
            {/* Similar structure as pizza tab */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-[200px] w-full rounded-md mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No hay productos disponibles en esta categoría
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="acompañamiento" className="mt-0">
            {/* Similar structure as pizza tab */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-[200px] w-full rounded-md mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No hay productos disponibles en esta categoría
                  </p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
