"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { isAuthenticated, user } = useAuth()
  const { items } = useCart()

  return (
    <header className="w-full bg-red-500 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-3xl font-bold italic text-yellow-300">
            Allan Pizza
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/promociones" className="text-white hover:text-yellow-200 text-lg">
              Promociones
            </Link>
            <Link href="/menu" className="text-white hover:text-yellow-200 text-lg">
              Menú
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/carrito" className="relative">
            <ShoppingCart className="h-7 w-7 text-white" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link href="/perfil">
              <Button variant="ghost" className="text-white hover:text-yellow-200">
                <User className="h-5 w-5 mr-2" />
                {user?.nombre}
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="secondary" className="bg-red-600 hover:bg-red-700 text-white border border-white">
                  Inicia sesión
                </Button>
              </Link>
              <Link href="/registro">
                <Button variant="secondary" className="bg-red-600 hover:bg-red-700 text-white border border-white">
                  Crea cuenta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
