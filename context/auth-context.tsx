"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "@/services/auth-service"

export type User = {
  id: number
  nombre: string
  email: string
  rol: "cliente" | "administrador" | "repartidor"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

export type RegisterData = {
  nombre: string
  email: string
  telefono: string
  direccion: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay un usuario autenticado al cargar la página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const userData = await apiLogin(email, password)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const newUser = await apiRegister(userData)
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await apiLogout()
      setUser(null)
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
