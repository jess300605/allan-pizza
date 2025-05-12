import type { User, RegisterData } from "@/context/auth-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al iniciar sesión")
    }

    return await response.json()
  } catch (error) {
    console.error("Error during login:", error)
    throw error
  }
}

export async function register(userData: RegisterData): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al registrarse")
    }

    return await response.json()
  } catch (error) {
    console.error("Error during registration:", error)
    throw error
  }
}

export async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al cerrar sesión")
    }
  } catch (error) {
    console.error("Error during logout:", error)
    throw error
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}
